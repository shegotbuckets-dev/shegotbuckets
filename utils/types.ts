import { z } from "zod";

export type userCreateProps = z.infer<typeof userCreateSchema>;

const userCreateSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email" })
        .describe("user email"),
    first_name: z
        .string()
        .regex(/^[a-zA-Z]+$/, {
            message: "First name must only contain letters",
        })
        .min(3, { message: "First name is required" })
        .describe("user first name"),
    last_name: z
        .string()
        .regex(/^[a-zA-Z]+$/, {
            message: "Last name must only contain letters",
        })
        .min(3, { message: "Last name is required" })
        .describe("user last name"),
    profile_image_url: z
        .string()
        .url({ message: "Invalid URL" })
        .optional()
        .describe("user profile image URL"),
    user_id: z.string().describe("user ID"),
});

export type userUpdateProps = z.infer<typeof userUpdateSchema>;

const userUpdateSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email" })
        .nonempty({ message: "Email is required" })
        .describe("user email"),
    first_name: z
        .string()
        .regex(/^[a-zA-Z]+$/, {
            message: "First name must only contain letters",
        })
        .describe("user first name"),
    last_name: z
        .string()
        .regex(/^[a-zA-Z]+$/, {
            message: "Last name must only contain letters",
        })
        .describe("user last name"),
    profile_image_url: z
        .string()
        .url({ message: "Invalid URL" })
        .optional()
        .describe("user profile image URL"),
    user_id: z.string().describe("user ID"),
});

export enum SupabaseStorageBucket {
    EVENTS = "events",
    LEAGUES = "leagues",
    HOME = "home",
    MEMBERS = "members",
    PLAYERS = "players",
}

export const playerRegistrationSchema = z.object({
    legalFirstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .regex(
            /^[a-zA-Z\s-]+$/,
            "First name can only contain letters, spaces, and hyphens"
        ),
    legalLastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .regex(
            /^[a-zA-Z\s-]+$/,
            "Last name can only contain letters, spaces, and hyphens"
        ),
    preferredFirstName: z
        .string()
        .regex(
            /^[a-zA-Z\s-]*$/,
            "Preferred name can only contain letters, spaces, and hyphens"
        )
        .optional(),
    dateOfBirth: z
        .union([
            z.date({
                required_error: "Date of birth is required",
            }),
            z
                .string()
                .regex(
                    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
                    "Date must be in MM/DD/YYYY format"
                )
                .transform((str) => {
                    const [month, day, year] = str.split("/").map(Number);
                    const date = new Date(year, month - 1, day);
                    if (isNaN(date.getTime())) {
                        throw new Error("Invalid date");
                    }
                    return date;
                }),
        ])
        .refine((date) => {
            const age = new Date().getFullYear() - date.getFullYear();
            return age >= 16 && age <= 100;
        }, "You must be at least 16 years old to register"),
    phoneNumber: z
        .string()
        .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
    address: z.string().min(10, "Please enter a complete address"),
    certification: z
        .boolean()
        .refine((val) => val === true, "You must certify the information"),
    instagramAccount: z
        .string()
        .regex(/^@?[a-zA-Z0-9._]*$/, "Please enter a valid Instagram handle")
        .min(1, "Instagram account is required"),
    playerIntroduction: z
        .string()
        .max(500, "Introduction must be less than 500 characters")
        .optional(),
    playerHeadshot: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5000000,
            "File size must be less than 5MB"
        )
        .refine(
            (file) => ["image/jpeg", "image/jpg"].includes(file.type),
            "Only .jpg files are allowed"
        ),
});

export type PlayerRegistration = z.infer<typeof playerRegistrationSchema>;
