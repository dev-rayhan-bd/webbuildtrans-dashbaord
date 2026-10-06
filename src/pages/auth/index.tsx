import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Phone,
  Shield,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export type AuthStep = "login" | "forgot-password" | "verify-otp" | "reset-password";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial step based on URL path
  const getInitialStep = (): AuthStep => {
    if (location.pathname.includes("forgot-password")) return "forgot-password";
    if (location.pathname.includes("verify-otp")) return "verify-otp";
    if (location.pathname.includes("reset-password")) return "reset-password";
    return "login";
  };

  const [step, setStep] = useState<AuthStep>(getInitialStep());
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [email, setEmail] = useState("admin@cura.io");
  const [password, setPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP State (6 digits)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(58);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setStep(getInitialStep());
  }, [location.pathname]);

  // Countdown timer for OTP
  useEffect(() => {
    if (step === "verify-otp" && countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If user pastes multi-character code
      const chars = value.slice(0, 6).split("");
      const newOtp = [...otp];
      chars.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      otpInputRefs.current[Math.min(chars.length, 5)]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Password criteria check
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome back, Alex! Signed in successfully.");
    navigate("/");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Reset code sent to ${email}`);
    setStep("verify-otp");
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }
    toast.success("Identity verified! Set your new password.");
    setStep("reset-password");
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLength || !hasUppercase || !hasNumber) {
      toast.error("Please meet all password security requirements");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password updated successfully! Please sign in.");
    setStep("login");
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 bg-[#F8FAFC] overflow-hidden select-none">
      {/* Ambient Radial Glow matching Figma */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/35 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Top Logo */}
      <div className="mb-8 z-10">
        <Link to="/" className="flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Cura Explore Car Rental"
            className="h-14 w-auto max-w-[220px] object-contain drop-shadow-xs"
          />
        </Link>
      </div>

      {/* Center Auth Card matching Figma nodes 12:10857 - 12:11135 */}
      <div className="w-full max-w-[430px] bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* ==================== 1. LOGIN SCREEN ==================== */}
        {step === "login" && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#0284C7] tracking-tight">
                Welcome back
              </h1>
              <p className="text-xs text-[#64748B] mt-1 font-medium">
                Sign in to the admin dashboard
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@cura.io"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep("forgot-password")}
                    className="text-xs font-semibold text-[#0284C7] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#64748B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Keep me signed in Checkbox */}
              <div className="flex items-center pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#64748B] font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md border-[#CBD5E1] text-[#0284C7] focus:ring-[#0284C7]"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs tracking-wide shadow-md shadow-[#0284C7]/20 transition-all active:scale-[0.99] mt-2 cursor-pointer"
              >
                Sign In
              </button>

              {/* Footer */}
              <div className="text-center pt-3 text-xs text-[#94A3B8]">
                <span>Need access? </span>
                <button
                  type="button"
                  onClick={() => toast.info("Contact IT department: support@cura-explore.com")}
                  className="font-semibold text-[#0284C7] hover:underline"
                >
                  Contact your admin
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== 2. FORGOT PASSWORD SCREEN ==================== */}
        {step === "forgot-password" && (
          <div>
            <button
              type="button"
              onClick={() => setStep("login")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>

            {/* Blue Lock Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>

            <h2 className="text-2xl font-bold text-[#0284C7] tracking-tight">
              Forgot password?
            </h2>
            <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed font-medium">
              Enter your admin email and we'll send you a code to reset your password.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-5 mt-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@cura.io"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs tracking-wide shadow-md shadow-[#0284C7]/20 transition-all active:scale-[0.99] cursor-pointer"
              >
                Send Reset Code
              </button>
            </form>
          </div>
        )}

        {/* ==================== 3. VERIFY OTP SCREEN ==================== */}
        {step === "verify-otp" && (
          <div>
            <button
              type="button"
              onClick={() => setStep("forgot-password")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Blue Phone/Key Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>

            <h2 className="text-2xl font-bold text-[#0284C7] tracking-tight">
              Verify your identity
            </h2>
            <p className="text-xs text-[#64748B] mt-1.5 font-medium">
              Enter the 6-digit code sent to your email
            </p>

            <form onSubmit={handleVerifySubmit} className="space-y-6 mt-6">
              {/* 6 Digit Inputs */}
              <div className="flex items-center justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-13 rounded-xl border border-[#CBD5E1] text-center text-lg font-bold text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all shadow-2xs"
                  />
                ))}
              </div>

              {/* Resend Code Countdown */}
              <div className="text-center text-xs text-[#64748B]">
                {countdown > 0 ? (
                  <span>
                    Resend code in{" "}
                    <span className="font-bold text-[#0284C7]">
                      0:{countdown < 10 ? `0${countdown}` : countdown}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCountdown(58);
                      toast.success("New verification code dispatched to email!");
                    }}
                    className="font-bold text-[#0284C7] hover:underline"
                  >
                    Resend Code Now
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs tracking-wide shadow-md shadow-[#0284C7]/20 transition-all active:scale-[0.99] cursor-pointer"
              >
                Verify & Continue
              </button>
            </form>
          </div>
        )}

        {/* ==================== 4. CREATE NEW PASSWORD SCREEN ==================== */}
        {step === "reset-password" && (
          <div>
            <button
              type="button"
              onClick={() => setStep("verify-otp")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Green Shield Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>

            <h2 className="text-2xl font-bold text-[#0284C7] tracking-tight">
              Create new password
            </h2>
            <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed font-medium">
              Your new password must be different from previous ones.
            </p>

            <form onSubmit={handleResetSubmit} className="space-y-4 mt-6">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                />
              </div>

              {/* Requirements Checklist Box matching Figma */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 space-y-2 text-xs">
                <div
                  className={`flex items-center gap-2 ${
                    hasMinLength ? "text-emerald-600 font-semibold" : "text-[#94A3B8]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>At least 8 characters</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    hasUppercase ? "text-emerald-600 font-semibold" : "text-[#94A3B8]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>At least one uppercase letter</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    hasNumber ? "text-emerald-600 font-semibold" : "text-[#94A3B8]"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>At least one number</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs tracking-wide shadow-md shadow-[#0284C7]/20 transition-all active:scale-[0.99] cursor-pointer mt-2"
              >
                Set New Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
