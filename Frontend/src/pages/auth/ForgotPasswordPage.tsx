import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { passwordResetSchema } from "@/lib/validation";
import { CinematicBackground } from "@/components/CinematicBackground";

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const result = passwordResetSchema.safeParse({ email });
        if (!result.success) { setError(result.error.errors[0]?.message ?? "Invalid email"); return; }
        setStatus("loading");
        await new Promise((r) => setTimeout(r, 1200));
        setStatus("sent");
    }

    return (
        <CinematicBackground theme="study" timeOfDay="day" robotDensity={0.5} neuralActivity={0.6} particleIntensity={0.4}>
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
                    <div className="rounded-3xl bg-white/80 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur-md border border-white/60 overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600" />
                        <div className="p-8 space-y-6">
                            {status === "sent" ? (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
                                    <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-50 ring-1 ring-emerald-200 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900">Check Your Email</h2>
                                    <p className="text-zinc-500 text-sm">We've sent a password reset link to <span className="text-violet-600 font-medium">{email}</span></p>
                                    <Link to="/login" className="inline-block mt-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-glow-sm">
                                        Back to Login
                                    </Link>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="text-center space-y-2">
                                        <div className="mx-auto w-14 h-14 rounded-2xl bg-violet-100/80 ring-1 ring-primary/20 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-zinc-900">Forgot Password?</h2>
                                        <p className="text-zinc-500 text-sm">Enter your email and we'll send you a reset link</p>
                                    </div>
                                    {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="fp-email" className="block text-xs font-semibold text-zinc-700 mb-1.5">Email Address</label>
                                            <input id="fp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"
                                                className="w-full rounded-xl bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 ring-1 ring-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
                                        </div>
                                        <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-glow-sm hover:shadow-glow transition-all disabled:opacity-50">
                                            {status === "loading" ? (
                                                <span className="flex items-center justify-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span>
                                            ) : "Send Reset Link"}
                                        </motion.button>
                                    </form>
                                    <p className="text-center text-sm text-zinc-500">
                                        Remember your password?{" "}
                                        <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium transition-colors">Sign in</Link>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </CinematicBackground>
    );
}
