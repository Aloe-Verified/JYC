"use client";

import { env } from "process";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password }),

        });

        const data = await res.json();
        console.log(data);

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
                        src="/JYC_registration_icon.png"
                        alt="JYC Mascot"
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-white/25"
                    />
                </div>

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
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400
                         focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A64F1]"
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
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400
                         focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A64F1]"
                        />
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 bg-[#3A64F1] text-white font-semibold rounded-lg
                       hover:bg-[#3450c1] transition-transform active:scale-95"
                    >
                        Register
                    </button>
                </form>

                {/* Register link */}
                <p className="mt-6 text-center text-sm text-gray-300">
                    Already have an account?{' '}
                    <a href="/login" className="text-[#3A64F1] hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}