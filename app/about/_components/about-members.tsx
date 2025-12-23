"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/constants/supabase";
import { getMediaUrl, slugifyMemberName } from "@/lib/utils";
import { useMembers } from "@/utils/hook/useMembers";
import { SupabaseStorageBucket } from "@/utils/types";

import Image from "next/image";
import Link from "next/link";

const MemberCardSkeleton = () => (
    <div className="flex flex-col items-center text-center gap-2.5">
        <Skeleton className="h-36 w-36 rounded-full sm:h-40 sm:w-40" />
        <div className="space-y-1">
            <Skeleton className="h-7 w-36 mx-auto" />
            <Skeleton className="h-4 w-28 mx-auto" />
        </div>
    </div>
);

const skeletonArray = Array(16).fill(null);

const MemberCard = ({
    member,
}: {
    member: Database["public"]["Tables"]["members"]["Row"];
}) => {
    const memberSlug = slugifyMemberName(member.name);
    const imageUrl = member.image_url
        ? member.image_url.startsWith("http")
            ? member.image_url
            : getMediaUrl(SupabaseStorageBucket.MEMBERS, member.image_url)
        : null;

    if (!memberSlug) {
        return null;
    }

    return (
        <Link href={`/about/${memberSlug}`} className="block group">
            <div className="flex flex-col items-center text-center gap-2.5">
                <div className="relative h-36 w-36 sm:h-40 sm:w-40">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={`${member.name} headshot`}
                            fill
                            className="rounded-full object-cover"
                            sizes="(min-width: 1024px) 160px, 144px"
                        />
                    ) : (
                        <div className="h-full w-full rounded-full bg-muted" />
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl font-semibold leading-tight">
                        {member.name}
                    </h3>
                    <p className="text-base text-muted-foreground uppercase tracking-wide">
                        {member.title}
                    </p>
                </div>
            </div>
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
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
