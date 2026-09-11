"use client";

import { BrandMark } from "@/components/brand-mark";

import { getApiUrl } from '@/lib/api';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const res = await fetch(getApiUrl('/api/auth/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password }),

        });

        const data = await res.json();
        console.log(data);

    }
    return (
        <div className="min-h-screen flex items-center justify-center relative px-4 py-24">
            {/* Top-left logo */}
            <div className="absolute top-6 left-6 text-[#493322] text-lg font-bold">
                JYC
            </div>

            {/* Parchment card */}
            <div className="bg-[#FFF9ED] border border-[#D8C3A5] rounded-2xl p-8 w-full max-w-md shadow-[0_20px_60px_-20px_rgba(91,61,37,0.35)]">
                {/* Brand mark */}
                <div className="flex justify-center">
                    <BrandMark />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Email */}
                    <label className="relative block">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#806B55]" size={20} />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#D8C3A5] bg-[#F7EEDD] text-[#493322] placeholder-[#806B55]
                         focus:bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-[#795334]"
                        />
                    </label>

                    {/* Password */}
                    <label className="relative block">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#806B55]" size={20} />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#D8C3A5] bg-[#F7EEDD] text-[#493322] placeholder-[#806B55]
                         focus:bg-[#FFFCF5] focus:outline-none focus:ring-2 focus:ring-[#795334]"
                        />
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 bg-[#795334] text-[#FFF9ED] font-semibold rounded-lg
                       hover:bg-[#5C3D26] transition-transform active:scale-95"
                    >
                        Register
                    </button>
                </form>

                {/* Register link */}
                <p className="mt-6 text-center text-sm text-[#705B46]">
                    Already have an account?{' '}
                    <a href="/login" className="text-[#795334] font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
