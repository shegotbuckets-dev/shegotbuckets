import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

type IconProps = React.HTMLAttributes<SVGElement>;
type LogoProps = {
    currentTheme: string;
    size?: "large" | "small";
    className?: string;
};

export const Logos = {
    twitter: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
        </svg>
    ),
    sgbLogo: ({ currentTheme, size = "large", className = "" }: LogoProps) => (
        <Link
            href="/"
            className={cn(
                "flex items-center",
                size === "large" ? "h-16" : "h-8",
                className
            )}
            aria-label="Home"
        >
            <Image
                src={`/images/sgb-${currentTheme === "dark" ? "dark" : "light"}.png`}
                alt="SGB Logo"
                width={size === "large" ? 120 : 60}
                height={size === "large" ? 60 : 30}
                className={cn(
                    size === "large"
                        ? "w-[120px] h-[60px]"
                        : "w-[60px] h-[30px]"
                )}
                priority
            />
            <span className="sr-only">Home</span>
        </Link>
    ),
};
