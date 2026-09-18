-- ==============================================================================
-- Migration: 20260918_p0_core_schema.sql
-- Description: FINAL Production Schema for AstroFindings Astrology Engine
--              Includes:
--                1. Extensions (uuid-ossp, pgcrypto)
--                2. Enums (subscription_status_enum, house_system_enum)
--                3. Public Tables (profiles, natal_charts, subscriptions,
--                   payment_invoices, daily_horoscopes, user_devices,
--                   ai_readings)
--                4. Performance Indexes
--                5. Granular Row Level Security (RLS) Policies
--                6. Automated Timestamp Triggers
--                7. Auth Signup Hook (auth.users -> public.profiles & subscriptions)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. ENUMS (Safe Idempotent Creation)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status_enum') THEN
    CREATE TYPE subscription_status_enum AS ENUM (
      'free',
      'active',
      'trialing',
      'past_due',
      'cancelled',
      'expired'
    );
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'house_system_enum') THEN
    CREATE TYPE house_system_enum AS ENUM (
      'placidus',
      'whole_sign',
      'koch',
      'equal',
      'campanus',
      'regiomontanus'
    );
  END IF;
END
$$;

-- ------------------------------------------------------------------------------
-- 3. USER PROFILES (Synced with auth.users & birth coordinates)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  birth_date DATE,
  birth_time TIME,
  is_birth_time_approximate BOOLEAN NOT NULL DEFAULT FALSE,
  birth_place_name TEXT,
  birth_latitude NUMERIC(9,6),
  birth_longitude NUMERIC(9,6),
  birth_timezone TEXT,
  historical_utc_offset_minutes INT,
  sun_sign TEXT,
  moon_sign TEXT,
  rising_sign TEXT,
  interests JSONB DEFAULT '[]'::jsonb,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. BIRTH DATA & CALCULATED NATAL CHARTS (Single Source of Truth)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.natal_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'Primary Chart',
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  is_time_approximate BOOLEAN NOT NULL DEFAULT FALSE,
  is_approximate BOOLEAN NOT NULL DEFAULT FALSE,
  birth_location TEXT NOT NULL,
  latitude NUMERIC(9,6) NOT NULL,
  longitude NUMERIC(9,6) NOT NULL,
  timezone TEXT NOT NULL,
  utc_offset_minutes INT NOT NULL DEFAULT 0,
  house_system TEXT NOT NULL DEFAULT 'placidus',

  -- Single source of truth ephemeris JSON
  chart_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  chart_json JSONB DEFAULT '{}'::jsonb,

  sun_sign TEXT,
  moon_sign TEXT,
  rising_sign TEXT,
  ascendant_sign TEXT,
  ascendant_degree NUMERIC(5,2),
  midheaven_sign TEXT,
  midheaven_degree NUMERIC(5,2),
  placements JSONB DEFAULT '[]'::jsonb,
  houses JSONB DEFAULT '[]'::jsonb,
  aspects JSONB DEFAULT '[]'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_primary_chart UNIQUE (user_id)
);

-- ------------------------------------------------------------------------------
-- 5. DODO PAYMENTS & SUBSCRIPTIONS (Provider Ledger & Entitlements)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Dual naming support for provider ('dodo' / 'dodo_payments')
  provider TEXT NOT NULL DEFAULT 'dodo',
  payment_provider TEXT NOT NULL DEFAULT 'dodo_payments',
  provider_customer_id TEXT DEFAULT 'dodo_cust_pending',
  provider_subscription_id TEXT,
  provider_product_id TEXT DEFAULT 'free_tier',

  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('free', 'active', 'trialing', 'past_due', 'cancelled', 'expired')),
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,

  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_subscription UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS public.payment_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  payment_id TEXT UNIQUE NOT NULL,
  provider_payment_id TEXT,
  payment_provider TEXT NOT NULL DEFAULT 'dodo_payments',
  amount_cents INT NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'succeeded', -- 'succeeded', 'failed', 'refunded'
  receipt_url TEXT,
  raw_event_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. DAILY HOROSCOPE CACHE (Personalized Transits Cached per User Timezone)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.daily_horoscopes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_date DATE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  headline TEXT NOT NULL,
  reading_text TEXT NOT NULL,
  reading TEXT,
  summary TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  transits_analyzed JSONB NOT NULL DEFAULT '{}'::jsonb,
  transits_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_daily_reading UNIQUE (user_id, target_date)
);

-- ------------------------------------------------------------------------------
-- 7. PUSH NOTIFICATION USER DEVICES (FCM & WebPush)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  device_token TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT 'web',
  platform TEXT NOT NULL DEFAULT 'web', -- 'web', 'ios', 'android'
  timezone TEXT NOT NULL DEFAULT 'UTC',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_notified_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_device_token UNIQUE (device_token)
);

-- ------------------------------------------------------------------------------
-- 8. AI READINGS & PERSONALIZED INTERPRETATIONS (NO HUMAN CONSULTATIONS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general', -- 'love', 'career', 'emotions', 'timing', 'decisions', 'general'
  reading_type TEXT NOT NULL DEFAULT 'free' CHECK (reading_type IN ('free', 'deep')), -- 'free' (free insight) | 'deep' (paid deep reading)
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  relevant_placements JSONB NOT NULL DEFAULT '[]'::jsonb,
  relevant_transits JSONB NOT NULL DEFAULT '[]'::jsonb,
  mind_reading_disclaimer TEXT,
  chart_snapshot JSONB,
  engine_used TEXT DEFAULT 'AstroFindings AI Astrologer Engine',
  is_api_generated BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_natal_charts_user_id ON public.natal_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status_tier ON public.subscriptions(status, tier);
CREATE INDEX IF NOT EXISTS idx_payment_invoices_user_id ON public.payment_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_invoices_payment_id ON public.payment_invoices(payment_id);
CREATE INDEX IF NOT EXISTS idx_daily_horoscopes_user_target_date ON public.daily_horoscopes(user_id, target_date);
CREATE INDEX IF NOT EXISTS idx_daily_horoscopes_user_date ON public.daily_horoscopes(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_devices_user_id ON public.user_devices(user_id);
CREATE INDEX IF NOT EXISTS idx_user_devices_active_tz ON public.user_devices(is_active, timezone);
CREATE INDEX IF NOT EXISTS idx_ai_readings_user_created ON public.ai_readings(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_readings_user_type ON public.ai_readings(user_id, reading_type);

-- ------------------------------------------------------------------------------
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.natal_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readings ENABLE ROW LEVEL SECURITY;

-- 10.1 PROFILES POLICIES
-- Note: INSERT is mandatory alongside UPDATE so that PostgREST upsert succeeds.
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- 10.2 NATAL CHARTS POLICIES
DROP POLICY IF EXISTS "Users can view own chart" ON public.natal_charts;
CREATE POLICY "Users can view own chart"
  ON public.natal_charts FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own chart" ON public.natal_charts;
CREATE POLICY "Users can insert own chart"
  ON public.natal_charts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own chart" ON public.natal_charts;
CREATE POLICY "Users can update own chart"
  ON public.natal_charts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own chart" ON public.natal_charts;
CREATE POLICY "Users can delete own chart"
  ON public.natal_charts FOR DELETE
  USING (auth.uid() = user_id);

-- 10.3 SUBSCRIPTIONS POLICIES
-- Read-only for users. Privileged webhooks & admin server actions write via service_role.
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- 10.4 PAYMENT INVOICES POLICIES
-- Read-only for users. Webhooks write via service_role.
DROP POLICY IF EXISTS "Users can view own invoices" ON public.payment_invoices;
CREATE POLICY "Users can view own invoices"
  ON public.payment_invoices FOR SELECT
  USING (auth.uid() = user_id);

-- 10.5 DAILY HOROSCOPES POLICIES
-- Allows reading and idempotent caching from the client / authenticated user session.
DROP POLICY IF EXISTS "Users can view own horoscopes" ON public.daily_horoscopes;
CREATE POLICY "Users can view own horoscopes"
  ON public.daily_horoscopes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own horoscopes" ON public.daily_horoscopes;
CREATE POLICY "Users can insert own horoscopes"
  ON public.daily_horoscopes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own horoscopes" ON public.daily_horoscopes;
CREATE POLICY "Users can update own horoscopes"
  ON public.daily_horoscopes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 10.6 USER DEVICES POLICIES
DROP POLICY IF EXISTS "Users can view own devices" ON public.user_devices;
CREATE POLICY "Users can view own devices"
  ON public.user_devices FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own devices" ON public.user_devices;
CREATE POLICY "Users can insert own devices"
  ON public.user_devices FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own devices" ON public.user_devices;
CREATE POLICY "Users can update own devices"
  ON public.user_devices FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own devices" ON public.user_devices;
CREATE POLICY "Users can delete own devices"
  ON public.user_devices FOR DELETE
  USING (auth.uid() = user_id);

-- 10.7 AI READINGS POLICIES (Users own their personalized reading history)
DROP POLICY IF EXISTS "Users can view own ai readings" ON public.ai_readings;
CREATE POLICY "Users can view own ai readings"
  ON public.ai_readings FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai readings" ON public.ai_readings;
CREATE POLICY "Users can insert own ai readings"
  ON public.ai_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own ai readings" ON public.ai_readings;
CREATE POLICY "Users can delete own ai readings"
  ON public.ai_readings FOR DELETE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 11. AUTOMATIC TIMESTAMP TRIGGER (updated_at)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_natal_charts_updated_at ON public.natal_charts;
CREATE TRIGGER trg_natal_charts_updated_at
  BEFORE UPDATE ON public.natal_charts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_user_devices_updated_at ON public.user_devices;
CREATE TRIGGER trg_user_devices_updated_at
  BEFORE UPDATE ON public.user_devices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 12. AUTH SIGNUP HOOK: AUTOMATIC PROFILE & SUBSCRIPTION INITIALIZATION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create initial profile row synced with Supabase Auth metadata
  INSERT INTO public.profiles (
    id,
    email,
    display_name,
    avatar_url,
    subscription_tier
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    ),
    'free'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = NOW();

  -- Initialize default free tier ledger row in subscriptions
  INSERT INTO public.subscriptions (
    user_id,
    provider,
    payment_provider,
    provider_customer_id,
    provider_product_id,
    tier,
    status
  )
  VALUES (
    NEW.id,
    'dodo',
    'dodo_payments',
    'dodo_cust_pending',
    'free_tier',
    'free',
    'active'
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
