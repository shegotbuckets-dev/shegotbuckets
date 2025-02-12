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
    dashboardData: DashboardData;
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
    event: EventTableData;
}

export interface WaiverCellProps extends BaseCellProps {
    onButtonSuccess: () => void;
}

export interface RegisterOrParticipatedCellProps extends BaseCellProps {
    dashboardData: DashboardData;
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
    event: EventTableData;
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    registrations: Database["public"]["Tables"]["event_registrations"]["Row"][];
    onButtonSuccess: () => void;
}

export interface EventDetailsProps {
    date: string;
    location: string;
    price: string | number;
}

export interface RosterData {
    legal_first_name: string;
    legal_last_name: string;
    email: string;
    jersey_number: string;
    [key: string]: string;
}

export interface RosterButtonProps {
    event: EventTableData;
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
