"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  RocketLaunch,
  Visibility,
  VisibilityOff,
  ArrowBack,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "../../i18n";
import theme from "@/lib/theme";
import MercurioLogo from "@/components/shared/MercurioLogo";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { signupOrganization, ApiError } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error(t("signup.passwordsNoMatch"));
      }

      const passwordErrors: string[] = [];

      if (formData.password.length < 8) {
        passwordErrors.push(t("signup.passwordMinLength"));
      }
      if (!/[A-Z]/.test(formData.password)) {
        passwordErrors.push(t("signup.passwordUppercase"));
      }
      if (!/[a-z]/.test(formData.password)) {
        passwordErrors.push(t("signup.passwordLowercase"));
      }
      if (!/\d/.test(formData.password)) {
        passwordErrors.push(t("signup.passwordNumber"));
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
        passwordErrors.push(t("signup.passwordSpecial"));
      }

      if (passwordErrors.length > 0) {
        throw new Error(
          `${t("signup.passwordRequirement")} ${passwordErrors.join(", ")}`
        );
      }

      await signupOrganization(formData);

      setSuccess(true);

      const loginUrl = process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/login?logout=true`
        : "https://app.mercuriohub.io/login?logout=true";

      setTimeout(() => {
        window.location.href = loginUrl;
      }, 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.details && err.details.length > 0) {
          setError(err.details.map((d) => d.message).join(". "));
        } else {
          setError(err.error);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("signup.unexpectedError"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageSwitcher />
        <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #181C23 0%, #232733 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Card
            sx={{
              maxWidth: 500,
              width: "100%",
              background: "rgba(35, 39, 51, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(189, 189, 189, 0.2)",
            }}
          >
            <CardContent sx={{ p: 6, textAlign: "center" }}>
              <MercurioLogo size={80} animated />
              <Typography
                variant="h4"
                sx={{ mt: 3, mb: 2, color: "white", fontWeight: 700 }}
              >
                {t("signup.welcomeTitle")}
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                {t("signup.successMessage")}
              </Alert>
              <CircularProgress sx={{ color: "primary.main" }} />
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageSwitcher />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #181C23 0%, #232733 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          position: "relative",
        }}
      >
        {/* Back button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push("/")}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "rgba(189, 189, 189, 0.08)",
            },
          }}
        >
          {t("signup.backToHome")}
        </Button>

        <Container maxWidth="sm">
          <Card
            sx={{
              background: "rgba(35, 39, 51, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(189, 189, 189, 0.2)",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              {/* Logo and Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <MercurioLogo size={60} animated />
                <Typography
                  variant="h4"
                  sx={{
                    mt: 3,
                    mb: 1,
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {t("signup.title")}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t("signup.subtitle")}
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {/* Signup Form */}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label={t("signup.organizationName")}
                  value={formData.organizationName}
                  onChange={handleChange("organizationName")}
                  required
                  sx={{ mb: 3 }}
                  InputLabelProps={{ style: { color: "#BDBDBD" } }}
                />

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
                    label={t("signup.firstName")}
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    required
                    InputLabelProps={{ style: { color: "#BDBDBD" } }}
                  />
                  <TextField
                    fullWidth
                    label={t("signup.lastName")}
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    required
                    InputLabelProps={{ style: { color: "#BDBDBD" } }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label={t("signup.email")}
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  sx={{ mb: 3 }}
                  InputLabelProps={{ style: { color: "#BDBDBD" } }}
                />

                <TextField
                  fullWidth
                  label={t("signup.password")}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  required
                  sx={{ mb: 3 }}
                  InputLabelProps={{ style: { color: "#BDBDBD" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "text.secondary" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={t("signup.passwordHelp")}
                />

                <TextField
                  fullWidth
                  label={t("signup.confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  required
                  sx={{ mb: 4 }}
                  InputLabelProps={{ style: { color: "#BDBDBD" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          sx={{ color: "text.secondary" }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <RocketLaunch />
                  }
                  disabled={loading}
                  sx={{
                    background:
                      "linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)",
                    color: "#000",
                    fontWeight: 700,
                    py: 1.5,
                    mb: 3,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)",
                    },
                    "&:disabled": {
                      background: "rgba(189, 189, 189, 0.3)",
                      color: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  {loading
                    ? t("signup.creatingAccount")
                    : t("signup.createAccount")}
                </Button>

                {/* Login Link */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {t("signup.alreadyHaveAccount")}{" "}
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_APP_URL
                          ? `${process.env.NEXT_PUBLIC_APP_URL}/login`
                          : "https://app.mercuriohub.io/login"
                      }
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {t("signup.signIn")}
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 3,
              color: "text.disabled",
            }}
          >
            {t("signup.termsAgreement")}
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
