/** Supabase Database type definitions */

export type UserRole = "customer" | "admin";
export type VehicleType = "car" | "motorcycle";
export type TransmissionType = "manual" | "automatic";
export type BookingStatus =
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";
export type PaymentStatus =
  | "pending"
  | "settlement"
  | "expire"
  | "cancel"
  | "deny"
  | "refund";
export type ChatRole = "user" | "assistant";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          name: string;
          type: VehicleType;
          brand: string;
          model: string;
          year: number;
          price_per_day: number;
          description: string | null;
          image_url: string | null;
          images: string[];
          is_available: boolean;
          features: string[];
          transmission: TransmissionType;
          seats: number | null;
          engine_cc: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: VehicleType;
          brand: string;
          model: string;
          year: number;
          price_per_day: number;
          description?: string | null;
          image_url?: string | null;
          images?: string[];
          is_available?: boolean;
          features?: string[];
          transmission: TransmissionType;
          seats?: number | null;
          engine_cc?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: VehicleType;
          brand?: string;
          model?: string;
          year?: number;
          price_per_day?: number;
          description?: string | null;
          image_url?: string | null;
          images?: string[];
          is_available?: boolean;
          features?: string[];
          transmission?: TransmissionType;
          seats?: number | null;
          engine_cc?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          order_id: string;
          user_id: string | null;
          guest_name: string | null;
          guest_phone: string | null;
          guest_email: string | null;
          vehicle_id: string;
          start_date: string;
          end_date: string;
          total_days: number;
          total_price: number;
          discount_amount: number;
          final_price: number;
          status: BookingStatus;
          pickup_location: string | null;
          delivery_location: string | null;
          notes: string | null;
          promo_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          user_id?: string | null;
          guest_name?: string | null;
          guest_phone?: string | null;
          guest_email?: string | null;
          vehicle_id: string;
          start_date: string;
          end_date: string;
          total_days: number;
          total_price: number;
          discount_amount?: number;
          final_price: number;
          status?: BookingStatus;
          pickup_location?: string | null;
          delivery_location?: string | null;
          notes?: string | null;
          promo_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          user_id?: string | null;
          guest_name?: string | null;
          guest_phone?: string | null;
          guest_email?: string | null;
          vehicle_id?: string;
          start_date?: string;
          end_date?: string;
          total_days?: number;
          total_price?: number;
          discount_amount?: number;
          final_price?: number;
          status?: BookingStatus;
          pickup_location?: string | null;
          delivery_location?: string | null;
          notes?: string | null;
          promo_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          midtrans_transaction_id: string | null;
          midtrans_order_id: string | null;
          payment_type: string | null;
          amount: number;
          status: PaymentStatus;
          snap_token: string | null;
          raw_response: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          midtrans_transaction_id?: string | null;
          midtrans_order_id?: string | null;
          payment_type?: string | null;
          amount: number;
          status?: PaymentStatus;
          snap_token?: string | null;
          raw_response?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          midtrans_transaction_id?: string | null;
          midtrans_order_id?: string | null;
          payment_type?: string | null;
          amount?: number;
          status?: PaymentStatus;
          snap_token?: string | null;
          raw_response?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      promos: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_amount: number;
          min_booking_days: number;
          usage_limit: number | null;
          used_count: number;
          is_first_order_only: boolean;
          is_active: boolean;
          valid_from: string | null;
          valid_until: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          description?: string | null;
          discount_amount: number;
          min_booking_days?: number;
          usage_limit?: number | null;
          used_count?: number;
          is_first_order_only?: boolean;
          is_active?: boolean;
          valid_from?: string | null;
          valid_until?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          description?: string | null;
          discount_amount?: number;
          min_booking_days?: number;
          usage_limit?: number | null;
          used_count?: number;
          is_first_order_only?: boolean;
          is_active?: boolean;
          valid_from?: string | null;
          valid_until?: string | null;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          role: ChatRole;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: ChatRole;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          role?: ChatRole;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
}

/** Convenience type aliases */
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type Promo = Database["public"]["Tables"]["promos"]["Row"];
export type ChatMessage = Database["public"]["Tables"]["chat_messages"]["Row"];
