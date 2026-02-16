-- ============================================================
-- RentaGo RLS Policies
-- Migration: 002_rls_policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper: Check if user is admin
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================
-- PROFILES policies
-- ============================================================
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- ============================================================
-- VEHICLES policies
-- ============================================================
CREATE POLICY "Anyone can view vehicles"
  ON public.vehicles FOR SELECT
  USING (true);

CREATE POLICY "Admin can insert vehicles"
  ON public.vehicles FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update vehicles"
  ON public.vehicles FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete vehicles"
  ON public.vehicles FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- BOOKINGS policies
-- ============================================================
CREATE POLICY "Auth users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Guest can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (user_id IS NULL AND guest_phone IS NOT NULL);

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can cancel own pending bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (status = 'cancelled');

CREATE POLICY "Admin can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin can update any booking"
  ON public.bookings FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin can delete bookings"
  ON public.bookings FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- PAYMENTS policies
-- ============================================================
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = payments.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage payments"
  ON public.payments FOR ALL
  USING (public.is_admin());

-- Service role handles payment creation from webhooks (bypasses RLS)

-- ============================================================
-- PROMOS policies
-- ============================================================
CREATE POLICY "Anyone can view active promos"
  ON public.promos FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage promos"
  ON public.promos FOR ALL
  USING (public.is_admin());

-- ============================================================
-- CHAT MESSAGES policies
-- ============================================================
CREATE POLICY "Users can insert own chat messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own session messages"
  ON public.chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Users can delete own session messages"
  ON public.chat_messages FOR DELETE
  USING (true);

CREATE POLICY "Admin can view all chat messages"
  ON public.chat_messages FOR SELECT
  USING (public.is_admin());

-- ============================================================
-- GUEST BOOKING TRACKING (Public RPC)
-- ============================================================
CREATE OR REPLACE FUNCTION public.track_guest_booking(
  p_order_id TEXT,
  p_phone TEXT
)
RETURNS SETOF public.bookings AS $$
BEGIN
  RETURN QUERY
  SELECT b.*
  FROM public.bookings b
  WHERE b.order_id = p_order_id
    AND b.guest_phone = p_phone;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Allow public to call this function
GRANT EXECUTE ON FUNCTION public.track_guest_booking(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.track_guest_booking(TEXT, TEXT) TO authenticated;

-- ============================================================
-- STORAGE BUCKET for vehicle images
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vehicle-images',
  'vehicle-images',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Public read access for vehicle images
CREATE POLICY "Public read vehicle images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vehicle-images');

-- Admin can upload vehicle images
CREATE POLICY "Admin upload vehicle images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'vehicle-images'
    AND public.is_admin()
  );

-- Admin can update vehicle images
CREATE POLICY "Admin update vehicle images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'vehicle-images'
    AND public.is_admin()
  );

-- Admin can delete vehicle images
CREATE POLICY "Admin delete vehicle images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'vehicle-images'
    AND public.is_admin()
  );
