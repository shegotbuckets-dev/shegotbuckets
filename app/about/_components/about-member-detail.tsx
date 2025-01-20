import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMediaUrl } from "@/lib/utils";
import { fetchMemberDetailById } from "@/utils/actions/supabase";
import { SupabaseStorageBucket } from "@/utils/types";

import { Suspense } from "react";

import { ArrowLeft, Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MemberDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="bg-background text-foreground">
            <Suspense fallback={<MemberDetailSkeleton />}>
                <MemberDetailContent id={params.id} />
            </Suspense>
        </div>
    );
};

const MemberDetailSkeleton = () => {
    return (
        <div className="flex items-center justify-center py-12">
            <Card className="w-full max-w-4xl p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-3/4" />
                            <Skeleton className="h-16 w-1/2" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-3/4" />
                            <Skeleton className="h-16 w-1/2" />
                        </div>

                        <div className="space-y-6">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>

                    <Skeleton className="h-[600px] w-full rounded-lg" />
                </div>
            </Card>
        </div>
    );
};

const MemberDetailContent = async ({ id }: { id: string }) => {
    const memberDetail = await fetchMemberDetailById(id);

    if (!memberDetail) {
        return <div>Member not found</div>;
    }

    return (
        <div className="bg-[#f5f3f1] pt-28 pb-12">
            {/* Container */}
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Link */}
                <div className="mb-8">
                    <Link
                        href="/about#team-section"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Members</span>
                    </Link>
                </div>

                {/* Content Card */}
                <Card className="p-8">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Image Side - 30% */}
                        <div className="lg:col-span-4 relative h-[400px]">
                            <Image
                                src={
                                    memberDetail.image_url &&
                                    memberDetail.image_url.length > 0
                                        ? getMediaUrl(
                                              SupabaseStorageBucket.MEMBERS,
                                              memberDetail.image_url ?? ""
                                          )
                                        : "/images/sgb-together.png"
                                }
                                alt={`${memberDetail.name}'s profile picture`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>

                        {/* Right Content Side - 70% */}
                        <div className="lg:col-span-8 space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {memberDetail.name}
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    {memberDetail.title}
                                </p>
                            </div>

                            <div>
                                <p className="text-base leading-relaxed">
                                    {memberDetail.description}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="ghost"
                                    className="hover:bg-black hover:text-white transition-colors"
                                    asChild
                                >
                                    <Link
                                        href="#instagram"
                                        className="flex items-center gap-2"
                                    >
                                        <Instagram className="h-4 w-4" />
                                        <span>Instagram</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="hover:bg-black hover:text-white transition-colors"
                                    asChild
                                >
                                    <Link
                                        href="#facebook"
                                        className="flex items-center gap-2"
                                    >
                                        <Facebook className="h-4 w-4" />
                                        <span>Facebook</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="hover:bg-black hover:text-white transition-colors"
                                    asChild
                                >
                                    <Link
                                        href="#linkedin"
                                        className="flex items-center gap-2"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                        <span>LinkedIn</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
