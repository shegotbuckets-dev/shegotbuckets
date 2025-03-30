import { Button } from "@/components/ui/button";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const ResourcesSection = () => {
    return (
        <section className="py-12">
            <div className="container max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">
                    Additional Resources
                </h2>
                <p className="text-muted-foreground mb-8 max-w-3xl">
                    Access our complete collection of game resources,
                    recordings, and more
                </p>

                <Link
                    href="https://drive.google.com/drive/folders/1w_d0ybIDeK-BuQEJ0KvkAas6Uq1XNd0p"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button className="flex items-center justify-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Resource Library
                    </Button>
                </Link>
            </div>
        </section>
    );
};
