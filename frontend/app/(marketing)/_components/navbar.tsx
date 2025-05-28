"use client";
import {useState, useEffect} from "react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";

export const NavBar = () =>{
    const hasScrolled = useScrollTop();
    return (
        <div className={`fixed top-0 left-0 w-full bg-white transition-transform duration-300 ${hasScrolled ? "translate-y-0" : "-translate-y-full"}`}>
            <nav className="flex items-center justify-between p-4">
                <div className="text-lg font-bold">Logo</div>
                <ul className="flex space-x-4">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>
    )
};