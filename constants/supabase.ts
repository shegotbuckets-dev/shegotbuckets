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
                    date: string | null;
                    description: string | null;
                    event_id: string;
                    image: string | null;
                    league_id: string | null;
                    location: string | null;
                    price: string | null;
                    subtitle: string | null;
                    title: string;
                    title_short: string | null;
                };
                Insert: {
                    date?: string | null;
                    description?: string | null;
                    event_id?: string;
                    image?: string | null;
                    league_id?: string | null;
                    location?: string | null;
                    price?: string | null;
                    subtitle?: string | null;
                    title: string;
                    title_short?: string | null;
                };
                Update: {
                    date?: string | null;
                    description?: string | null;
                    event_id?: string;
                    image?: string | null;
                    league_id?: string | null;
                    location?: string | null;
                    price?: string | null;
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
                };
                Insert: {
                    date?: string | null;
                    description?: string | null;
                    image?: string | null;
                    league_id?: string;
                    location?: string | null;
                    name: string;
                };
                Update: {
                    date?: string | null;
                    description?: string | null;
                    image?: string | null;
                    league_id?: string;
                    location?: string | null;
                    name?: string;
                };
                Relationships: [];
            };
            user_events: {
                Row: {
                    event_id: string;
                    joined_at: string | null;
                    user_id: string;
                };
                Insert: {
                    event_id: string;
                    joined_at?: string | null;
                    user_id: string;
                };
                Update: {
                    event_id?: string;
                    joined_at?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "user_events_event_id_fkey";
                        columns: ["event_id"];
                        isOneToOne: false;
                        referencedRelation: "events";
                        referencedColumns: ["event_id"];
                    },
                    {
                        foreignKeyName: "user_events_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["user_id"];
                    },
                ];
            };
            users: {
                Row: {
                    created_at: string | null;
                    email: string;
                    first_name: string | null;
                    last_name: string | null;
                    profile_image_url: string | null;
                    user_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    email: string;
                    first_name?: string | null;
                    last_name?: string | null;
                    profile_image_url?: string | null;
                    user_id: string;
                };
                Update: {
                    created_at?: string | null;
                    email?: string;
                    first_name?: string | null;
                    last_name?: string | null;
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
            [_ in never]: never;
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
