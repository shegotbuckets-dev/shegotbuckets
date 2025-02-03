export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            events: {
                Row: {
                    active: boolean;
                    date: string | null;
                    description: string | null;
                    event_id: string;
                    image: string;
                    league_id: string | null;
                    location: string | null;
                    price: string | null;
                    reg_ddl: string;
                    subtitle: string | null;
                    title: string;
                    title_short: string | null;
                };
                Insert: {
                    active: boolean;
                    date?: string | null;
                    description?: string | null;
                    event_id?: string;
                    image: string;
                    league_id?: string | null;
                    location?: string | null;
                    price?: string | null;
                    reg_ddl: string;
                    subtitle?: string | null;
                    title: string;
                    title_short?: string | null;
                };
                Update: {
                    active?: boolean;
                    date?: string | null;
                    description?: string | null;
                    event_id?: string;
                    image?: string;
                    league_id?: string | null;
                    location?: string | null;
                    price?: string | null;
                    reg_ddl?: string;
                    subtitle?: string | null;
                    title?: string;
                    title_short?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "events_league_id_fkey";
                        columns: ["league_id"];
                        isOneToOne: false;
                        referencedRelation: "leagues";
                        referencedColumns: ["league_id"];
                    },
                ];
            };
            leagues: {
                Row: {
                    date: string | null;
                    description: string | null;
                    image: string | null;
                    league_id: string;
                    location: string | null;
                    name: string;
                    show: boolean;
                };
                Insert: {
                    date?: string | null;
                    description?: string | null;
                    image?: string | null;
                    league_id?: string;
                    location?: string | null;
                    name: string;
                    show?: boolean;
                };
                Update: {
                    date?: string | null;
                    description?: string | null;
                    image?: string | null;
                    league_id?: string;
                    location?: string | null;
                    name?: string;
                    show?: boolean;
                };
                Relationships: [];
            };
            members: {
                Row: {
                    committee: string | null;
                    description: string | null;
                    image_url: string | null;
                    member_id: string;
                    name: string | null;
                    title: string | null;
                };
                Insert: {
                    committee?: string | null;
                    description?: string | null;
                    image_url?: string | null;
                    member_id?: string;
                    name?: string | null;
                    title?: string | null;
                };
                Update: {
                    committee?: string | null;
                    description?: string | null;
                    image_url?: string | null;
                    member_id?: string;
                    name?: string | null;
                    title?: string | null;
                };
                Relationships: [];
            };
            registration_players: {
                Row: {
                    first_name: string;
                    id: string;
                    jersey_number: number;
                    last_name: string;
                    registration_id: string;
                    user_email: string;
                    waiver_signed: boolean;
                };
                Insert: {
                    first_name: string;
                    id?: string;
                    jersey_number: number;
                    last_name: string;
                    registration_id: string;
                    user_email: string;
                    waiver_signed?: boolean;
                };
                Update: {
                    first_name?: string;
                    id?: string;
                    jersey_number?: number;
                    last_name?: string;
                    registration_id?: string;
                    user_email?: string;
                    waiver_signed?: boolean;
                };
                Relationships: [
                    {
                        foreignKeyName: "registration_players_registration_id_fkey";
                        columns: ["registration_id"];
                        isOneToOne: false;
                        referencedRelation: "registrations";
                        referencedColumns: ["registration_id"];
                    },
                ];
            };
            registrations: {
                Row: {
                    created_at: string;
                    event_id: string;
                    registration_id: string;
                    team_id: string;
                };
                Insert: {
                    created_at?: string;
                    event_id: string;
                    registration_id?: string;
                    team_id: string;
                };
                Update: {
                    created_at?: string;
                    event_id?: string;
                    registration_id?: string;
                    team_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "registrations_event_id_fkey";
                        columns: ["event_id"];
                        isOneToOne: false;
                        referencedRelation: "events";
                        referencedColumns: ["event_id"];
                    },
                    {
                        foreignKeyName: "registrations_team_id_fkey";
                        columns: ["team_id"];
                        isOneToOne: false;
                        referencedRelation: "teams";
                        referencedColumns: ["team_id"];
                    },
                ];
            };
            teams: {
                Row: {
                    created_at: string | null;
                    name: string;
                    team_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    name: string;
                    team_id?: string;
                };
                Update: {
                    created_at?: string | null;
                    name?: string;
                    team_id?: string;
                };
                Relationships: [];
            };
            users: {
                Row: {
                    address: string | null;
                    created_at: string;
                    data_collected: boolean;
                    date_of_birth: string | null;
                    email: string;
                    first_name: string | null;
                    headshot_url: string | null;
                    instagram_account: string | null;
                    last_name: string | null;
                    legal_first_name: string | null;
                    legal_last_name: string | null;
                    phone_number: string | null;
                    player_introduction: string | null;
                    preferred_first_name: string | null;
                    profile_image_url: string | null;
                    user_id: string;
                };
                Insert: {
                    address?: string | null;
                    created_at?: string;
                    data_collected?: boolean;
                    date_of_birth?: string | null;
                    email: string;
                    first_name?: string | null;
                    headshot_url?: string | null;
                    instagram_account?: string | null;
                    last_name?: string | null;
                    legal_first_name?: string | null;
                    legal_last_name?: string | null;
                    phone_number?: string | null;
                    player_introduction?: string | null;
                    preferred_first_name?: string | null;
                    profile_image_url?: string | null;
                    user_id: string;
                };
                Update: {
                    address?: string | null;
                    created_at?: string;
                    data_collected?: boolean;
                    date_of_birth?: string | null;
                    email?: string;
                    first_name?: string | null;
                    headshot_url?: string | null;
                    instagram_account?: string | null;
                    last_name?: string | null;
                    legal_first_name?: string | null;
                    legal_last_name?: string | null;
                    phone_number?: string | null;
                    player_introduction?: string | null;
                    preferred_first_name?: string | null;
                    profile_image_url?: string | null;
                    user_id?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            execute_sql: {
                Args: {
                    sql: string;
                };
                Returns: undefined;
            };
            register_event_with_transaction: {
                Args: {
                    event_id: string;
                    team_id: string;
                    players: Json;
                };
                Returns: undefined;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
      ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
      ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;
