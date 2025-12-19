# Supabase Database Migration Workflow

This document explains how we manage database schema changes using Supabase CLI and SQL migrations.

## Why SQL Version Control?

After experiencing a production bug where an RPC function referenced a deleted database column (`edited_count`), we've implemented SQL version control to prevent schema/code mismatches. All database changes are now tracked in git alongside application code.

## Prerequisites

-   Docker Desktop installed and running
-   Supabase CLI installed (`brew install supabase/tap/supabase`)
-   Access to the Supabase project

## Initial Setup (One-time per developer)

1. **Ensure Docker Desktop is running**

2. **Log in to Supabase**

    ```bash
    supabase login
    ```

    Use your Supabase access token when prompted.

3. **Link to the project**
    ```bash
    supabase link --project-ref xfnfajmpjdkajuaywztb
    ```

## Daily Workflow

### Starting Local Development

```bash
# Start local Supabase (runs in Docker)
supabase start

# This spins up:
# - Local Postgres database
# - Supabase Studio (http://127.0.0.1:54323)
# - All migrations are automatically applied
```

### Making Database Changes

**IMPORTANT**: Never make schema changes directly in the Supabase Dashboard (production). All changes must go through migrations.

#### Option 1: Create Migration Manually

```bash
# Create a new migration file
supabase migration new add_new_column

# Edit the generated file in supabase/migrations/
# Add your SQL changes (CREATE TABLE, ALTER TABLE, etc.)

# Apply the migration locally to test
supabase db reset
```

#### Option 2: Use Supabase Studio

```bash
# Make changes in local Studio (http://127.0.0.1:54323)
# Then capture those changes:
supabase db diff -f your_migration_name
```

### Testing Migrations

```bash
# Reset local database and reapply all migrations
supabase db reset

# Run your application against local database
# Connection string available in `supabase status`
```

### Deploying to Production

```bash
# 1. Commit your migration file
git add supabase/migrations/*.sql
git commit -m "feat: add new database column"

# 2. Push the migration to production
supabase db push

# Alternatively, let CI/CD handle deployment
git push origin your-branch
```

## Important Files

-   **`supabase/migrations/`** - All database migrations (SQL files)
-   **`supabase/config.toml`** - Supabase configuration
-   **`supabase/.gitignore`** - Excludes local dev files from git

## Common Commands

```bash
# Check Supabase status
supabase status

# View migration history
supabase migration list

# Stop local Supabase
supabase stop

# Pull current production schema (creates new migration)
supabase db pull
```

## Best Practices

1. **Always test locally first** - Use `supabase db reset` to ensure migrations work from a clean state
2. **One logical change per migration** - Keep migrations focused and atomic
3. **Include both UP and DOWN logic** - While not required, consider rollback scenarios
4. **Never edit committed migrations** - Create a new migration to fix issues
5. **Coordinate team changes** - Communicate when making schema changes that affect others

## RPC Functions in Version Control

All Supabase RPC (Remote Procedure Call) functions are now tracked in the initial migration file:

-   `get_user_dashboard_data` - Main dashboard query
-   `register_team_on_payment` - Payment webhook handler
-   `join_team_with_registration_id` - Join existing team
-   `register_team_for_event` - Create new team registration
-   And 5 more...

To modify an RPC function:

1. Create a new migration file
2. Use `CREATE OR REPLACE FUNCTION` to update the function
3. Test locally with `supabase db reset`
4. Deploy to production with `supabase db push`

## Troubleshooting

**"Cannot connect to Docker daemon"**

-   Ensure Docker Desktop is running

**"Migration already exists"**

-   Someone else created a migration. Pull latest: `git pull`
-   Reapply locally: `supabase db reset`

**"Migration failed"**

-   Check SQL syntax in the migration file
-   Review error message for specific issue
-   Fix the migration file and try `supabase db reset` again

**"Schema drift detected"**

-   Production schema differs from migrations
-   Run `supabase db pull` to capture current state
-   Review the diff and decide how to reconcile

## Current Database Version

-   **Postgres Version**: 15
-   **Project Reference**: xfnfajmpjdkajuaywztb
-   **Initial Migration**: `20251219100713_remote_schema.sql` (captured 2024-12-19)

## Questions?

Contact the team lead or refer to official docs: https://supabase.com/docs/guides/cli
