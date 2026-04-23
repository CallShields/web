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
      analysis_results: {
        Row: {
          analysis_result: Json
          call_metadata: Json | null
          created_at: string | null
          error_message: string | null
          id: string
          input_tokens: number | null
          model_used: string | null
          output_tokens: number | null
          processing_time_ms: number | null
          status: string | null
          transcript_text: string
          usage_event_id: string | null
          user_id: string
        }
        Insert: {
          analysis_result: Json
          call_metadata?: Json | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_tokens?: number | null
          model_used?: string | null
          output_tokens?: number | null
          processing_time_ms?: number | null
          status?: string | null
          transcript_text: string
          usage_event_id?: string | null
          user_id: string
        }
        Update: {
          analysis_result?: Json
          call_metadata?: Json | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_tokens?: number | null
          model_used?: string | null
          output_tokens?: number | null
          processing_time_ms?: number | null
          status?: string | null
          transcript_text?: string
          usage_event_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_results_usage_event_id_fkey"
            columns: ["usage_event_id"]
            isOneToOne: false
            referencedRelation: "usage_events"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          rate_limit_tier: string | null
          scopes: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          rate_limit_tier?: string | null
          scopes?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          rate_limit_tier?: string | null
          scopes?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          credit_cap: number
          credits_balance: number
          email: string
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          organization_name: string | null
          plan_tier: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credit_cap?: number
          credits_balance?: number
          email: string
          full_name?: string | null
          id: string
          onboarding_completed?: boolean | null
          organization_name?: string | null
          plan_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credit_cap?: number
          credits_balance?: number
          email?: string
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          organization_name?: string | null
          plan_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number | null
          cancel_at_period_end: boolean | null
          canceled_at: number | null
          created_at: string
          currency: string | null
          current_period_end: number | null
          current_period_start: number | null
          custom_field_data: Json | null
          customer_cancellation_comment: string | null
          customer_cancellation_reason: string | null
          customer_id: string | null
          ended_at: number | null
          ends_at: number | null
          id: string
          interval: string | null
          metadata: Json | null
          price_id: string | null
          started_at: number | null
          status: string | null
          stripe_id: string | null
          stripe_price_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: string
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          custom_field_data?: Json | null
          customer_cancellation_comment?: string | null
          customer_cancellation_reason?: string | null
          customer_id?: string | null
          ended_at?: number | null
          ends_at?: number | null
          id?: string
          interval?: string | null
          metadata?: Json | null
          price_id?: string | null
          started_at?: number | null
          status?: string | null
          stripe_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          cancel_at_period_end?: boolean | null
          canceled_at?: number | null
          created_at?: string
          currency?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          custom_field_data?: Json | null
          customer_cancellation_comment?: string | null
          customer_cancellation_reason?: string | null
          customer_id?: string | null
          ended_at?: number | null
          ends_at?: number | null
          id?: string
          interval?: string | null
          metadata?: Json | null
          price_id?: string | null
          started_at?: number | null
          status?: string | null
          stripe_id?: string | null
          stripe_price_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      transcriptions: {
        Row: {
          audio_duration_seconds: number | null
          audio_file_path: string | null
          completed_at: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          language: string | null
          model_used: string | null
          processing_time_ms: number | null
          status: string | null
          transcription_text: string | null
          usage_event_id: string | null
          user_id: string
        }
        Insert: {
          audio_duration_seconds?: number | null
          audio_file_path?: string | null
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          language?: string | null
          model_used?: string | null
          processing_time_ms?: number | null
          status?: string | null
          transcription_text?: string | null
          usage_event_id?: string | null
          user_id: string
        }
        Update: {
          audio_duration_seconds?: number | null
          audio_file_path?: string | null
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          language?: string | null
          model_used?: string | null
          processing_time_ms?: number | null
          status?: string | null
          transcription_text?: string | null
          usage_event_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcriptions_usage_event_id_fkey"
            columns: ["usage_event_id"]
            isOneToOne: false
            referencedRelation: "usage_events"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_events: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          credits_consumed: number
          error_message: string | null
          event_type: string
          id: string
          input_units: number | null
          metadata: Json | null
          model_name: string | null
          output_units: number | null
          request_id: string | null
          status: string | null
          total_units: number | null
          user_id: string
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          credits_consumed: number
          error_message?: string | null
          event_type: string
          id?: string
          input_units?: number | null
          metadata?: Json | null
          model_name?: string | null
          output_units?: number | null
          request_id?: string | null
          status?: string | null
          total_units?: number | null
          user_id: string
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          credits_consumed?: number
          error_message?: string | null
          event_type?: string
          id?: string
          input_units?: number | null
          metadata?: Json | null
          model_name?: string | null
          output_units?: number | null
          request_id?: string | null
          status?: string | null
          total_units?: number | null
          user_id?: string
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          created_at: string
          data: Json | null
          event_type: string
          id: string
          modified_at: string
          stripe_event_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          event_type: string
          id?: string
          modified_at?: string
          stripe_event_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          event_type?: string
          id?: string
          modified_at?: string
          stripe_event_id?: string | null
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_credits: {
        Args: {
          p_amount: number
          p_description: string
          p_transaction_type: string
          p_user_id: string
        }
        Returns: string
      }
      check_credits: {
        Args: { p_required_credits: number; p_user_id: string }
        Returns: boolean
      }
      deduct_credits: {
        Args: {
          p_amount: number
          p_description: string
          p_reference_id: string
          p_transaction_type: string
          p_user_id: string
        }
        Returns: string
      }
      get_usage_summary: {
        Args: { p_end_date: string; p_start_date: string; p_user_id: string }
        Returns: {
          by_event_type: Json
          total_credits_spent: number
          total_events: number
          total_input_units: number
          total_output_units: number
        }[]
      }
      reserve_credits: {
        Args: { p_amount: number; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
