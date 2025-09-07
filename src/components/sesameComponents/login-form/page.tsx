"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (credentials: {
    emailOrUsername: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    emailOrUsername?: string;
    password?: string;
    form?: string;
  }>({});
  const [touched, setTouched] = useState<{
    emailOrUsername?: boolean;
    password?: boolean;
  }>({});

  // Load remember me preference from localStorage
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(savedRememberMe);
  }, []);

  // Save remember me preference
  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe.toString());
  }, [rememberMe]);

  const validateEmailOrUsername = (value: string): string | undefined => {
    if (!value.trim()) return "Email or username is required";

    if (value.includes("@")) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
    } else {
      // Username validation
      if (value.length < 3 || value.length > 30)
        return "Username must be 3-30 characters";
      if (!/^[a-zA-Z0-9._-]+$/.test(value))
        return "Username can only contain letters, numbers, dots, underscores, and hyphens";
    }

    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return undefined;
  };

  const handleBlur = (field: "emailOrUsername" | "password") => {
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === "emailOrUsername") {
      const error = validateEmailOrUsername(emailOrUsername);
      setErrors(prev => ({ ...prev, emailOrUsername: error }));
    } else if (field === "password") {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmailOrUsername(emailOrUsername);
    const passwordError = validatePassword(password);

    setErrors({
      emailOrUsername: emailError,
      password: passwordError,
      form: undefined,
    });

    setTouched({ emailOrUsername: true, password: true });

    if (emailError || passwordError) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({ emailOrUsername, password, rememberMe });
      } else {
        // Mock authentication
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (password !== "correctpass") {
          setErrors({
            form: "Invalid credentials. Please check your email/username and password.",
          });
        }
      }
    } catch (error) {
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    !validateEmailOrUsername(emailOrUsername) && !validatePassword(password);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {errors.form && (
            <div
              className="mb-6 p-4 rounded-md border border-destructive/20 bg-destructive/10 text-destructive"
              role="alert"
              aria-live="polite"
            >
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="emailOrUsername"
                className="text-sm font-medium text-foreground"
              >
                Email or Username
              </Label>
              <Input
                id="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={e => setEmailOrUsername(e.target.value)}
                onBlur={() => handleBlur("emailOrUsername")}
                className={`w-full ${
                  errors.emailOrUsername && touched.emailOrUsername
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }`}
                aria-invalid={
                  errors.emailOrUsername && touched.emailOrUsername
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  errors.emailOrUsername && touched.emailOrUsername
                    ? "email-error"
                    : undefined
                }
                placeholder="Enter your email or username"
              />
              {errors.emailOrUsername && touched.emailOrUsername && (
                <p
                  id="email-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.emailOrUsername}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  className={`w-full pr-12 ${
                    errors.password && touched.password
                      ? "border-destructive focus:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={
                    errors.password && touched.password ? "true" : "false"
                  }
                  aria-describedby={
                    errors.password && touched.password ? "password-error" : ""
                  }
                  placeholder="Enter your password"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-8 w-8 p-0 hover:bg-accent cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {errors.password && touched.password && (
                <p
                  id="password-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={checked => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm text-foreground cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full text-white cursor-pointer font-medium py-2.5 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0"
              style={{
                background: "var(--blue-glossy)",
                boxShadow: "0 4px 15px 0 rgba(59, 130, 246, 0.35)",
              }}
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="#"
                className="hover:underline font-medium"
                style={{ color: "var(--blue)" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
