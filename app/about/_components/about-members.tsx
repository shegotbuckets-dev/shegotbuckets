"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/constants/supabase";
import { useMembers } from "@/utils/hook/useMembers";

import Image from "next/image";
import Link from "next/link";

const MemberCardSkeleton = () => (
    <Card className="overflow-hidden border border-border pb-4">
        <CardContent className="p-0 text-center">
            <Skeleton className="aspect-square w-full mb-4" />
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
        </CardContent>
    </Card>
);

const skeletonArray = Array(16).fill(null);

const MemberCard = ({
    member,
}: {
    member: Database["public"]["Tables"]["members"]["Row"];
}) => {
    return (
        <Link href={`/about/${member.member_id}`} className="block group">
            <Card className="group relative overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 pb-4">
                <CardContent className="p-0 text-center">
                    <div className="relative aspect-square mb-4 overflow-hidden">
                        <Image
                            src={member.image_url || "/images/sgb-together.png"}
                            alt={`${member.name}'s profile picture`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 grayscale"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                        {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider min-h-10">
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
        <section className="relative bg-gray-200/25">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
                            <Skeleton className="h-6 w-2/3 mx-auto" />
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Meet With Our Team
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Get to know the face behind SBG!!!
                            </p>
                        </>
                    )}
                </div>
            </div>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
                                  ) => (
                                      <MemberCard key={index} member={member} />
                                  )
                              )}
                    </div>
                </div>
            </section>
        </section>
    );
};
