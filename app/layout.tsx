import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";

import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://shegotbuckets.vercel.app/"),
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
            "https://xfnfajmpjdkajuaywztb.supabase.co/storage/v1/object/sign/home/SGBThumbnail.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJob21lL1NHQlRodW1ibmFpbC5qcGciLCJpYXQiOjE3MzEzOTMwOTQsImV4cCI6MTg4OTA3MzA5NH0.C-QxhFLI8eBvfpefeejHJr2wK3uE_MHZ2f6eWbOMrk4&t=2024-11-12T06%3A31%3A33.066Z",
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
            "https://xfnfajmpjdkajuaywztb.supabase.co/storage/v1/object/sign/home/SGBThumbnail.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJob21lL1NHQlRodW1ibmFpbC5qcGciLCJpYXQiOjE3MzEzOTMwOTQsImV4cCI6MTg4OTA3MzA5NH0.C-QxhFLI8eBvfpefeejHJr2wK3uE_MHZ2f6eWbOMrk4&t=2024-11-12T06%3A31%3A33.066Z",
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
                <GoogleAnalytics gaId="G-SZ9BB19B6R" />
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
                    <SpeedInsights sampleRate={0.5} />
                </body>
            </html>
        </AuthWrapper>
    );
}
