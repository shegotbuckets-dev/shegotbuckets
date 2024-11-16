"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUser } from "@clerk/nextjs";

export default function Settings() {
    const { user } = useUser();

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight border-b pb-2 mb-6">
                    My Profile
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                disabled
                                defaultValue={user?.firstName ?? ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                disabled
                                defaultValue={user?.lastName ?? ""}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            disabled
                            defaultValue={
                                user?.emailAddresses?.[0]?.emailAddress ?? ""
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
