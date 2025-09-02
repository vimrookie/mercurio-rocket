# 🚀 Mercurio Rocket

> Launch customers into the Mercurio universe - Landing page and customer acquisition gateway

Mercurio Rocket is the marketing landing page for the Mercurio document processing ecosystem. Built with Next.js and optimized for conversions, it showcases the power of automated document processing while maintaining perfect brand consistency with the Mercurio Orbit dashboard.

## ✨ Features

- **🎯 Conversion-Optimized**: Purpose-built landing page for customer acquisition
- **🎨 Brand Consistency**: Shares design system with Mercurio Orbit
- **⚡ Performance**: Static site generation with <3s load times
- **📱 Responsive**: Mobile-first design for all devices
- **🔍 SEO Ready**: Optimized for search engines and social sharing

## 🏗️ Architecture

### Rocket-Themed Components

```
src/components/rocket/
├── LaunchPad.tsx        # Hero section with animated Mercury logo
├── RocketFeatures.tsx   # Feature showcase with stats
├── FuelPricing.tsx      # Subscription plans ("Fuel Plans")
└── BlastOff.tsx         # Final CTA and contact info
```

### Shared Design System

```
src/components/shared/
├── MercurioLogo.tsx     # Animated Mercury planet logo
└── theme.ts             # Material-UI theme matching Orbit
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🌟 Design System

Mercurio Rocket uses the same design system as Mercurio Orbit:

- **Colors**: Dark theme with Mercurio gray (#BDBDBD) primary
- **Typography**: system-ui font stack with proper hierarchy
- **Components**: Material-UI with custom overrides
- **Animations**: Floating Mercury planet with orbital rings
- **Space Theme**: Consistent planetary/rocket aesthetic

## 🎯 SEO & Performance

- **Static Site Generation**: Pre-rendered HTML for fast loading
- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Core Web Vitals**: Optimized for Google's performance metrics
- **Keywords**: Targeted for "document processing" and "OCR automation"

## 📊 Conversion Strategy

### Customer Journey
1. **Discovery**: SEO traffic to mercuriohub.io
2. **Interest**: Rocket-themed messaging and features
3. **Consideration**: Clear pricing and use cases
4. **Action**: "Blast Off - Free Trial" CTA
5. **Activation**: Redirect to app.mercuriohub.io

### Key Metrics
- **Primary**: Trial signups from landing page
- **Secondary**: Demo requests and email captures
- **Performance**: <3s load time, >90% mobile score

## 🚀 Deployment

### Recommended: Vercel
```bash
# Deploy to production
vercel --prod

# Configure custom domain
# mercuriohub.io → Vercel project
```

### Alternative: AWS S3 + CloudFront
```bash
# Build static site
npm run build

# Upload to S3 bucket
# Configure CloudFront distribution
```

## 🎨 Brand Guidelines

### Rocket Metaphors
- "Launch" instead of "start" 
- "Blast off" instead of "sign up"
- "Fuel plans" instead of "pricing"
- "Mission success" for completions

### Visual Elements
- **Hero**: Animated Mercury planet with orbital ring
- **Backgrounds**: Space gradients with subtle particle effects
- **Cards**: Glass morphism with colored borders
- **Buttons**: Gradient fills with hover animations

## 🔗 Integration

### With Mercurio Orbit
- Seamless redirect from landing to app.mercuriohub.io
- Shared authentication flow via AWS Cognito
- Consistent branding and user experience

### With Marketing Tools
- Google Analytics integration
- Email capture for newsletters
- A/B testing ready for optimization

## 📈 Performance Targets

- **Load Time**: <3 seconds (LCP)
- **Interactivity**: <100ms (FID) 
- **Layout Shift**: <0.1 (CLS)
- **Mobile Score**: >90/100
- **Conversion Rate**: 5-10% landing to trial

## 🛠️ Development

```bash
# Development
npm run dev                # Start dev server
npm run build             # Build for production
npm run start             # Preview production build
npm run lint              # ESLint validation

# Deployment
npm run export            # Generate static files
```

## 📁 Project Structure

```
mercurio-rocket/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main landing page
│   │   ├── layout.tsx         # Root layout with SEO
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── rocket/            # Landing-specific components
│   │   └── shared/            # Shared with Mercurio Orbit
│   └── lib/
│       └── theme.ts           # Material-UI theme
├── public/                     # Static assets
├── next.config.ts             # SSG configuration
└── README.md                  # This file
```

## 🎯 Success Metrics

The landing page is designed to achieve:

- **2-4 customers** needed to break even (based on profitability analysis)
- **High conversion rate** through rocket-themed CTAs
- **Professional brand presence** at mercuriohub.io
- **SEO dominance** for document processing keywords

## 🌟 What Makes This Special

1. **Brand Consistency**: Perfect match with Mercurio Orbit design
2. **Conversion Focus**: Every element optimized for customer acquisition  
3. **Performance**: Static generation for lightning-fast loads
4. **Scalability**: Easy to expand with blog, case studies, etc.
5. **Fun Factor**: Rocket theme makes document processing exciting!

---

**Built with ❤️ and rocket fuel by the Mercurio team**

🌐 **Website**: [mercuriohub.io](https://mercuriohub.io)  
📧 **Email**: hello@mercuriohub.io  
🚀 **Mission**: Transform document processing across the galaxy