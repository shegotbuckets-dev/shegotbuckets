import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/dashboard",
                    "/dashboard/*",
                    "/api/*",
                    // "/sign-in",
                    "/sign-in/*",
                    "/sign-up",
                    "/sign-up/*",
                    "/user-profile",
                    "/user-profile/*",
                ],
            },
        ],
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    };
}
