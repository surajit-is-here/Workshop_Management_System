import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Code2, AlertCircle } from "lucide-react";

const loginSchema = z.object({
    emailId: z.string().email("Invalid Email"),
    password: z.string().min(8, "Invalid Credentials"),
});

function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError("");

            console.log("Login Data:", data);

            // ==========================
            // TODO: Replace with your API
            // Example:
            //
            // const response = await axios.post(
            //     "http://localhost:5000/api/login",
            //     data,
            //     { withCredentials: true }
            // );
            //
            // navigate("/");
            // ==========================

            alert("Login Successful (Dummy)");

            navigate("/");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center p-4">

            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
            </div>

            <div className="relative w-full max-w-sm">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                        <Code2 size={16} className="text-white" />
                    </div>

                    <span className="text-lg font-bold tracking-tight text-white">
                        CompileX
                    </span>
                </div>

                {/* Card */}
                <div className="bg-[#18181b] border border-white/[0.08] rounded-2xl p-8">

                    <div className="mb-7">
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            Welcome back
                        </h1>

                        <p className="text-sm text-zinc-500 mt-1">
                            Sign in to continue your coding journey
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                Email address
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0e0e10] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                                    errors.emailId
                                        ? "border-red-500/60 focus:ring-red-500/30"
                                        : "border-white/[0.08] focus:border-violet-500/60 focus:ring-violet-500/20"
                                }`}
                                {...register("emailId")}
                            />

                            {errors.emailId && (
                                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                    <AlertCircle size={11} />
                                    {errors.emailId.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0e0e10] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                                    errors.password
                                        ? "border-red-500/60 focus:ring-red-500/30"
                                        : "border-white/[0.08] focus:border-violet-500/60 focus:ring-violet-500/20"
                                }`}
                                {...register("password")}
                            />

                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                    <AlertCircle size={11} />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* API Error */}
                        {error && (
                            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3.5 py-2.5">
                                <AlertCircle
                                    size={14}
                                    className="text-red-400 mt-0.5 flex-shrink-0"
                                />

                                <p className="text-red-400 text-xs leading-relaxed">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-zinc-600 text-xs mt-5">
                    Don't have an account?{" "}
                    <span
                        className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium transition-colors"
                        onClick={() => navigate("/signup")}
                    >
                        Create one
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;