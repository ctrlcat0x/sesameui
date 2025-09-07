"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, RefreshCcwDot, Copy, Check } from "lucide-react";

interface CreateAccountFormProps {
  onSubmit?: (credentials: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }) => Promise<void>;
}

type PasswordStrength = "weak" | "medium" | "strong";

const CreateAccountForm = ({ onSubmit }: CreateAccountFormProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    username?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("weak");
  const [copySuccess, setCopySuccess] = useState(false);

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = (pwd: string): PasswordStrength => {
      if (pwd.length < 8) return "weak";

      const hasUpper = /[A-Z]/.test(pwd);
      const hasLower = /[a-z]/.test(pwd);
      const hasNumber = /\d/.test(pwd);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

      const criteriaCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
        Boolean
      ).length;

      if (pwd.length >= 12 && criteriaCount >= 3) return "strong";
      if (pwd.length >= 8 && criteriaCount >= 2) return "medium";
      return "weak";
    };

    setPasswordStrength(calculateStrength(password));
  }, [password]);

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return undefined;
  };

  const validateUsername = (value: string): string | undefined => {
    if (!value.trim()) return "Username is required";
    if (value.length < 3 || value.length > 30)
      return "Username must be 3-30 characters";
    if (!/^[a-zA-Z0-9._-]+$/.test(value))
      return "Username can only contain letters, numbers, dots, underscores, and hyphens";
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return undefined;
  };

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value) return "Confirm Password is required";
    if (value !== password) return "Passwords do not match";
    return undefined;
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = '!@#$%^&*(),.?":{}|<>';

    let password = "";

    // Ensure at least one of each type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill remaining characters (minimum 11 total)
    const allChars = uppercase + lowercase + numbers + symbols;
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    const shuffled = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(shuffled);
    setConfirmPassword(shuffled);
    setTouched(prev => ({ ...prev, password: true, confirmPassword: true }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const handleBlur = (
    field: "email" | "username" | "password" | "confirmPassword"
  ) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === "email") {
      const error = validateEmail(email);
      setErrors(prev => ({ ...prev, email: error }));
    } else if (field === "username") {
      const error = validateUsername(username);
      setErrors(prev => ({ ...prev, username: error }));
    } else if (field === "password") {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    } else if (field === "confirmPassword") {
      const error = validateConfirmPassword(confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      email: emailError,
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      form: undefined,
    });

    setTouched({
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    });

    if (
      emailError ||
      usernameError ||
      passwordError ||
      confirmPasswordError ||
      !agreeToTerms
    ) {
      if (!agreeToTerms) {
        setErrors(prev => ({
          ...prev,
          form: "Please agree to the Terms of Service and Privacy Policy",
        }));
      }
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          email,
          username,
          password,
          confirmPassword,
          agreeToTerms,
        });
      } else {
        // Mock account creation
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Simulate success
        console.log("Account created successfully");
      }
    } catch (error) {
      setErrors({
        form: "An error occurred while creating your account. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    !validateEmail(email) &&
    !validateUsername(username) &&
    !validatePassword(password) &&
    !validateConfirmPassword(confirmPassword) &&
    agreeToTerms;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Join us today and get started
            </p>
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
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`w-full ${
                  errors.email && touched.email
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }`}
                aria-invalid={errors.email && touched.email ? "true" : "false"}
                aria-describedby={
                  errors.email && touched.email ? "email-error" : undefined
                }
                placeholder="Enter your email address"
              />
              {errors.email && touched.email && (
                <p
                  id="email-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-foreground"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onBlur={() => handleBlur("username")}
                className={`w-full ${
                  errors.username && touched.username
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }`}
                aria-invalid={
                  errors.username && touched.username ? "true" : "false"
                }
                aria-describedby={
                  errors.username && touched.username
                    ? "username-error"
                    : undefined
                }
                placeholder="Choose a username"
              />
              {errors.username && touched.username && (
                <p
                  id="username-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.username}
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
                  className={`w-full pr-20 ${
                    errors.password && touched.password
                      ? "border-destructive focus:ring-destructive"
                      : ""
                  }`}
                  aria-invalid={
                    errors.password && touched.password ? "true" : "false"
                  }
                  aria-describedby={`${
                    errors.password && touched.password ? "password-error" : ""
                  } password-strength`}
                  placeholder="Create a strong password"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={generatePassword}
                    className="h-8 w-8 p-0 cursor-pointer"
                    style={
                      {
                        "--hover-bg":
                          "color-mix(in srgb, var(--blue) 10%, transparent)",
                        "--icon-color": "var(--blue)",
                      } as React.CSSProperties
                    }
                    onMouseEnter={e =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg)")
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    aria-label="Generate password"
                    title="Generate strong password"
                  >
                    <RefreshCcwDot
                      className="h-4 w-4"
                      style={{ color: "var(--blue)" }}
                    />
                  </Button>
                  {password && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="h-8 w-8 p-0 cursor-pointer"
                      style={
                        {
                          "--hover-bg":
                            "color-mix(in srgb, var(--blue) 10%, transparent)",
                          "--icon-color": copySuccess
                            ? "var(--green)"
                            : "var(--blue)",
                        } as React.CSSProperties
                      }
                      onMouseEnter={e =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--hover-bg)")
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      aria-label="Copy password to clipboard"
                      aria-pressed={copySuccess}
                      title={copySuccess ? "Copied!" : "Copy password"}
                    >
                      {copySuccess ? (
                        <Check
                          className="h-4 w-4"
                          style={{ color: "var(--green)" }}
                        />
                      ) : (
                        <Copy
                          className="h-4 w-4"
                          style={{ color: "var(--blue)" }}
                        />
                      )}
                    </Button>
                  )}
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

              {/* Password Strength Meter */}
              {password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Password strength:
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color:
                          passwordStrength === "strong"
                            ? "var(--green)"
                            : passwordStrength === "medium"
                            ? "var(--orange)"
                            : "var(--red)",
                      }}
                    >
                      {passwordStrength.charAt(0).toUpperCase() +
                        passwordStrength.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width:
                          passwordStrength === "strong"
                            ? "100%"
                            : passwordStrength === "medium"
                            ? "66.67%"
                            : "33.33%",
                        backgroundColor:
                          passwordStrength === "strong"
                            ? "var(--green)"
                            : passwordStrength === "medium"
                            ? "var(--orange)"
                            : "var(--red)",
                      }}
                      id="password-strength"
                      aria-label={`Password strength: ${passwordStrength}`}
                    />
                  </div>
                </div>
              )}

              {errors.password && touched.password && (
                <p
                  id="password-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}

              {copySuccess && (
                <p
                  className="text-sm"
                  style={{ color: "var(--green)" }}
                  role="status"
                >
                  Password copied to clipboard!
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
                className={`w-full ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }`}
                aria-invalid={
                  errors.confirmPassword && touched.confirmPassword
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  errors.confirmPassword && touched.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Social authentication buttons below password field */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 border border-border hover:bg-accent bg-transparent"
                  onClick={() => console.log("Google sign up")}
                >
                  <svg
                    viewBox="0 0 256 262"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    />
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 border border-border hover:bg-accent bg-transparent"
                  onClick={() => console.log("GitHub sign up")}
                >
                  <svg
                    width="1024"
                    height="1024"
                    viewBox="0 0 1024 1024"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                      transform="scale(64)"
                      fill="#1B1F23"
                    />
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={checked => setAgreeToTerms(checked as boolean)}
              />
              <Label
                htmlFor="agreeToTerms"
                className="text-sm text-foreground cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="hover:underline font-medium"
                  style={{ color: "var(--blue)" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="hover:underline font-medium"
                  style={{ color: "var(--blue)" }}
                >
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer text-white font-medium py-2.5 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0"
              style={{
                background: "var(--blue-glossy)",
                boxShadow: "0 4px 15px 0 rgba(59, 130, 246, 0.35)",
              }}
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                className="hover:underline font-medium"
                style={{ color: "var(--blue)" }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
export { CreateAccountForm };
