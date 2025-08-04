"use client";

import { useEffect, useState } from "react";

export const PerformanceWidgetWrapper = () => {
    const [PerformanceWidget, setPerformanceWidget] =
        useState<React.ComponentType | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Only load in development
        if (process.env.NODE_ENV === "development") {
            import("./performance-widget")
                .then((module) => {
                    setPerformanceWidget(() => module.PerformanceWidget);
                })
                .catch(() => {
                    console.warn("Performance widget not available");
                });
        }
    }, []);

    // Don't render anything on server or if not in development
    if (
        !isClient ||
        process.env.NODE_ENV !== "development" ||
        !PerformanceWidget
    ) {
        return null;
    }

    return <PerformanceWidget />;
};
