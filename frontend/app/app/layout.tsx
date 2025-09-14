"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileTextIcon, HomeIcon, SearchIcon, StarIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

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


