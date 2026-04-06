-- Create companies table
CREATE TABLE companies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  company_name text NOT NULL,
  founder_name text NOT NULL,
  contact_email text NOT NULL,
  contact_linkedin text,
  website text,
  industry text NOT NULL,
  monthly_budget numeric NOT NULL,
  stage text NOT NULL CHECK (stage IN ('Prospecting', 'Contacted', 'Shortlisting', 'Campaign Live', 'Complete', 'Archived')),
  how_we_met text,
  notes text,
  date_added date NOT NULL
);

-- Create influencers table
CREATE TABLE influencers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  full_name text NOT NULL,
  handle text NOT NULL,
  platform text NOT NULL,
  other_platforms text,
  follower_count integer NOT NULL,
  engagement_rate numeric,
  niche text NOT NULL,
  contact_email text NOT NULL,
  has_agent boolean DEFAULT false,
  agent_name text,
  agent_email text,
  deal_preference text NOT NULL CHECK (deal_preference IN ('Cash', 'Equity', 'Both')),
  monthly_rate numeric,
  status text NOT NULL CHECK (status IN ('Active in Network', 'Pending', 'Not Interested', 'Archived')),
  notes text,
  date_added date NOT NULL
);

-- Create campaigns table
CREATE TABLE campaigns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  campaign_name text NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  deal_type text CHECK (deal_type IN ('Cash', 'Equity', 'Both')),
  cash_per_month numeric,
  equity_percent numeric,
  posts_per_month_target integer DEFAULT 2,
  post_types text[],
  start_date date,
  end_date date,
  status text NOT NULL CHECK (status IN ('Matching', 'Outreach Sent', 'Negotiating', 'Campaign Live', 'Completed')),
  notes text
);

-- Create campaign_influencers junction table
CREATE TABLE campaign_influencers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  deal_type text CHECK (deal_type IN ('Cash', 'Equity', 'Both')),
  cash_amount numeric,
  equity_percent numeric,
  notes text
);

-- Create campaign_posts tracker table
CREATE TABLE campaign_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  month date NOT NULL,
  post_number integer NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz
);
