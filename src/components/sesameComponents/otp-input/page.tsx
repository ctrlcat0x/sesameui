"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, X, RotateCcw, Shield } from "lucide-react";

export default function OTPVerifier() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Generate random 5-digit OTP
  const generateOtp = () => {
    const newOtp = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  };

  // Initialize OTP on component mount
  useEffect(() => {
    const initialOtp = generateOtp();
    console.log("Generated OTP:", initialOtp); // For demo purposes
  }, []);

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger verification if all digits are filled
    if (newOtp.every(digit => digit !== "") && newOtp.join("").length === 5) {
      verifyOtp(newOtp.join(""));
    }
  };

  // Handle key down events
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
      setVerificationStatus("idle");
    }
  };

  // Verify OTP
  const verifyOtp = async (enteredOtp: string) => {
    setIsVerifying(true);
    setVerificationStatus("idle");

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (enteredOtp === generatedOtp) {
      setVerificationStatus("success");
    } else {
      setVerificationStatus("error");
    }
    setIsVerifying(false);
  };

  // Reset and regenerate OTP
  const resetOtp = () => {
    setOtp(["", "", "", "", ""]);
    setVerificationStatus("idle");
    const newOtp = generateOtp();
    console.log("New Generated OTP:", newOtp);
    inputRefs.current[0]?.focus();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background to-accent flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex metallic bg-[var(--blue-metallic)] items-center justify-center w-16 h-16 rounded-full mb-4">
                <Shield className="w-8 h-8 " />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Enter Verification Code
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We've sent a 5-digit code to verify your identity
              </p>
              <div className="mt-3 px-3 py-1 bg-muted rounded-lg inline-block">
                <span className="text-xs font-mono text-muted-foreground">
                  Demo OTP: {generatedOtp}
                </span>
              </div>
            </div>

            {/* OTP Input */}
            <div className="mb-8">
              <div className="flex justify-center space-x-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleInputChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className={`
                    w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 
                    transition-all duration-200 outline-none
                    ${
                      verificationStatus === "error"
                        ? "border-red/30 bg-red/10 text-red"
                        : verificationStatus === "success"
                        ? "border-green/30 bg-green/10 text-green"
                        : "border-border focus:border-blue focus:ring-4 focus:ring-blue/10"
                    }
                    ${digit ? "bg-blue/10" : "bg-background"}
                    hover:border-muted-foreground focus:shadow-lg
                  `}
                    disabled={isVerifying}
                  />
                ))}
              </div>

              {/* Status Messages */}
              <div className="text-center h-6">
                {isVerifying && (
                  <div className="flex items-center justify-center space-x-2 text-blue">
                    <div className="w-4 h-4 border-2 border-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Verifying...</span>
                  </div>
                )}

                {verificationStatus === "success" && (
                  <div className="flex items-center justify-center space-x-2 text-green">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Verification successful!
                    </span>
                  </div>
                )}

                {verificationStatus === "error" && (
                  <div className="flex items-center justify-center space-x-2 text-red">
                    <X className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Invalid code. Please try again.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={resetOtp}
                disabled={isVerifying}
                className="
                w-full flex items-center justify-center space-x-2 px-4 py-3 
                text-muted-foreground hover:text-foreground hover:bg-accent 
                rounded-lg transition-all duration-200 font-medium text-sm
                disabled:opacity-50 disabled:cursor-not-allowed
                border border-border hover:border-muted-foreground
              "
              >
                <RotateCcw className="w-4 h-4" />
                <span>Generate New Code</span>
              </button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button
                    onClick={resetOtp}
                    className="text-blue hover:text-blue/80 font-medium hover:underline transition-colors"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
