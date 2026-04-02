import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, Apple, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen flex items-stretch bg-white">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-dark overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
                    alt="Luxury Stay"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 hover:scale-100 transition-transform duration-10000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                
                <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
                    <Link to="/" className="flex items-center gap-2 text-white">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <span className="font-display font-bold text-xl text-white">M</span>
                        </div>
                        <span className="font-display font-bold text-2xl tracking-tight">HoyLink</span>
                    </Link>

                    <div>
                        <h2 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
                            Find your next <br />
                            <span className="text-primary italic">extraordinary</span> experience.
                        </h2>
                        <p className="text-gray-300 text-lg max-w-md">
                            Join thousands of travelers who find unique stays and unforgettable adventures through HoyLink.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <img 
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-dark"
                                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                    alt="User"
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-400">
                            <span className="text-white font-bold">1.2k+</span> travelers joined this week
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-gray-50/50">
                <div className="w-full max-w-md">
                    <div className="text-center lg:text-left mb-10">
                        <div className="lg:hidden flex justify-center mb-6">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="font-display font-bold text-white">M</span>
                                </div>
                                <span className="font-display font-bold text-xl text-dark">HoyLink</span>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-dark mb-2">Welcome Back</h1>
                        <p className="text-gray-500">New to HoyLink? <a href="#" className="text-primary font-bold hover:underline">Create an account</a></p>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm">
                            <Chrome size={20} className="text-red-500" />
                            <span className="text-sm font-bold text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm">
                            <Apple size={20} className="text-dark" />
                            <span className="text-sm font-bold text-gray-700">Apple</span>
                        </button>
                    </div>

                    <div className="relative mb-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative px-4 text-xs font-bold text-gray-400 uppercase bg-gray-50/50">Or continue with</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-dark mb-1 ml-1" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    id="email"
                                    type="email" 
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-dark mb-1 ml-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    id="password"
                                    type={showPassword ? "text" : "password"} 
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                                <span className="text-sm font-medium text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-bold text-primary hover:underline">Forgot password?</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-gray-400 text-xs">
                        By signing in, you agree to our <a href="#" className="text-dark font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-dark font-bold hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
