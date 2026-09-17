-- ==============================================================================
-- Rollback Script for 20260917000001_p0_core_schema.sql
-- ==============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TABLE IF EXISTS public.astrology_consultations CASCADE;
DROP TABLE IF EXISTS public.user_devices CASCADE;
DROP TABLE IF EXISTS public.daily_horoscopes CASCADE;
DROP TABLE IF EXISTS public.payment_invoices CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.natal_charts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS house_system_enum;
DROP TYPE IF EXISTS subscription_status_enum;
