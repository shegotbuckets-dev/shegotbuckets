import { fetchLeagues } from "@/utils/actions/supabase";

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const leagues = await fetchLeagues();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/qna`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // in database it is leagues, but in Nav Bar, we want to call them events per requested.
    // each event page will list all events for that league.
    const eventRoutes: MetadataRoute.Sitemap = leagues.map(({ league_id }) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${league_id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
    }));

    return [...staticRoutes, ...eventRoutes];
}
