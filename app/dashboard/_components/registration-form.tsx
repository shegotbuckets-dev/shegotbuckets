"use client";

import {
    type PlayerRegistration,
    playerRegistrationSchema,
} from "@/app/dashboard/types";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { submitRegistration } from "@/utils/actions/user";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { setMonth, setYear } from "date-fns";
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
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="legalFirstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="flex items-center gap-1">
                                    Legal First Name
                                    <span className="text-red-500">*</span>
                                </FormLabel>
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
                            <FormItem className="flex-1">
                                <FormLabel className="flex items-center gap-1">
                                    Legal Last Name
                                    <span className="text-red-500">*</span>
                                </FormLabel>
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
                            <FormItem className="flex-1">
                                <FormLabel>
                                    Preferred First Name (Optional)
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="flex items-center gap-1">
                                    Date of Birth
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
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
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <div className="flex items-center justify-between p-2">
                                            <Select
                                                value={
                                                    field.value
                                                        ? field.value
                                                              .getFullYear()
                                                              .toString()
                                                        : new Date()
                                                              .getFullYear()
                                                              .toString()
                                                }
                                                onValueChange={(year) => {
                                                    const newYear = parseInt(
                                                        year,
                                                        10
                                                    );
                                                    if (field.value) {
                                                        const newDate = setYear(
                                                            field.value,
                                                            newYear
                                                        );
                                                        field.onChange(newDate);
                                                    } else {
                                                        const newDate = setYear(
                                                            new Date(),
                                                            newYear
                                                        );
                                                        field.onChange(newDate);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Array.from(
                                                        { length: 124 },
                                                        (_, i) =>
                                                            new Date().getFullYear() -
                                                            i
                                                    ).map((year) => (
                                                        <SelectItem
                                                            key={year}
                                                            value={year.toString()}
                                                        >
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                value={
                                                    field.value
                                                        ? field.value
                                                              .getMonth()
                                                              .toString()
                                                        : new Date()
                                                              .getMonth()
                                                              .toString()
                                                }
                                                onValueChange={(month) => {
                                                    const newMonth = parseInt(
                                                        month,
                                                        10
                                                    );
                                                    if (field.value) {
                                                        const newDate =
                                                            setMonth(
                                                                field.value,
                                                                newMonth
                                                            );
                                                        field.onChange(newDate);
                                                    } else {
                                                        const newDate =
                                                            setMonth(
                                                                new Date(),
                                                                newMonth
                                                            );
                                                        field.onChange(newDate);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[
                                                        "January",
                                                        "February",
                                                        "March",
                                                        "April",
                                                        "May",
                                                        "June",
                                                        "July",
                                                        "August",
                                                        "September",
                                                        "October",
                                                        "November",
                                                        "December",
                                                    ].map((month, index) => (
                                                        <SelectItem
                                                            key={month}
                                                            value={index.toString()}
                                                        >
                                                            {month}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            month={field.value || new Date()}
                                            onMonthChange={(newMonth) => {
                                                field.onChange(newMonth);
                                            }}
                                            className="rounded-md border"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    As shown on your government-issued ID.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="flex items-center gap-1">
                                    Phone Number
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="instagramAccount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">
                                Social Media Account (Instagram)
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="@yourusername" {...field} />
                            </FormControl>
                            <FormDescription>
                                <span className="font-bold">
                                    She Got Buckets Social Media Initiatives:
                                </span>{" "}
                                We would love to highlight your game photos and
                                videos (ins: shegotbuckets_basketball). You can
                                always remove your tagged photos under
                                Instagram&apos;s settings or opt out anytime.{" "}
                                <span className="font-bold">
                                    You may fill N/A if you would like to opt
                                    out from game photo tags.
                                </span>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">
                                Address
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="playerIntroduction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Introduction (Optional)</FormLabel>
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
                            <FormLabel className="flex items-center gap-1">
                                Player Headshot
                                <span className="text-red-500">*</span>
                            </FormLabel>
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
                                Please Upload Your Headshot (JPG format only,
                                max 5MB, this will only be used for stats
                                tracking and event check-in)
                            </FormDescription>
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

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Complete"
                    )}
                </Button>
            </form>
        </Form>
    );
}
