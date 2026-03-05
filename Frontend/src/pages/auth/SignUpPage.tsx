import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { registrationSchema } from "@/lib/validation";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { CinematicBackground } from "@/components/CinematicBackground";

const STEPS = [
    { id: 1, title: "Account" },
    { id: 2, title: "Personal" },
    { id: 3, title: "Preferences" },
    { id: 4, title: "Confirm" },
];

const INTEREST_OPTIONS = [
    "Machine Learning", "Web Development", "Data Science", "System Design",
    "Algorithms", "Cloud Computing", "Mobile Dev", "DevOps",
];

export function SignUpPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [interests, setInterests] = useState<string[]>([]);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [marketingConsent, setMarketingConsent] = useState(false);

    function toggleInterest(interest: string) {
        setInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
        );
    }

    function validateStep(): boolean {
        setFieldErrors({});
        if (step === 1) {
            const errs: Record<string, string> = {};
            if (!email) errs.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
            if (!password) errs.password = "Password is required";
            else if (password.length < 12) errs.password = "Min 12 characters";
            if (password !== confirmPassword) errs.confirmPassword = "Passwords don't match";
            if (Object.keys(errs).length) { setFieldErrors(errs); return false; }
        }
        if (step === 2) {
            const errs: Record<string, string> = {};
            if (!firstName.trim()) errs.firstName = "Required";
            if (!lastName.trim()) errs.lastName = "Required";
            if (!username.trim()) errs.username = "Required";
            else if (username.length < 3) errs.username = "Min 3 characters";
            else if (!/^[a-zA-Z0-9_]+$/.test(username)) errs.username = "Letters, numbers, underscores only";
            if (Object.keys(errs).length) { setFieldErrors(errs); return false; }
        }
        return true;
    }

    function goNext() {
        if (!validateStep()) return;
        setDirection(1);
        setStep((s) => Math.min(4, s + 1));
    }
    function goPrev() {
        setDirection(-1);
        setStep((s) => Math.max(1, s - 1));
    }

    async function handleSubmit() {
        if (!agreeToTerms) { setError("You must agree to the terms"); return; }
        const parsed = registrationSchema.safeParse({
            email, password, confirmPassword, firstName, lastName, username,
            dateOfBirth, agreeToTerms, marketingConsent,
        });
        if (!parsed.success) { setError(parsed.error.errors[0]?.message ?? "Validation failed"); return; }

        setStatus("loading");
        setError("");
        try {
            await register({ email, password, firstName, lastName, username, dateOfBirth });
            navigate("/", { replace: true });
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Registration failed");
        }
    }

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
    };

    return (
        <CinematicBackground theme="community" timeOfDay="day" robotDensity={0.6} neuralActivity={0.7} particleIntensity={0.8}>
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg"
                >
                    {/* Progress — using light-themed version */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            {STEPS.map((s, index) => (
                                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center">
                                        <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${s.id < step
                                            ? "border-emerald-500 bg-emerald-500 text-white"
                                            : s.id === step
                                                ? "border-violet-600 bg-violet-600 text-white shadow-glow-sm"
                                                : "border-zinc-300 bg-white text-zinc-400"
                                            }`}>
                                            {s.id < step ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                            ) : s.id}
                                        </div>
                                        <span className={`mt-1.5 text-xs font-medium ${s.id <= step ? "text-zinc-700" : "text-zinc-400"}`}>{s.title}</span>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className="flex-1 mx-2.5 mt-[-1.25rem]">
                                            <div className="h-0.5 rounded-full bg-zinc-200 overflow-hidden">
                                                <div className="h-full bg-violet-600 transition-all duration-500" style={{ width: s.id < step ? "100%" : "0%" }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card */}
                    <div className="relative rounded-3xl bg-white/80 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur-md border border-white/60 overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600" />

                        <div className="p-8">
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</motion.div>
                            )}

                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div key={step} custom={direction} variants={slideVariants}
                                    initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: "easeOut" }}>

                                    {step === 1 && (
                                        <div className="space-y-4">
                                            <div className="text-center mb-5">
                                                <h2 className="text-xl font-bold text-zinc-900">Create Your Account</h2>
                                                <p className="text-zinc-500 text-sm mt-1">Start your AI learning journey</p>
                                            </div>
                                            <InputField label="Email Address" type="email" value={email} onChange={setEmail} error={fieldErrors.email} placeholder="you@example.com" autoComplete="email"
                                                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />} />
                                            <div className="relative">
                                                <InputField label="Password (min 12 chars)" type={showPassword ? "text" : "password"} value={password} onChange={setPassword} error={fieldErrors.password} placeholder="Create a secure password" autoComplete="new-password"
                                                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />} />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-[2.15rem] text-zinc-400 hover:text-zinc-600 transition-colors" tabIndex={-1}>
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M3 3l18 18" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                                                    </svg>
                                                </button>
                                            </div>
                                            <PasswordStrengthMeter password={password} />
                                            <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} error={fieldErrors.confirmPassword} placeholder="Confirm your password" autoComplete="new-password"
                                                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />} />
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-4">
                                            <div className="text-center mb-5">
                                                <h2 className="text-xl font-bold text-zinc-900">Personal Details</h2>
                                                <p className="text-zinc-500 text-sm mt-1">Tell us about yourself</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <InputField label="First Name" value={firstName} onChange={setFirstName} error={fieldErrors.firstName} placeholder="John" />
                                                <InputField label="Last Name" value={lastName} onChange={setLastName} error={fieldErrors.lastName} placeholder="Doe" />
                                            </div>
                                            <InputField label="Username" value={username} onChange={setUsername} error={fieldErrors.username} placeholder="johndoe_42"
                                                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />} />
                                            <InputField label="Date of Birth (optional)" type="date" value={dateOfBirth} onChange={setDateOfBirth} />
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-4">
                                            <div className="text-center mb-5">
                                                <h2 className="text-xl font-bold text-zinc-900">Learning Interests</h2>
                                                <p className="text-zinc-500 text-sm mt-1">Select topics that interest you</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {INTEREST_OPTIONS.map((opt) => (
                                                    <button key={opt} type="button" onClick={() => toggleInterest(opt)}
                                                        className={`rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 ${interests.includes(opt)
                                                            ? "border-violet-400 bg-violet-50 text-violet-700"
                                                            : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300"
                                                            }`}>
                                                        {interests.includes(opt) && <span className="mr-1">✓</span>}{opt}
                                                    </button>
                                                ))}
                                            </div>
                                            <label className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 cursor-pointer">
                                                <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)}
                                                    className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500" />
                                                <div>
                                                    <div className="text-sm text-zinc-800 font-medium">Subscribe to updates</div>
                                                    <div className="text-xs text-zinc-500 mt-0.5">Get tips, new features, and learning recommendations</div>
                                                </div>
                                            </label>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-4">
                                            <div className="text-center mb-5">
                                                <h2 className="text-xl font-bold text-zinc-900">Confirm Details</h2>
                                                <p className="text-zinc-500 text-sm mt-1">Review your information</p>
                                            </div>
                                            <div className="space-y-2">
                                                {([["Email", email], ["Name", `${firstName} ${lastName}`], ["Username", `@${username}`], ["Interests", interests.join(", ") || "None selected"]] as const).map(([label, value]) => (
                                                    <div key={label} className="flex justify-between rounded-xl bg-zinc-50 ring-1 ring-zinc-200 px-4 py-3">
                                                        <span className="text-sm text-zinc-500">{label}</span>
                                                        <span className="text-sm text-zinc-900 font-medium">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <label className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 cursor-pointer">
                                                <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)}
                                                    className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500" />
                                                <div>
                                                    <div className="text-sm text-zinc-800 font-medium">I agree to the Terms & Conditions</div>
                                                    <div className="text-xs text-zinc-500 mt-0.5">By creating an account you agree to our Terms of Service and Privacy Policy</div>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="flex justify-between mt-8">
                                <button type="button" onClick={goPrev} disabled={step === 1}
                                    className="px-5 py-2.5 text-zinc-500 hover:text-zinc-700 text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                                    ← Previous
                                </button>
                                {step < 4 ? (
                                    <motion.button type="button" onClick={goNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all">
                                        Next →
                                    </motion.button>
                                ) : (
                                    <motion.button type="button" onClick={handleSubmit} disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
                                        {status === "loading" ? (
                                            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</span>
                                        ) : "Create Account ✓"}
                                    </motion.button>
                                )}
                            </div>

                            <p className="text-center text-sm text-zinc-500 mt-6">
                                Already have an account?{" "}
                                <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium transition-colors">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </CinematicBackground>
    );
}

/* ── Reusable input field matching inner website style ── */
function InputField({ label, type = "text", value, onChange, error, placeholder, autoComplete, icon }: {
    label: string; type?: string; value: string; onChange: (v: string) => void;
    error?: string; placeholder?: string; autoComplete?: string; icon?: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">{label}</label>
            <div className="relative">
                {icon && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
                    </span>
                )}
                <input
                    type={type} value={value} onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder} autoComplete={autoComplete}
                    className={`w-full rounded-xl bg-zinc-50 ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5 text-sm text-zinc-900 ring-1 ring-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-shadow`}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
