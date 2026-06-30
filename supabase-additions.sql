-- ============================================================================
-- ItCrowd — schema additions for the 3-account connection (applied live to
-- project xqewcqhbnrndxqthkgqf). The base multi-tenant schema (profiles,
-- company_members, threads, messages, intake tables, RLS, is_admin/
-- handle_new_user/prevent_role_self_escalation, etc.) was applied out-of-band
-- earlier; this file captures the additions/fixes made for the account work.
-- ============================================================================

-- ---- Access-check helpers (SECURITY DEFINER, self-scoped to auth.uid()) -----
-- Used inside RLS policies. Being SECURITY DEFINER, they bypass RLS on the
-- tables they read, which both scopes by the caller AND prevents policy
-- recursion (e.g. campaigns <-> campaign_influencers).
create or replace function public.can_access_campaign(cid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or exists (select 1 from campaigns c join company_members cm on cm.company_id = c.company_id
               where c.id = cid and cm.profile_id = auth.uid())
    or exists (select 1 from campaign_influencers ci join influencers i on i.id = ci.influencer_id
               where ci.campaign_id = cid and i.owner_profile_id = auth.uid());
$$;

create or replace function public.can_access_company(coid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or exists (select 1 from company_members cm where cm.company_id = coid and cm.profile_id = auth.uid())
    or exists (select 1 from campaign_influencers ci join campaigns c on c.id = ci.campaign_id
               join influencers i on i.id = ci.influencer_id
               where c.company_id = coid and i.owner_profile_id = auth.uid());
$$;

create or replace function public.business_shares_campaign_with_influencer(inf_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from campaign_influencers ci join campaigns c on c.id = ci.campaign_id
                join company_members cm on cm.company_id = c.company_id
                where ci.influencer_id = inf_id and cm.profile_id = auth.uid());
$$;

create or replace function public.influencer_shares_campaign_with_company(co_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from campaigns c join campaign_influencers ci on ci.campaign_id = c.id
                join influencers i on i.id = ci.influencer_id
                where c.company_id = co_id and i.owner_profile_id = auth.uid());
$$;

revoke all on function public.can_access_campaign(uuid), public.can_access_company(uuid),
  public.business_shares_campaign_with_influencer(uuid),
  public.influencer_shares_campaign_with_company(uuid) from public;
grant execute on function public.can_access_campaign(uuid), public.can_access_company(uuid),
  public.business_shares_campaign_with_influencer(uuid),
  public.influencer_shares_campaign_with_company(uuid) to authenticated;

-- ---- Harden signup: role can never be self-assigned 'admin' ----------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, full_name, role, status)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email),
    case when (new.raw_user_meta_data->>'role') = 'business' then 'business'::user_role
         else 'influencer'::user_role end,
    'pending');
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.current_role_name() from public, anon;
grant execute on function public.current_role_name() to authenticated;

-- ---- Self-service onboarding RPCs (validate auth.uid() + role) --------------
-- Insert the company/influencer + membership/profile rows the user cannot
-- insert directly (no self-insert RLS), and set onboarding_complete=true.
-- They do NOT change profiles.status (the prevent_role_self_escalation trigger
-- guards role/status); admins activate accounts during vetting.
--   public.complete_business_onboarding(p_company_name, p_industry, p_website, p_job_title, p_phone) -> company uuid
--   public.complete_influencer_onboarding(p_full_name, p_handle, p_platform, p_niche, p_follower_count, p_deal_preference, p_phone) -> influencer uuid
-- (Full bodies live in the database.)

-- ---- content table (creator uploads visible to the owning company) ---------
create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  company_id  uuid not null references companies(id) on delete cascade,
  influencer_id uuid not null references influencers(id) on delete cascade,
  title text not null,
  description text,
  file_url text,
  file_type text not null default 'Photo' check (file_type in ('Photo','Video','Document')),
  category text,
  status text not null default 'Pending' check (status in ('Pending','Approved','Revision Requested')),
  revision_notes text,
  engagement jsonb not null default '{}'::jsonb
);
alter table public.content enable row level security;
-- Policies: admins all; creator inserts/updates own (attached to campaign);
-- participants read via can_access_campaign; business reviews (update) content
-- on their campaigns. (See live DB for exact definitions.)

-- ---- Storage buckets (private) + path-scoped policies ----------------------
-- 'content'     path = {campaign_id}/{file}  -> can_access_campaign(folder1)
-- 'attachments' path = {company_id}/{file}   -> can_access_company(folder1)

-- ---- Cross-party read policies (scoped to shared campaigns, no recursion) --
create policy "business reads creators on their campaigns" on public.influencers
  for select to authenticated using (business_shares_campaign_with_influencer(id));
create policy "influencer reads companies on their campaigns" on public.companies
  for select to authenticated using (influencer_shares_campaign_with_company(id));

-- ---- Fix pre-existing campaigns <-> campaign_influencers policy recursion ---
drop policy if exists "business can read own campaigns" on public.campaigns;
drop policy if exists "influencer can read campaigns theyre attached to" on public.campaigns;
create policy "participants can read campaigns" on public.campaigns
  for select to authenticated using (can_access_campaign(id));

drop policy if exists "business can read own campaign_influencers" on public.campaign_influencers;
drop policy if exists "influencer can read own campaign_influencers" on public.campaign_influencers;
create policy "participants can read campaign_influencers" on public.campaign_influencers
  for select to authenticated using (can_access_campaign(campaign_id));

-- ---- Base privileges for the authenticated role (RLS governs rows) ---------
grant select, insert, update, delete on all tables in schema public to authenticated;

-- ---- Hygiene: pin search_path on pre-existing fns --------------------------
alter function public.is_admin() set search_path = public;
alter function public.set_updated_at() set search_path = public;
alter function public.prevent_role_self_escalation() set search_path = public;
