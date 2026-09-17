export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      community_submissions: {
        Row: {
          created_at: string
          first_activity: string | null
          focus_areas: string[]
          id: string
          name: string
          owner_id: string
          purpose: string | null
          region: string | null
          rules: string | null
          status: string
          visibility: string | null
        }
        Insert: {
          created_at?: string
          first_activity?: string | null
          focus_areas?: string[]
          id?: string
          name: string
          owner_id: string
          purpose?: string | null
          region?: string | null
          rules?: string | null
          status?: string
          visibility?: string | null
        }
        Update: {
          created_at?: string
          first_activity?: string | null
          focus_areas?: string[]
          id?: string
          name?: string
          owner_id?: string
          purpose?: string | null
          region?: string | null
          rules?: string | null
          status?: string
          visibility?: string | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          activated_at: string
          amount_paise: number
          created_at: string
          currency: string
          is_demo: boolean
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activated_at?: string
          amount_paise?: number
          created_at?: string
          currency?: string
          is_demo?: boolean
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          tier: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activated_at?: string
          amount_paise?: number
          created_at?: string
          currency?: string
          is_demo?: boolean
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          contact_name: string | null
          created_at: string
          description: string | null
          founded_year: string | null
          id: string
          industry: string | null
          location: string | null
          name: string
          org_email: string | null
          org_size: string | null
          org_type: string | null
          owner_id: string
          phone: string | null
          registration_number: string | null
          submitted_at: string | null
          updated_at: string
          verification_method: string | null
          verification_note: string | null
          verification_status: Database["public"]["Enums"]["verification_status"]
          website: string | null
        }
        Insert: {
          contact_name?: string | null
          created_at?: string
          description?: string | null
          founded_year?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          name: string
          org_email?: string | null
          org_size?: string | null
          org_type?: string | null
          owner_id: string
          phone?: string | null
          registration_number?: string | null
          submitted_at?: string | null
          updated_at?: string
          verification_method?: string | null
          verification_note?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          website?: string | null
        }
        Update: {
          contact_name?: string | null
          created_at?: string
          description?: string | null
          founded_year?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          name?: string
          org_email?: string | null
          org_size?: string | null
          org_type?: string | null
          owner_id?: string
          phone?: string | null
          registration_number?: string | null
          submitted_at?: string | null
          updated_at?: string
          verification_method?: string | null
          verification_note?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          current_year: string | null
          degree: string | null
          discipline: string | null
          education_level: string | null
          full_name: string
          graduation_year: string | null
          id: string
          institution: string | null
          interests: string[]
          location_preference: string | null
          mode_preference: string | null
          onboarding_complete: boolean
          opportunity_types: string[]
          phone: string | null
          role: Database["public"]["Enums"]["account_role"]
          skills: string[]
          state: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          current_year?: string | null
          degree?: string | null
          discipline?: string | null
          education_level?: string | null
          full_name?: string
          graduation_year?: string | null
          id: string
          institution?: string | null
          interests?: string[]
          location_preference?: string | null
          mode_preference?: string | null
          onboarding_complete?: boolean
          opportunity_types?: string[]
          phone?: string | null
          role?: Database["public"]["Enums"]["account_role"]
          skills?: string[]
          state?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          current_year?: string | null
          degree?: string | null
          discipline?: string | null
          education_level?: string | null
          full_name?: string
          graduation_year?: string | null
          id?: string
          institution?: string | null
          interests?: string[]
          location_preference?: string | null
          mode_preference?: string | null
          onboarding_complete?: boolean
          opportunity_types?: string[]
          phone?: string | null
          role?: Database["public"]["Enums"]["account_role"]
          skills?: string[]
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_role: "user" | "poster"
      verification_status:
        | "not_started"
        | "in_progress"
        | "under_review"
        | "verified"
        | "needs_correction"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_role: ["user", "poster"],
      verification_status: [
        "not_started",
        "in_progress",
        "under_review",
        "verified",
        "needs_correction",
        "rejected",
      ],
    },
  },
} as const
