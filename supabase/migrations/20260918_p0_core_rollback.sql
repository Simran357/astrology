-- ==============================================================================
-- Rollback Script for 20260918_p0_core_schema.sql
-- ==============================================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS trg_natal_charts_updated_at ON public.natal_charts;
DROP TRIGGER IF EXISTS trg_subscriptions_updated_at ON public.subscriptions;
DROP TRIGGER IF EXISTS trg_user_devices_updated_at ON public.user_devices;
DROP FUNCTION IF EXISTS public.handle_updated_at();

DROP TABLE IF EXISTS public.ai_readings CASCADE;
DROP TABLE IF EXISTS public.astrology_consultations CASCADE;
DROP TABLE IF EXISTS public.user_devices CASCADE;
DROP TABLE IF EXISTS public.daily_horoscopes CASCADE;
DROP TABLE IF EXISTS public.payment_invoices CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.natal_charts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS house_system_enum;
DROP TYPE IF EXISTS subscription_status_enum;
