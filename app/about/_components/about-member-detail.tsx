import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMediaUrl } from "@/lib/utils";
import { fetchMemberDetailById } from "@/utils/actions/supabase";
import { SupabaseStorageBucket } from "@/utils/types";

import { Suspense } from "react";

import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const MemberDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            <Suspense fallback={<MemberDetailSkeleton />}>
                <MemberDetailContent id={params.id} />
            </Suspense>
        </div>
    );
};

const MemberDetailSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-[1200px] p-8 rounded-3xl border-2">
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
        <div className="min-h-screen bg-[#f5f3f1] flex items-center justify-center p-4">
            <Card className="w-full max-w-[1200px] p-8 rounded-3xl border-2">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <h1 className="text-6xl font-serif">
                                {memberDetail.name}
                            </h1>
                        </div>

                        <div className="space-y-6 text-muted-foreground">
                            <p className="text-xl">
                                {memberDetail.description}
                            </p>
                        </div>
                        <div className="flex gap-4 pt-4">
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
                        </div>
                    </div>
                    <div className="relative h-[600px] w-full">
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
                            alt={`profile picture`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};
