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
    metadataBase: new URL("https://www.shegotbuckets.org/"),
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
        title: "She Got Buckets",
        description:
            "She Got Buckets is a non-profit organization that empowers women to achieve financial independence through education and support.",
        url: "https://www.shegotbuckets.org/",
        siteName: "She Got Buckets",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "She Got Buckets Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "She Got Buckets",
        description:
            "She Got Buckets is a non-profit organization that empowers women to achieve financial independence through education and support.",
        images: ["/opengraph-image.png"],
        siteId: "",
        creator: "@ltldev",
        creatorId: "",
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
                    <SpeedInsights sampleRate={1} />
                </body>
            </html>
        </AuthWrapper>
    );
}
