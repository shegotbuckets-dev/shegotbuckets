import { Database } from "@/constants/supabase";

import { z } from "zod";

export interface SidebarNav {
    title: string;
    url: string;
    icon: any;
    isLab?: boolean;
    separator?: boolean;
}

export interface DashboardData {
    events: Database["public"]["Tables"]["events"]["Row"][];
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    registrations: Database["public"]["Tables"]["event_registrations"]["Row"][];
    registrationPlayers: Database["public"]["Tables"]["event_players"]["Row"][];
}

export interface EventTableData {
    event_id: string;
    registration_id: string | undefined | null;
    name: string;
    subtitle: string;
    date: string;
    location: string;
    price: string;
    user_email: string;
    team_id: string;
    team: string;
    registered: boolean;
    rosterUploaded: boolean;
    waiverSigned: boolean;
    active: boolean;
    roster: Database["public"]["Tables"]["event_players"]["Row"][];
    paymentStatus: boolean;
}

export interface UserEventData {
    registration_id: string | undefined | null;
    registered: boolean;
    teamId: string | undefined | null;
    waiverSigned: boolean;
}

export type TableHeaders = {
    active: readonly string[];
    activeWithTeam: readonly string[];
    previous: readonly string[];
    previousWithTeam: readonly string[];
};

export const HEADERS: TableHeaders = {
    active: [
        "Event",
        "Season",
        "Date",
        "Location",
        "Register",
        "Roster",
        "Waiver",
        "Payment",
    ],
    activeWithTeam: [
        "Event",
        "Season",
        "Date",
        "Location",
        "Team",
        "Register",
        "Roster",
        "Waiver",
        "Payment",
    ],
    previous: ["Event", "Season", "Date", "Location", "Participated", "Roster"],
    previousWithTeam: [
        "Event",
        "Season",
        "Date",
        "Location",
        "Team",
        "Participated",
        "Roster",
    ],
};

export interface EventsTableProps {
    events: EventBasicInfo[];
    onButtonSuccess: () => void;
}

export const STATUS_BADGE_CLASSNAME =
    "w-24 h-6 truncate text-center justify-center cursor-default";
export const STATUS_BADGE_CLASSNAME_CLICKABLE =
    "w-24 h-6 truncate text-center justify-center cursor-pointer";
export const TEAM_BADGE_CLASSNAME =
    "w-32 h-6 truncate text-center justify-center cursor-default";
export const WAIVER_BADGE_CLASSNAME =
    "w-24 h-6 truncate text-center justify-center cursor-default";

export interface BaseCellProps {
    event: EventBasicInfo;
}

export interface WaiverCellProps extends BaseCellProps {
    onButtonSuccess: () => void;
}

export interface RegisterOrParticipatedCellProps extends BaseCellProps {
    onButtonSuccess: () => void;
}

export const BADGE_TEXT = {
    YES: "Yes",
    NO: "No",
    NA: "N/A",
    REGISTERED: "Registered",
    WAIVER_SIGNED: "Waiver Signed",
};

export interface RegisterButtonProps {
    event: EventBasicInfo;
    onButtonSuccess: () => void;
}

export interface UseRegisterFormProps {
    event: EventBasicInfo;
    teams: TeamOption[];
    registrations: Database["public"]["Tables"]["event_registrations"]["Row"][];
    onButtonSuccess: () => void;
}

export interface TeamOption {
    team_id: string;
    name: string;
}

export interface EventDetailsProps {
    date: string;
    location: string;
    price: string | number;
}

export interface RosterData {
    email: string;
    legal_first_name: string;
    legal_last_name: string;
    jersey_number: string;
}

export interface PlayerRegistrationData {
    user_email: string;
    first_name: string;
    last_name: string;
    jersey_number: number;
}

export interface RegistrationData {
    event_id: string;
    team_id: string;
    players: PlayerRegistrationData[];
}

export interface RosterButtonProps {
    event: EventBasicInfo;
    onButtonSuccess: () => void;
}

export interface RosterTableProps {
    roster: Database["public"]["Tables"]["event_players"]["Row"][];
}

export const ROSTER_HEADERS = [
    "First Name",
    "Last Name",
    "Email",
    "Jersey Number",
    "Waiver",
];

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

export interface UserRegistrationStatus {
    isRegistered: boolean;
    userData: {
        user_id: string;
        data_collected: boolean;
        // ... other fields
    } | null;
}

export type UserEventStatus = {
    isRegistered: boolean;
    registration_id: string | undefined;
    team: string | undefined;
    team_id: string | undefined;
    waiverSigned: boolean;
    paymentStatus: boolean;
};

export interface StripePriceIds {
    [key: string]: string[] | undefined;
    required: string[];
    optional: string[];
}

export type EventBasicInfo = Omit<
    Database["public"]["Tables"]["events"]["Row"],
    "stripe_price_ids"
> & {
    userStatus: UserEventStatus;
    stripe_price_ids: StripePriceIds | null;
    original_event_id: string; // For multi-team support
    user_team_count?: number; // Number of teams user is registered for in this event
};

export interface EventsData {
    availableEvents: EventBasicInfo[]; // Active events with registration open
    comingSoonEvents: EventBasicInfo[]; // Active events with registration not yet open
    previousEvents: EventBasicInfo[]; // Inactive events
}

export interface PaymentButtonProps {
    event: EventBasicInfo;
    paymentStatus: boolean | undefined;
    onPaymentClick: () => void;
    isLoading: boolean;
}

export interface PaymentRequestData {
    event_id: string;
    registration_id?: string; // Optional - only for multi-team registrations
    team_id: string;
    team_name?: string;
    user_email?: string; // For new registrations (webhook needs this)
    email: string;
    first_name?: string; // For new registrations
    last_name?: string; // For new registrations
    eventName: string; // Short name for display
    eventNameFull: string; // Full name for receipts
    stripe_price_ids: StripePriceIds;
}

// New types for register team flow
export interface RegisterTeamData {
    event_id: string;
    team_id: string;
    user_email: string;
    first_name: string;
    last_name: string;
}

export interface JoinTeamData {
    registration_id: string;
    event_id: string;
    user_email: string;
    user_id?: string;
    first_name: string;
    last_name: string;
    jersey_number: number;
}
