import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-50 to-violet-100">
                <div className="text-center space-y-4">
                    {/* Animated robot logo placeholder */}
                    <div className="relative mx-auto w-16 h-16">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-glow-sm">
                            AI
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-violet-500/20 animate-ping" />
                    </div>
                    <p className="text-sm text-zinc-500 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
