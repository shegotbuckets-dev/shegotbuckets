import { Database } from "@/constants/supabase";

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
    payments: Database["public"]["Tables"]["event_payments"]["Row"][];
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

export interface EventsTableContainerProps {
    loading: boolean;
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
    waiverSigned: boolean;
    paymentStatus: boolean;
};

export type EventBasicInfo = Database["public"]["Tables"]["events"]["Row"] & {
    userStatus: UserEventStatus;
};

export interface EventsData {
    activeEvents: EventBasicInfo[];
    previousEvents: EventBasicInfo[];
}

export interface PaymentButtonProps {
    event: EventBasicInfo;
    paymentStatus: boolean | undefined;
    onPaymentClick: (hasTeam2: boolean) => void;
    isLoading: boolean;
}

export interface PaymentRequestData {
    event_id: string;
    registration_id?: string;
    email: string;
    eventName: string;
    hasTeam2: boolean;
}

interface EventRegistration {
    created_at: string;
    event_id: string | null;
    registration_id: string;
    team_id: string | null;
    // Add other fields that exist in your table
}
