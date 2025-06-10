import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer className="flex items-center justify-end w-full h-16">
            <div className="flex items-center space-x-4">
                <Button variant = "ghost" className="text-gray-500 hover:text-gray-700"> Privacy Policy </Button>
                <Button variant = "ghost" className="text-gray-500 hover:text-gray-700"> Terms of Service </Button>
            </div>
        </footer>
    );
}