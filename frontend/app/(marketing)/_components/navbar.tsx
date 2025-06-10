"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./dark_mode_toggle";

export const NavBar = () =>{
    const hasScrolled = useScrollTop();
    return (
        <div className={cn("bg-background fixed top-0 flex items-center w-full p-2", hasScrolled && "border-b shadow-sm")}>
            <div className = "flex-shrink-0 no-wrap font-bold text-lg"> Logo goes here </div>
            <div className="ml-auto justify-end justify-between w-full flex items-center gap-x-2 mr-4">
                <ModeToggle />
            </div>
        </div>
    )
};