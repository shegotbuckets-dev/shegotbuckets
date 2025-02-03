"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { submitRegistration } from "@/utils/actions/user";
import {
    type PlayerRegistration,
    playerRegistrationSchema,
} from "@/utils/types";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const { userId } = useAuth();

    const form = useForm<PlayerRegistration>({
        resolver: zodResolver(playerRegistrationSchema),
        defaultValues: {
            legalFirstName: "",
            legalLastName: "",
            preferredFirstName: "",
            phoneNumber: "",
            address: "",
            certification: false,
            instagramAccount: "",
            playerIntroduction: "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Add this helper function to parse date string
    const parseDateString = (dateString: string): Date | null => {
        // Try to parse MM/DD/YYYY format
        const parsed = parse(dateString, "MM/dd/yyyy", new Date());
        if (isValid(parsed)) return parsed;
        return null;
    };

    async function onSubmit(values: PlayerRegistration) {
        try {
            setIsSubmitting(true);
            if (!userId) throw new Error("User not found");

            // Create FormData
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("legalFirstName", values.legalFirstName);
            formData.append("legalLastName", values.legalLastName);
            formData.append(
                "preferredFirstName",
                values.preferredFirstName || ""
            );
            formData.append("dateOfBirth", values.dateOfBirth.toISOString());
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("address", values.address);
            formData.append("instagramAccount", values.instagramAccount || "");
            formData.append(
                "playerIntroduction",
                values.playerIntroduction || ""
            );
            formData.append("headshot", values.playerHeadshot);

            await submitRegistration(formData);

            toast({
                title: "Registration Successful",
                description:
                    "Welcome to She Got Buckets! Redirecting to dashboard...",
            });

            setTimeout(() => router.push("/dashboard/home"), 2000);
        } catch (error) {
            console.error("Registration error:", error);
            toast({
                title: "Registration Failed",
                description:
                    "There was an error submitting your registration. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-2xl"
            >
                <FormField
                    control={form.control}
                    name="legalFirstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Legal First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                As shown on your government-issued ID.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="legalLastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Legal Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                As shown on your government-issued ID.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="preferredFirstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferred First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Optional. This will be used for game
                                announcements.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <div className="flex gap-4">
                                <FormControl>
                                    <Input
                                        placeholder="MM/DD/YYYY"
                                        value={
                                            field.value
                                                ? format(
                                                      field.value,
                                                      "MM/dd/yyyy"
                                                  )
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const date = parseDateString(
                                                e.target.value
                                            );
                                            if (date) {
                                                field.onChange(date);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <FormDescription>
                                Enter date in MM/DD/YYYY format or use the date
                                picker. This should match the date on your
                                government-issued ID.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="certification"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I certify that all information provided
                                    above is accurate and matches my
                                    government-issued ID.
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instagramAccount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instagram Account (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="@yourusername" {...field} />
                            </FormControl>
                            <FormDescription>
                                We would love to highlight game photos and
                                videos on our Instagram account
                                (shegotbuckets_basketball). If you would love to
                                have us tag you in photos, please provide your
                                Instagram username.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="playerIntroduction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Player Introduction (Optional)
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Share some fun facts about yourself (hometown, school, grade, etc.)"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                We will introduce all players at the beginning
                                of games.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="playerHeadshot"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel>Player Headshot</FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    <Input
                                        type="file"
                                        accept="image/jpeg"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                onChange(file);
                                                handleImageChange(e);
                                            }
                                        }}
                                        {...rest}
                                    />
                                    {imagePreview && (
                                        <div className="relative w-32 h-32">
                                            <Image
                                                src={imagePreview}
                                                alt="Headshot preview"
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                Please upload your headshot (JPG format only,
                                max 5MB). This will only be used for stats
                                tracking.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Registration"
                    )}
                </Button>
            </form>
        </Form>
    );
}
