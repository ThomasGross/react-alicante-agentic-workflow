-- `level` captures the expected experience level for each session.
-- An enum makes the allowed values part of the schema, and
-- `pnpm db:types` then generates a union type for them — same pattern as
-- `session_track` in 20260918100000_session_track_enum.sql.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- Add the column as nullable first so we can back-fill before enforcing NOT NULL.
alter table public.sessions
  add column if not exists level public.session_level;

-- Back-fill all 8 existing rows.
update public.sessions set level = 'beginner'      where id = 'opening-keynote';
update public.sessions set level = 'advanced'      where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced'      where id = 'server-components-deep-dive';
update public.sessions set level = 'intermediate'  where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate'  where id = 'agent-context-windows';
update public.sessions set level = 'advanced'      where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate'  where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner'      where id = 'closing-panel';

-- Now that every row has a value, tighten the column to NOT NULL.
alter table public.sessions
  alter column level set not null;
