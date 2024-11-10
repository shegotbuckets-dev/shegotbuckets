import { Button } from "@/components/ui/button";

// import { Fragment } from "react";
import Link from "next/link";

interface HeartBeatButtonProps {
    className?: string;
    href?: string;
    children?: React.ReactNode;
    variant?: "default" | "small";
}

export function HeartBeatButton({
    className = "",
    href = "",
    children = "",
    variant = "default",
}: HeartBeatButtonProps) {
    const sizeClasses =
        variant === "small" ? "text-xs h-6 px-3" : "text-base py-3 px-6";

    const ButtonElement = (
        <Button
            className={`
                animate-buttonheartbeat 
                rounded-md 
                bg-orange-600 
                hover:bg-orange-500 
                font-semibold 
                text-white 
                w-full 
                sm:w-auto
                h-[48px]
                ${sizeClasses}
                ${className}
            `}
        >
            {children}
        </Button>
    );

    return href ? (
        <Link href={href} className="w-full">
            {ButtonElement}
        </Link>
    ) : (
        ButtonElement
    );
}
