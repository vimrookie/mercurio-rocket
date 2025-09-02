# Mercurio Rocket - AWS Deployment Script
# Deploys the landing page to S3 + CloudFront

param(
    [Parameter(Mandatory=$false)]
    [string]$Profile = "default",
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1",
    
    [Parameter(Mandatory=$false)]
    [string]$Environment = "prod"
)

Write-Host "🚀 Deploying Mercurio Rocket Landing Page to AWS" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

# Set AWS Profile
$env:AWS_PROFILE = $Profile
Write-Host "Using AWS Profile: $Profile" -ForegroundColor Yellow

# Build the Next.js application
Write-Host "`n📦 Building Next.js application..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy CloudFormation stack
$stackName = "mercurio-rocket-$Environment"
Write-Host "`n☁️ Deploying CloudFormation stack: $stackName" -ForegroundColor Green

aws cloudformation deploy `
    --template-file infrastructure.yml `
    --stack-name $stackName `
    --parameter-overrides `
        Environment=$Environment `
        DomainName=$(if ($Environment -eq "prod") { "mercuriohub.io" } else { "" }) `
    --capabilities CAPABILITY_IAM `
    --region $Region `
    --no-fail-on-empty-changeset

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ CloudFormation deployment failed!" -ForegroundColor Red
    exit 1
}

# Get S3 bucket name from stack outputs
Write-Host "`n🪣 Getting S3 bucket name..." -ForegroundColor Green
$bucketName = aws cloudformation describe-stacks `
    --stack-name $stackName `
    --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' `
    --output text `
    --region $Region

Write-Host "S3 Bucket: $bucketName" -ForegroundColor Cyan

# Sync files to S3
Write-Host "`n📤 Uploading files to S3..." -ForegroundColor Green

# Upload static assets with long cache
aws s3 sync out/ s3://$bucketName/ `
    --delete `
    --cache-control "public, max-age=31536000" `
    --exclude "*.html" `
    --exclude "*.json" `
    --exclude "_next/data/*" `
    --region $Region

# Upload HTML files with short cache
aws s3 sync out/ s3://$bucketName/ `
    --cache-control "public, max-age=0, must-revalidate" `
    --exclude "*" `
    --include "*.html" `
    --include "*.json" `
    --include "_next/data/*" `
    --region $Region

# Get CloudFront distribution ID
Write-Host "`n🌐 Getting CloudFront distribution..." -ForegroundColor Green
$cloudfrontUrl = aws cloudformation describe-stacks `
    --stack-name $stackName `
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' `
    --output text `
    --region $Region

# Extract distribution ID from CloudFront domain
$distributionId = aws cloudfront list-distributions `
    --query "DistributionList.Items[?Comment=='$stackName'].Id" `
    --output text

if ($distributionId) {
    Write-Host "CloudFront Distribution: $distributionId" -ForegroundColor Cyan
    
    # Create CloudFront invalidation
    Write-Host "`n🔄 Invalidating CloudFront cache..." -ForegroundColor Green
    aws cloudfront create-invalidation `
        --distribution-id $distributionId `
        --paths "/*" `
        --output json | Out-Null
}

# Success message
Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "🌐 CloudFront URL: $cloudfrontUrl" -ForegroundColor Cyan

if ($Environment -eq "prod") {
    Write-Host "🚀 Production URL: https://mercuriohub.io" -ForegroundColor Yellow
    Write-Host "`n⚠️  Note: DNS configuration required in Route53:" -ForegroundColor Yellow
    Write-Host "   - Point mercuriohub.io to CloudFront distribution" -ForegroundColor Gray
    Write-Host "   - Move app.mercuriohub.io to Mercurio Orbit CloudFront" -ForegroundColor Gray
}

Write-Host "`n🎯 Next Steps:" -ForegroundColor Magenta
Write-Host "1. Configure Route53 DNS records" -ForegroundColor White
Write-Host "2. Test the landing page" -ForegroundColor White
Write-Host "3. Monitor CloudWatch metrics" -ForegroundColor White
Write-Host "4. Set up CI/CD pipeline for automated deployments" -ForegroundColor White