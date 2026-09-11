"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./dark_mode_toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NavBar = () =>{
    const hasScrolled = useScrollTop();
    return (
        <div className={cn("bg-background text-foreground fixed top-0 z-50 flex items-center gap-2 w-full p-2", hasScrolled && "border-b shadow-sm")}>
            <Link href="/" className="flex-shrink-0 font-bold text-lg">JYC</Link>
            <nav aria-label="Account navigation" className="ml-auto flex items-center gap-x-2">
                <Button asChild variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/register">Register</Link>
                </Button>
                <ModeToggle />
            </nav>
        </div>
    )
};
