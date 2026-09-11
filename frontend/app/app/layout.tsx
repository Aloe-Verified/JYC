"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthToken, getApiUrl, logout } from '@/lib/api';
import { FileTextIcon, HomeIcon, SearchIcon, StarIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [sessionState, setSessionState] = useState<'checking' | 'verified' | 'error'>('checking');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setSessionState('checking');
        async function verifySession() {
            const token = getAuthToken();
            if (!token) {
                router.replace('/login');
                return;
            }
            try {
                const response = await fetch(getApiUrl('/api/session'), {
                    headers: { Authorization: `Bearer ${token}` },
                    cache: 'no-store',
                    signal: controller.signal,
                });
                if (controller.signal.aborted) return;
                if (response.status === 401) {
                    logout();
                    router.replace('/login');
                    return;
                }
                if (!response.ok) throw new Error('Session verification failed');
                setSessionState('verified');
            } catch {
                if (!controller.signal.aborted) setSessionState('error');
            }
        }
        void verifySession();
        return () => controller.abort();
    }, [router, attempt]);

    if (sessionState === 'error') {
        return <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-foreground">
            <p role="alert">Unable to verify your session. Please try again.</p>
            <Button onClick={() => setAttempt(value => value + 1)}>Retry</Button>
        </div>;
    }

    if (sessionState !== 'verified') {
        return <div role="status" className="min-h-screen flex items-center justify-center text-foreground">Checking your session...</div>;
    }

    const navigation = [
        { name: 'Documents', href: '/app/documents', icon: FileTextIcon },
        { name: 'Search', href: '/app/search', icon: SearchIcon },
        { name: 'Favorites', href: '/app/favorites', icon: StarIcon },
        { name: 'Settings', href: '/app/settings', icon: SettingsIcon },
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-sidebar flex flex-col">
                {/* Logo/Brand */}
                <div className="p-6 border-b border-sidebar-border">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">JYC</span>
                        </div>
                        <span className="font-semibold text-sidebar-foreground">Note Taking</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-3",
                                        isActive 
                                            ? "bg-sidebar-accent text-sidebar-foreground" 
                                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* User info or additional actions could go here */}
                <div className="p-4 border-t border-sidebar-border">
                    <div className="text-xs text-sidebar-accent-foreground">
                        Powered by JYC
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

export default MainLayout;


