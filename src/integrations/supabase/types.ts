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
      badges: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      church_settings: {
        Row: {
          annual_goal: number
          best_group_id: string | null
          best_group_name: string | null
          best_group_percentage: number | null
          created_at: string
          id: string
          updated_at: string
          updated_by: string | null
          year: number
        }
        Insert: {
          annual_goal?: number
          best_group_id?: string | null
          best_group_name?: string | null
          best_group_percentage?: number | null
          created_at?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
          year: number
        }
        Update: {
          annual_goal?: number
          best_group_id?: string | null
          best_group_name?: string | null
          best_group_percentage?: number | null
          created_at?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "church_settings_best_group_id_fkey"
            columns: ["best_group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      churches: {
        Row: {
          conference: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          conference?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          conference?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      contributions: {
        Row: {
          amount: number
          clickpesa_order_reference: string | null
          created_at: string
          currency: string | null
          id: string
          method: string | null
          payment_link: string | null
          payment_method_used: string | null
          payment_provider: string | null
          project_id: string | null
          reference: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          clickpesa_order_reference?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          method?: string | null
          payment_link?: string | null
          payment_method_used?: string | null
          payment_provider?: string | null
          project_id?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          clickpesa_order_reference?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          method?: string | null
          payment_link?: string | null
          payment_method_used?: string | null
          payment_provider?: string | null
          project_id?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contributions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          description: string | null
          id: string
          leader_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          leader_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          leader_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          otp: string
          phone: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          otp: string
          phone: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          otp?: string
          phone?: string
          verified?: boolean
        }
        Relationships: []
      }
      pledges: {
        Row: {
          created_at: string
          id: string
          pledge_amount: number
          updated_at: string
          user_id: string | null
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          pledge_amount: number
          updated_at?: string
          user_id?: string | null
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          pledge_amount?: number
          updated_at?: string
          user_id?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "pledges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          access_token: string | null
          annual_goal: number | null
          church_id: string | null
          created_at: string
          full_name: string
          group_id: string | null
          id: string
          is_active: boolean
          level: string | null
          phone: string
          role: string
          token_expires_at: string | null
          total_contributed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          annual_goal?: number | null
          church_id?: string | null
          created_at?: string
          full_name?: string
          group_id?: string | null
          id?: string
          is_active?: boolean
          level?: string | null
          phone: string
          role?: string
          token_expires_at?: string | null
          total_contributed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          annual_goal?: number | null
          church_id?: string | null
          created_at?: string
          full_name?: string
          group_id?: string | null
          id?: string
          is_active?: boolean
          level?: string | null
          phone?: string
          role?: string
          token_expires_at?: string | null
          total_contributed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          collected_amount: number
          created_at: string
          description: string | null
          id: string
          name: string
          owner_id: string | null
          status: string | null
          target_amount: number
          updated_at: string
        }
        Insert: {
          collected_amount?: number
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner_id?: string | null
          status?: string | null
          target_amount: number
          updated_at?: string
        }
        Update: {
          collected_amount?: number
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          status?: string | null
          target_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rbac_audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          id: string
          target_profile_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target_profile_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target_profile_id?: string | null
        }
        Relationships: []
      }
      rbac_permissions: {
        Row: {
          description: string
          key: string
          module: string
        }
        Insert: {
          description?: string
          key: string
          module: string
        }
        Update: {
          description?: string
          key?: string
          module?: string
        }
        Relationships: []
      }
      rbac_role_permissions: {
        Row: {
          permission_key: string
          role_key: string
        }
        Insert: {
          permission_key: string
          role_key: string
        }
        Update: {
          permission_key?: string
          role_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "rbac_role_permissions_permission_key_fkey"
            columns: ["permission_key"]
            isOneToOne: false
            referencedRelation: "rbac_permissions"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "rbac_role_permissions_role_key_fkey"
            columns: ["role_key"]
            isOneToOne: false
            referencedRelation: "rbac_roles"
            referencedColumns: ["key"]
          },
        ]
      }
      rbac_roles: {
        Row: {
          description: string
          is_active: boolean
          is_protected: boolean
          key: string
          name: string
          sort_order: number
        }
        Insert: {
          description?: string
          is_active?: boolean
          is_protected?: boolean
          key: string
          name: string
          sort_order?: number
        }
        Update: {
          description?: string
          is_active?: boolean
          is_protected?: boolean
          key?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      rbac_user_roles: {
        Row: {
          assigned_by: string | null
          church_id: string | null
          created_at: string
          id: string
          is_active: boolean
          profile_id: string
          role_key: string
        }
        Insert: {
          assigned_by?: string | null
          church_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          profile_id: string
          role_key: string
        }
        Update: {
          assigned_by?: string | null
          church_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          profile_id?: string
          role_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "rbac_user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rbac_user_roles_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rbac_user_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rbac_user_roles_role_key_fkey"
            columns: ["role_key"]
            isOneToOne: false
            referencedRelation: "rbac_roles"
            referencedColumns: ["key"]
          },
        ]
      }
      treasury_accounts: {
        Row: {
          account_type: string
          church_id: string
          created_at: string
          created_by: string | null
          id: string
          is_restricted: boolean
          name: string
        }
        Insert: {
          account_type?: string
          church_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_restricted?: boolean
          name: string
        }
        Update: {
          account_type?: string
          church_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_restricted?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "treasury_accounts_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_audit_flags: {
        Row: {
          church_id: string
          created_at: string
          entity_id: string
          entity_type: string
          flagged_by: string | null
          id: string
          note: string
          resolved_by: string | null
          status: string
        }
        Insert: {
          church_id: string
          created_at?: string
          entity_id: string
          entity_type: string
          flagged_by?: string | null
          id?: string
          note: string
          resolved_by?: string | null
          status?: string
        }
        Update: {
          church_id?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          flagged_by?: string | null
          id?: string
          note?: string
          resolved_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "treasury_audit_flags_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_expenses: {
        Row: {
          account_id: string | null
          amount: number
          approved_at: string | null
          approved_by: string | null
          category: string
          church_id: string
          created_at: string
          created_by: string | null
          description: string | null
          expense_date: string
          id: string
          receipt_url: string | null
          status: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          church_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          receipt_url?: string | null
          status?: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          church_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          receipt_url?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "treasury_expenses_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "treasury_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treasury_expenses_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_remittances: {
        Row: {
          amount: number
          approved_by: string | null
          church_id: string
          created_at: string
          created_by: string | null
          id: string
          period: string
          recipient: string
          status: string
        }
        Insert: {
          amount: number
          approved_by?: string | null
          church_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          period: string
          recipient?: string
          status?: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          church_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          period?: string
          recipient?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "treasury_remittances_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_transactions: {
        Row: {
          account_id: string | null
          amount: number
          category: string
          church_id: string
          contribution_id: string | null
          created_at: string
          description: string | null
          id: string
          receipt_url: string | null
          recorded_by: string | null
          source: string
          status: string
          txn_date: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          category?: string
          church_id: string
          contribution_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          receipt_url?: string | null
          recorded_by?: string | null
          source?: string
          status?: string
          txn_date?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string
          church_id?: string
          contribution_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          receipt_url?: string | null
          recorded_by?: string | null
          source?: string
          status?: string
          txn_date?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treasury_transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "treasury_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treasury_transactions_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treasury_transactions_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: true
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string | null
          earned_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          earned_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          earned_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credentials: {
        Row: {
          created_at: string
          password_hash: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          password_hash: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          password_hash?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_by: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      broadcast_weekly_sabbath_notification: { Args: never; Returns: undefined }
      get_public_dashboard: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      reset_notifications_monthly: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "finance_admin"
        | "group_leader"
        | "member"
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
      app_role: [
        "super_admin",
        "admin",
        "finance_admin",
        "group_leader",
        "member",
      ],
    },
  },
} as const
