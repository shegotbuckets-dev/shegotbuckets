"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "@/constants/supabase";
import { fetchUserData } from "@/utils/actions/user";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { AtSign, Calendar, Home, Phone } from "lucide-react";
import Image from "next/image";

type UserData = Database["public"]["Tables"]["users"]["Row"];

function capitalizeFirstLetter(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
}

function Description({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}

function ProfileField({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                <Label htmlFor={label}>{label}</Label>
            </div>
            <Input id={label} disabled value={value} />
        </div>
    );
}

export default function Profile() {
    const { user } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUserData() {
            if (!user?.id) return;
            try {
                const data = await fetchUserData(user.id);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadUserData();
    }, [user?.id]);

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-24 h-24 flex-shrink-0">
                        {userData?.headshot_url ? (
                            <Image
                                src={userData.headshot_url}
                                alt="Player headshot"
                                fill
                                priority
                                sizes="(max-width: 768px) 96px, 96px"
                                className="object-cover rounded-full border-2 border-border"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                                <span className="text-2xl text-muted-foreground">
                                    ?
                                </span>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">
                            {[
                                capitalizeFirstLetter(
                                    userData?.preferred_first_name ??
                                        userData?.legal_first_name ??
                                        "No name"
                                ),
                                capitalizeFirstLetter(
                                    userData?.legal_last_name ?? "set"
                                ),
                            ].join(" ")}
                        </h2>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <ProfileField
                            label="Email"
                            value={
                                user?.emailAddresses?.[0]?.emailAddress ??
                                "No email set"
                            }
                            icon={AtSign}
                        />
                        <ProfileField
                            label="Phone"
                            value={
                                userData?.phone_number ?? "No phone number set"
                            }
                            icon={Phone}
                        />
                    </div>

                    <ProfileField
                        label="Address"
                        value={userData?.address ?? "No address set"}
                        icon={Home}
                    />

                    <ProfileField
                        label="Date of Birth"
                        value={
                            userData?.date_of_birth ?? "No date of birth set"
                        }
                        icon={Calendar}
                    />

                    <ProfileField
                        label="Instagram"
                        value={
                            userData?.instagram_account ??
                            "No Instagram account set"
                        }
                        icon={AtSign}
                    />

                    <div className="space-y-2">
                        <Label>Player Introduction</Label>
                        <Textarea
                            disabled
                            value={
                                userData?.player_introduction ??
                                "No introduction set"
                            }
                            className="resize-none h-32 bg-muted"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileSkeleton() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-6 mb-8">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Skeleton className="h-10" />
                        <Skeleton className="h-10" />
                    </div>
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-32" />
                </div>
            </div>
        </div>
    );
}
