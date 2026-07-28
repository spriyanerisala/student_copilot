-- ==============================================================================
-- Table: user_solved_problems
-- Description: Stores the list of solved LeetCode problem objects for a user.
-- ==============================================================================

-- 1. Drop the old table if it exists
DROP TABLE IF EXISTS public.user_solved_problems;

-- 2. Create the table that supports FULL problem details using JSONB
CREATE TABLE public.user_solved_problems (
    user_id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    solved_problems JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Note: We are keeping Row Level Security (RLS) DISABLED for this table 
-- so that it works seamlessly whether you are logged in via Supabase or 
-- using the local "Demo User" account during development.
