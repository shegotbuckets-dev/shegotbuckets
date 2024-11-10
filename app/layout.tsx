import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://shegotbuckets.vercel.app"),
    title: {
        default: "She Got Buckets",
        template: `%s | She Got Buckets`,
    },
    description:
        "She Got Buckets is a non-profit organization that empowers women to achieve financial independence through education and support.",
    icons: {
        icon: [{ url: "/favicon.ico", sizes: "any", type: "image/ico" }],
        shortcut: "/favicon.ico",
    },
    openGraph: {
        description:
            "She Got Buckets is a non-profit organization that empowers women to achieve financial independence through education and support.",
        images: [
            "https://whs60noh8nnjcx2i.public.blob.vercel-storage.com/home/SGBThumbnail-GbIIFnsAYBDttUhaKcleI5TDlWPyyO.jpg",
        ],
        url: "https://shegotbuckets.vercel.app/",
    },
    twitter: {
        card: "summary_large_image",
        title: "She Got Buckets",
        description:
            "She Got Buckets is a non-profit organization that empowers women to achieve financial independence through education and support.",
        siteId: "",
        creator: "@ltldev",
        creatorId: "",
        images: [
            "https://whs60noh8nnjcx2i.public.blob.vercel-storage.com/home/SGBThumbnail-GbIIFnsAYBDttUhaKcleI5TDlWPyyO.jpg",
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthWrapper>
            <html lang="en" suppressHydrationWarning>
                <body className={GeistSans.className}>
                    <Provider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                            <Toaster />
                        </ThemeProvider>
                    </Provider>
                    <Analytics />
                    <SpeedInsights />
                </body>
            </html>
        </AuthWrapper>
    );
}
