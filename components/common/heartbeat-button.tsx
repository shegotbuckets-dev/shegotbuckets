import { Button } from "@/components/ui/button";

import { Fragment } from "react";

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
        variant === "small"
            ? `
        text-xs
        h-6
        px-3
    `
            : `
        text-base
        h-10
        px-6
    `;

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
        min-[825px]:w-auto
        ${sizeClasses}
        ${className}
    `}
        >
            {children}
        </Button>
    );

    return (
        <Fragment>
            {href ? (
                <Link href={href}>{ButtonElement}</Link>
            ) : (
                <>{ButtonElement}</>
            )}
        </Fragment>
    );
}
