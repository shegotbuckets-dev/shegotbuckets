"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/constants/supabase";
import { slugifyMemberName } from "@/lib/utils";
import { useMembers } from "@/utils/hook/useMembers";

import Link from "next/link";

const MemberCardSkeleton = () => (
    <Card className="h-full">
        <CardContent className="p-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
        </CardContent>
    </Card>
);

const skeletonArray = Array(16).fill(null);

const MemberCard = ({
    member,
}: {
    member: Database["public"]["Tables"]["members"]["Row"];
}) => {
    const memberSlug = slugifyMemberName(member.name);

    if (!memberSlug) {
        return null;
    }

    return (
        <Link href={`/about/${memberSlug}`} className="block group">
            <Card className="h-full hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-1">
                        {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                        {member.title}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
};

export const AboutMembers = () => {
    const { data: teamMembers, isLoading } = useMembers();

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-muted-foreground">
                        Get to know the faces behind She Got Buckets that
                        empowered all of these happened.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading
                        ? skeletonArray.map((_, index) => (
                              <div
                                  key={`skeleton-${index}`}
                                  className="animate-pulse"
                              >
                                  <MemberCardSkeleton />
                              </div>
                          ))
                        : teamMembers?.map(
                              (
                                  member: Database["public"]["Tables"]["members"]["Row"],
                                  index: number
                              ) => <MemberCard key={index} member={member} />
                          )}
                </div>
            </div>
        </section>
    );
};
