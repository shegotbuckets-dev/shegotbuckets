export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "12.2.3 (519615d)";
    };
    public: {
        Tables: {
            event_payments: {
                Row: {
                    amount: number | null;
                    created_at: string;
                    currency: string | null;
                    event_id: string | null;
                    metadata: Json | null;
                    payment_id: string;
                    registration_id: string | null;
                    team_id: string | null;
                    updated_at: string;
                    user_email: string | null;
                };
                Insert: {
                    amount?: number | null;
                    created_at?: string;
                    currency?: string | null;
                    event_id?: string | null;
                    metadata?: Json | null;
                    payment_id: string;
                    registration_id?: string | null;
                    team_id?: string | null;
                    updated_at?: string;
                    user_email?: string | null;
                };
                Update: {
                    amount?: number | null;
                    created_at?: string;
                    currency?: string | null;
                    event_id?: string | null;
                    metadata?: Json | null;
                    payment_id?: string;
                    registration_id?: string | null;
                    team_id?: string | null;
                    updated_at?: string;
                    user_email?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "event_payments_registration_id_fkey";
                        columns: ["registration_id"];
                        isOneToOne: false;
                        referencedRelation: "event_registrations";
                        referencedColumns: ["registration_id"];
                    },
                ];
            };
            event_players: {
                Row: {
                    first_name: string | null;
                    jersey_number: number | null;
                    last_name: string | null;
                    player_id: string;
                    registration_id: string | null;
                    updated_at: string | null;
                    user_email: string | null;
                    user_id: string | null;
                    waiver_signed: boolean | null;
                };
                Insert: {
                    first_name?: string | null;
                    jersey_number?: number | null;
                    last_name?: string | null;
                    player_id?: string;
                    registration_id?: string | null;
                    updated_at?: string | null;
                    user_email?: string | null;
                    user_id?: string | null;
                    waiver_signed?: boolean | null;
                };
                Update: {
                    first_name?: string | null;
                    jersey_number?: number | null;
                    last_name?: string | null;
                    player_id?: string;
                    registration_id?: string | null;
                    updated_at?: string | null;
                    user_email?: string | null;
                    user_id?: string | null;
                    waiver_signed?: boolean | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "event_players_registration_id_fkey";
                        columns: ["registration_id"];
                        isOneToOne: false;
                        referencedRelation: "event_registrations";
                        referencedColumns: ["registration_id"];
                    },
                    {
                        foreignKeyName: "event_players_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["user_id"];
                    },
                ];
            };
            event_registrations: {
                Row: {
                    created_at: string;
                    edited_count: number | null;
                    event_id: string | null;
                    paid: boolean;
                    registration_id: string;
                    team_id: string | null;
                };
                Insert: {
                    created_at?: string;
                    edited_count?: number | null;
                    event_id?: string | null;
                    paid?: boolean;
                    registration_id?: string;
                    team_id?: string | null;
                };
                Update: {
                    created_at?: string;
                    edited_count?: number | null;
                    event_id?: string | null;
                    paid?: boolean;
                    registration_id?: string;
                    team_id?: string | null;
                };
                Relationships: [];
            };
            events: {
                Row: {
                    active: boolean;
                    allow_multi_team: boolean | null;
                    date: string | null;
                    description: string | null;
                    display_date: string | null;
                    display_event_section_title_full: string | null;
                    display_location_full: string | null;
                    display_registration_status: string | null;
                    display_title_full: string | null;
                    event_external_url: string | null;
                    event_id: string;
                    image: string;
                    league_id: string | null;
                    location: string | null;
                    price: string | null;
                    reg_ddl: string;
                    stripe_price_ids: Json | null;
                    subtitle: string | null;
                    title: string;
                    title_short: string | null;
                };
                Insert: {
                    active: boolean;
                    allow_multi_team?: boolean | null;
                    date?: string | null;
                    description?: string | null;
                    display_date?: string | null;
                    display_event_section_title_full?: string | null;
                    display_location_full?: string | null;
                    display_registration_status?: string | null;
                    display_title_full?: string | null;
                    event_external_url?: string | null;
                    event_id?: string;
                    image: string;
                    league_id?: string | null;
                    location?: string | null;
                    price?: string | null;
                    reg_ddl: string;
                    stripe_price_ids?: Json | null;
                    subtitle?: string | null;
                    title: string;
                    title_short?: string | null;
                };
                Update: {
                    active?: boolean;
                    allow_multi_team?: boolean | null;
                    date?: string | null;
                    description?: string | null;
                    display_date?: string | null;
                    display_event_section_title_full?: string | null;
                    display_location_full?: string | null;
                    display_registration_status?: string | null;
                    display_title_full?: string | null;
                    event_external_url?: string | null;
                    event_id?: string;
                    image?: string;
                    league_id?: string | null;
                    location?: string | null;
                    price?: string | null;
                    reg_ddl?: string;
                    stripe_price_ids?: Json | null;
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
                    description: string | null;
                    image: string | null;
                    league_id: string;
                    league_type:
                        | Database["public"]["Enums"]["league_type"]
                        | null;
                    name: string;
                    show: boolean;
                };
                Insert: {
                    description?: string | null;
                    image?: string | null;
                    league_id?: string;
                    league_type?:
                        | Database["public"]["Enums"]["league_type"]
                        | null;
                    name: string;
                    show?: boolean;
                };
                Update: {
                    description?: string | null;
                    image?: string | null;
                    league_id?: string;
                    league_type?:
                        | Database["public"]["Enums"]["league_type"]
                        | null;
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
            teams: {
                Row: {
                    created_at: string | null;
                    league_id: string | null;
                    name: string;
                    team_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    league_id?: string | null;
                    name: string;
                    team_id?: string;
                };
                Update: {
                    created_at?: string | null;
                    league_id?: string | null;
                    name?: string;
                    team_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "teams_league_id_fkey";
                        columns: ["league_id"];
                        isOneToOne: false;
                        referencedRelation: "leagues";
                        referencedColumns: ["league_id"];
                    },
                ];
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
            execute_sql: { Args: { sql: string }; Returns: undefined };
            get_registration_by_short_id: {
                Args: { short_id: string };
                Returns: {
                    event_id: string;
                    registration_id: string;
                    team_id: string;
                }[];
            };
            get_user_dashboard_data: {
                Args: { p_user_email: string; p_user_id: string };
                Returns: Json;
            };
            join_team_with_registration_id:
                | {
                      Args: {
                          p_event_id: string;
                          p_first_name: string;
                          p_jersey_number: number;
                          p_last_name: string;
                          p_registration_id: string;
                          p_user_email: string;
                      };
                      Returns: Json;
                  }
                | {
                      Args: {
                          p_event_id: string;
                          p_first_name: string;
                          p_jersey_number: number;
                          p_last_name: string;
                          p_registration_id: string;
                          p_user_email: string;
                          p_user_id?: string;
                      };
                      Returns: Json;
                  };
            on_after_payment_succeed: {
                Args: {
                    p_amount: number;
                    p_currency: string;
                    p_event_id: string;
                    p_metadata: Json;
                    p_payment_id: string;
                    p_registration_id: string;
                    p_team_id: string;
                    p_user_email: string;
                };
                Returns: undefined;
            };
            register_event_and_update_event_players_table: {
                Args: { event_id: string; players: Json; team_id: string };
                Returns: undefined;
            };
            register_team_for_event:
                | {
                      Args: {
                          p_event_id: string;
                          p_first_name: string;
                          p_last_name: string;
                          p_team_id: string;
                          p_user_email: string;
                      };
                      Returns: Json;
                  }
                | {
                      Args: {
                          p_event_id: string;
                          p_first_name: string;
                          p_last_name: string;
                          p_team_id: string;
                          p_user_email: string;
                          p_user_id?: string;
                      };
                      Returns: Json;
                  };
            register_team_on_payment: {
                Args: {
                    p_amount: number;
                    p_currency: string;
                    p_event_id: string;
                    p_first_name: string;
                    p_last_name: string;
                    p_metadata: Json;
                    p_payment_id: string;
                    p_team_id: string;
                    p_user_email: string;
                };
                Returns: Json;
            };
        };
        Enums: {
            league_type: "COLLEGE" | "FREETEAM";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
    keyof Database,
    "public"
>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema["Enums"]
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    public: {
        Enums: {
            league_type: ["COLLEGE", "FREETEAM"],
        },
    },
} as const;
