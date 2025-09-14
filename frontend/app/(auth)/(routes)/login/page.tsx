"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle error response
                throw new Error(data.message || 'Login failed');
            }

            // Check if we have a token in the response
            if (data.token || data.accessToken || data.bearerToken) {
                // Get the token from the response
                const token = data.token || data.accessToken || data.bearerToken;
                
                // Use the auth hook to store the token
                const success = login(token, data.user);
                
                if (success) {
                    console.log('Login successful, token stored');
                    
                    // Redirect to main app
                    router.push('/documents');
                } else {
                    throw new Error('Failed to store authentication data');
                }
            } else {
                throw new Error('No authentication token received');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Top-left logo */}
            <div className="absolute top-6 left-6 text-white text-lg font-bold">
                Logo
            </div>

            {/* Glassmorphic card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl">
                {/* Mascot */}
                <div className="flex justify-center">
                    <img
                        src="/JYC_icon_frame2.png"
                        alt="JYC Mascot"
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-white/25"
                    />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-center text-2xl font-bold text-black">
                    Welcome back, friend!
                </h2>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Email */}
                    <label className="relative block">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            disabled={isLoading}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400
                         focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A64F1] disabled:opacity-50"
                        />
                    </label>

                    {/* Password */}
                    <label className="relative block">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            disabled={isLoading}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400
                         focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A64F1] disabled:opacity-50"
                        />
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 mt-2 bg-[#3A64F1] text-white font-semibold rounded-lg
                       hover:bg-[#3450c1] transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Register link */}
                <p className="mt-6 text-center text-sm text-gray-300">
                    Don't have an account?{' '}
                    <a href="/register" className="text-[#3A64F1] hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}