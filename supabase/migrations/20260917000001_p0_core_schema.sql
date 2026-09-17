-- ==============================================================================
-- Migration: 20260917000001_p0_core_schema.sql
-- Description: Core Schema for AstroFindings P0 Core MVP
--              (Profiles, Natal Charts, Subscriptions, Payments,
--               Daily Horoscopes Cache, Devices/Push, Consultations)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE subscription_status_enum AS ENUM (
    'active', 
    'trialing', 
    'past_due', 
    'cancelled', 
    'expired'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE house_system_enum AS ENUM (
    'placidus', 
    'whole_sign', 
    'koch', 
    'equal'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. USER PROFILES (Synced with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. BIRTH DATA & CALCULATED NATAL CHARTS (Single Source of Truth)
CREATE TABLE IF NOT EXISTS public.natal_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  is_time_approximate BOOLEAN NOT NULL DEFAULT FALSE,
  birth_location TEXT NOT NULL,
  latitude NUMERIC(9,6) NOT NULL,
  longitude NUMERIC(9,6) NOT NULL,
  timezone TEXT NOT NULL,
  utc_offset_minutes INT NOT NULL,
  house_system house_system_enum NOT NULL DEFAULT 'placidus',
  
  -- Single source of truth JSON: contains ascendant, midheaven, planets, houses, aspects
  chart_data JSONB NOT NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT unique_user_primary_chart UNIQUE (user_id)
);

-- 5. DODO PAYMENTS & SUBSCRIPTIONS (Abstracted Provider Ledger)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Provider abstraction fields: supports Dodo Payments, Stripe, RevenueCat
  payment_provider TEXT NOT NULL DEFAULT 'dodo_payments',
  provider_customer_id TEXT NOT NULL,
  provider_subscription_id TEXT UNIQUE,
  provider_product_id TEXT NOT NULL,
  
  status subscription_status_enum NOT NULL DEFAULT 'trialing',
  tier TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payment_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_payment_id TEXT UNIQUE NOT NULL,
  payment_provider TEXT NOT NULL DEFAULT 'dodo_payments',
  amount_cents INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL, -- 'succeeded', 'failed', 'refunded'
  receipt_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. DAILY HOROSCOPE CACHE (Generated daily per user timezone)
CREATE TABLE IF NOT EXISTS public.daily_horoscopes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_date DATE NOT NULL,
  headline TEXT NOT NULL,
  reading_text TEXT NOT NULL,
  love_focus TEXT,
  career_focus TEXT,
  nervous_system_focus TEXT,
  transits_analyzed JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT unique_user_daily_reading UNIQUE (user_id, target_date)
);

-- 7. PUSH NOTIFICATION USER DEVICES
CREATE TABLE IF NOT EXISTS public.user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  push_token TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'web', -- 'web', 'ios', 'android'
  timezone TEXT NOT NULL DEFAULT 'UTC',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_device_token UNIQUE (user_id, push_token)
);

-- 8. AI CONSULTATIONS / INSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.astrology_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  category TEXT NOT NULL, -- 'love', 'career', 'emotions', 'timing', 'decisions'
  reading_title TEXT NOT NULL,
  summary TEXT NOT NULL,
  dossier_sections JSONB NOT NULL,
  relevant_placements JSONB NOT NULL,
  relevant_transits JSONB NOT NULL,
  is_api_generated BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. INDEXES
CREATE INDEX IF NOT EXISTS idx_natal_charts_user_id ON public.natal_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_daily_horoscopes_user_date ON public.daily_horoscopes(user_id, target_date);
CREATE INDEX IF NOT EXISTS idx_user_devices_active ON public.user_devices(is_active, timezone);
CREATE INDEX IF NOT EXISTS idx_consultations_user_created ON public.astrology_consultations(user_id, created_at DESC);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.natal_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.astrology_consultations ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update their own profile only
DO $$ BEGIN
  CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Natal Charts: Users can access and modify their own chart only
DO $$ BEGIN
  CREATE POLICY "Users can view own chart" ON public.natal_charts FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own chart" ON public.natal_charts FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own chart" ON public.natal_charts FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Subscriptions: Read-only for users (only service role / webhooks can write)
DO $$ BEGIN
  CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can view own invoices" ON public.payment_invoices FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Daily Horoscopes & User Devices
DO $$ BEGIN
  CREATE POLICY "Users can view own horoscopes" ON public.daily_horoscopes FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can manage own devices" ON public.user_devices FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- AI Consultations
DO $$ BEGIN
  CREATE POLICY "Users can view own consultations" ON public.astrology_consultations FOR SELECT USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own consultations" ON public.astrology_consultations FOR INSERT WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 11. AUTH HOOK: AUTOMATIC PROFILE & SUBSCRIPTION CREATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );

  INSERT INTO public.subscriptions (user_id, payment_provider, provider_customer_id, provider_product_id, tier, status)
  VALUES (NEW.id, 'dodo_payments', 'dodo_cust_pending', 'free_tier', 'free', 'active');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
