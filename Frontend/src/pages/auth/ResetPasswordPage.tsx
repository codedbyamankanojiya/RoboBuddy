import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { CinematicBackground } from "@/components/CinematicBackground";

export function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (password.length < 12) { setError("Password must be at least 12 characters"); return; }
        if (password !== confirmPassword) { setError("Passwords do not match"); return; }
        setStatus("loading");
        await new Promise((r) => setTimeout(r, 1000));
        setStatus("success");
    }

    return (
        <CinematicBackground theme="study" timeOfDay="day" robotDensity={0.5} neuralActivity={0.6} particleIntensity={0.4}>
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
                    <div className="rounded-3xl bg-white/80 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur-md border border-white/60 overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600" />
                        <div className="p-8 space-y-6">
                            {status === "success" ? (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
                                    <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-50 ring-1 ring-emerald-200 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900">Password Reset!</h2>
                                    <p className="text-zinc-500 text-sm">Your password has been successfully updated.</p>
                                    <Link to="/login" className="inline-block mt-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-glow-sm">
                                        Sign In
                                    </Link>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="text-center space-y-2">
                                        <div className="mx-auto w-14 h-14 rounded-2xl bg-violet-100/80 ring-1 ring-primary/20 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-zinc-900">Reset Password</h2>
                                        <p className="text-zinc-500 text-sm">Choose a strong new password</p>
                                    </div>
                                    {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="rp-pwd" className="block text-xs font-semibold text-zinc-700 mb-1.5">New Password (min 12 chars)</label>
                                            <input id="rp-pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a secure password" autoComplete="new-password"
                                                className="w-full rounded-xl bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 ring-1 ring-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
                                        </div>
                                        <PasswordStrengthMeter password={password} />
                                        <div>
                                            <label htmlFor="rp-confirm" className="block text-xs font-semibold text-zinc-700 mb-1.5">Confirm New Password</label>
                                            <input id="rp-confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" autoComplete="new-password"
                                                className="w-full rounded-xl bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 ring-1 ring-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40" />
                                        </div>
                                        <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-glow-sm hover:shadow-glow transition-all disabled:opacity-50">
                                            {status === "loading" ? (
                                                <span className="flex items-center justify-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Resetting...</span>
                                            ) : "Reset Password"}
                                        </motion.button>
                                    </form>
                                    <p className="text-center text-sm text-zinc-500">
                                        <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium transition-colors">← Back to Login</Link>
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
