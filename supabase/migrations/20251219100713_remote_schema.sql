drop extension if exists "pg_net";


  create table "public"."event_payments" (
    "payment_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "event_id" uuid,
    "registration_id" uuid,
    "team_id" uuid,
    "user_email" text,
    "amount" numeric,
    "currency" text,
    "metadata" jsonb
      );


alter table "public"."event_payments" enable row level security;


  create table "public"."event_players" (
    "player_id" uuid not null default gen_random_uuid(),
    "registration_id" uuid,
    "user_email" text,
    "first_name" text,
    "last_name" text,
    "jersey_number" integer,
    "waiver_signed" boolean default false,
    "updated_at" timestamp with time zone default now(),
    "user_id" text
      );


alter table "public"."event_players" enable row level security;


  create table "public"."event_registrations" (
    "registration_id" uuid not null default gen_random_uuid(),
    "event_id" uuid,
    "team_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "paid" boolean not null default false
      );


alter table "public"."event_registrations" enable row level security;


  create table "public"."events" (
    "event_id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "subtitle" text,
    "image" text not null,
    "description" text,
    "date" text,
    "location" text,
    "price" text,
    "title_short" text,
    "league_id" uuid default gen_random_uuid(),
    "active" boolean not null,
    "reg_ddl" text not null,
    "stripe_price_ids" jsonb,
    "allow_multi_team" boolean default false,
    "event_external_url" text,
    "display_date" text,
    "display_location_full" text,
    "display_registration_status" text,
    "display_event_section_title_full" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."events" enable row level security;


  create table "public"."leagues" (
    "league_id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "image" text,
    "show" boolean not null default false
      );


alter table "public"."leagues" enable row level security;


  create table "public"."members" (
    "member_id" uuid not null default extensions.uuid_generate_v4(),
    "image_url" text,
    "name" text,
    "title" text,
    "committee" text,
    "description" text
      );


alter table "public"."members" enable row level security;


  create table "public"."teams" (
    "team_id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "league_id" uuid
      );


alter table "public"."teams" enable row level security;


  create table "public"."users" (
    "user_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "profile_image_url" text,
    "data_collected" boolean not null default false,
    "legal_first_name" text,
    "legal_last_name" text,
    "preferred_first_name" text,
    "date_of_birth" date,
    "phone_number" text,
    "address" text,
    "instagram_account" text,
    "player_introduction" text,
    "headshot_url" text
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX event_payments_pkey ON public.event_payments USING btree (payment_id);

CREATE UNIQUE INDEX event_players_pkey ON public.event_players USING btree (player_id);

CREATE UNIQUE INDEX event_players_player_id_key ON public.event_players USING btree (player_id);

CREATE UNIQUE INDEX event_registrations_pkey ON public.event_registrations USING btree (registration_id);

CREATE UNIQUE INDEX event_registrations_registration_id_key ON public.event_registrations USING btree (registration_id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (event_id);

CREATE INDEX idx_event_payments_registration_id ON public.event_payments USING btree (registration_id);

CREATE INDEX idx_event_players_registration_id ON public.event_players USING btree (registration_id);

CREATE INDEX idx_event_players_user_email ON public.event_players USING btree (user_email);

CREATE INDEX idx_event_players_user_id ON public.event_players USING btree (user_id);

CREATE INDEX idx_event_registrations_event_id ON public.event_registrations USING btree (event_id);

CREATE INDEX idx_event_registrations_event_team ON public.event_registrations USING btree (event_id, team_id);

CREATE INDEX idx_event_registrations_team_id ON public.event_registrations USING btree (team_id);

CREATE INDEX idx_events_active ON public.events USING btree (active);

CREATE INDEX idx_teams_team_id ON public.teams USING btree (team_id);

CREATE UNIQUE INDEX league_pkey ON public.leagues USING btree (league_id);

CREATE UNIQUE INDEX members_pkey ON public.members USING btree (member_id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (team_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

alter table "public"."event_payments" add constraint "event_payments_pkey" PRIMARY KEY using index "event_payments_pkey";

alter table "public"."event_players" add constraint "event_players_pkey" PRIMARY KEY using index "event_players_pkey";

alter table "public"."event_registrations" add constraint "event_registrations_pkey" PRIMARY KEY using index "event_registrations_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."leagues" add constraint "league_pkey" PRIMARY KEY using index "league_pkey";

alter table "public"."members" add constraint "members_pkey" PRIMARY KEY using index "members_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."event_payments" add constraint "event_payments_registration_id_fkey" FOREIGN KEY (registration_id) REFERENCES public.event_registrations(registration_id) not valid;

alter table "public"."event_payments" validate constraint "event_payments_registration_id_fkey";

alter table "public"."event_players" add constraint "event_players_player_id_key" UNIQUE using index "event_players_player_id_key";

alter table "public"."event_players" add constraint "event_players_registration_id_fkey" FOREIGN KEY (registration_id) REFERENCES public.event_registrations(registration_id) not valid;

alter table "public"."event_players" validate constraint "event_players_registration_id_fkey";

alter table "public"."event_players" add constraint "event_players_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) not valid;

alter table "public"."event_players" validate constraint "event_players_user_id_fkey";

alter table "public"."event_registrations" add constraint "event_registrations_registration_id_key" UNIQUE using index "event_registrations_registration_id_key";

alter table "public"."events" add constraint "events_league_id_fkey" FOREIGN KEY (league_id) REFERENCES public.leagues(league_id) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_league_id_fkey";

alter table "public"."teams" add constraint "teams_league_id_fkey" FOREIGN KEY (league_id) REFERENCES public.leagues(league_id) ON UPDATE CASCADE not valid;

alter table "public"."teams" validate constraint "teams_league_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.execute_sql(sql text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  EXECUTE sql;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_registration_by_short_id(short_id text)
 RETURNS TABLE(registration_id uuid, event_id uuid, team_id uuid)
 LANGUAGE plpgsql
AS $function$
  BEGIN
      RETURN QUERY
      SELECT er.registration_id, er.event_id, er.team_id
      FROM event_registrations er
      WHERE er.registration_id::text LIKE short_id || '%'
      LIMIT 1;
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.get_user_dashboard_data(p_user_id text DEFAULT NULL::text, p_user_email text DEFAULT NULL::text)
 RETURNS json
 LANGUAGE plpgsql
AS $function$                                                                                                     
    DECLARE                                                                                                         
        v_result JSON;                                                                                              
    BEGIN                                                                                                           
        WITH user_registrations AS (                                                                                
            SELECT DISTINCT                                                                                         
                er.registration_id,                                                                                 
                er.event_id,                                                                                        
                er.team_id,                                                                                         
                er.paid                                                                                             
            FROM event_registrations er                                                                             
            INNER JOIN event_players ep ON er.registration_id = ep.registration_id                                  
            WHERE (ep.user_id = p_user_id OR ep.user_email = p_user_email)                                          
        ),                                                                                                          
        user_team_counts AS (                                                                                       
            SELECT                                                                                                  
                event_id,                                                                                           
                COUNT(*) as team_count                                                                              
            FROM user_registrations                                                                                 
            GROUP BY event_id                                                                                       
        ),                                                                                                          
        user_events AS (                                                                                            
            SELECT                                                                                                  
                e.event_id,                                                                                         
                e.title,                                                                                            
                e.title_short,                                                                                      
                e.subtitle,                                                                                         
                e.date,                                                                                             
                e.location,                                                                                         
                e.price,                                                                                            
                e.active,                                                                                           
                e.allow_multi_team,                                                                                 
                e.league_id,                                                                                        
                e.stripe_price_ids,                                                                                 
                e.display_registration_status,                                                                      
                e.display_date,                                                                                     
                e.display_location_full,                                                                            
                e.display_event_section_title_full,                                                                 
                e.event_external_url,                                                                               
                ur.registration_id,                                                                                 
                ur.team_id,                                                                                         
                ur.paid,                                                                                            
                t.name as team_name,                                                                                
                ep.waiver_signed,                                                                                   
                COALESCE(utc.team_count, 0) as user_team_count                                                      
            FROM events e                                                                                           
            INNER JOIN user_registrations ur ON e.event_id = ur.event_id                                            
            LEFT JOIN teams t ON ur.team_id = t.team_id                                                             
            LEFT JOIN event_players ep ON ur.registration_id = ep.registration_id                                   
                AND (ep.user_id = p_user_id OR ep.user_email = p_user_email)                                        
            LEFT JOIN user_team_counts utc ON e.event_id = utc.event_id                                             
        ),                                                                                                          
        active_non_registered AS (                                                                                  
            SELECT                                                                                                  
                e.event_id,                                                                                         
                e.title,                                                                                            
                e.title_short,                                                                                      
                e.subtitle,                                                                                         
                e.date,                                                                                             
                e.location,                                                                                         
                e.price,                                                                                            
                e.active,                                                                                           
                e.allow_multi_team,                                                                                 
                e.league_id,                                                                                        
                e.stripe_price_ids,                                                                                 
                e.display_registration_status,                                                                      
                e.display_date,                                                                                     
                e.display_location_full,                                                                            
                e.display_event_section_title_full,                                                                 
                e.event_external_url,                                                                               
                NULL::uuid as registration_id,                                                                      
                NULL::uuid as team_id,                                                                              
                false as paid,                                                                                      
                NULL::text as team_name,                                                                            
                false as waiver_signed,                                                                             
                0 as user_team_count                                                                                
            FROM events e                                                                                           
            WHERE e.active = true                                                                                   
            AND NOT EXISTS (                                                                                        
                SELECT 1 FROM user_events ue                                                                        
                WHERE ue.event_id = e.event_id                                                                      
            )                                                                                                       
        ),                                                                                                          
        all_events AS (                                                                                             
            SELECT * FROM user_events                                                                               
            UNION ALL                                                                                               
            SELECT * FROM active_non_registered                                                                     
        )                                                                                                           
        SELECT json_build_object(                                                                                   
            'activeEvents', COALESCE(                                                                               
                (SELECT json_agg(                                                                                   
                    json_build_object(                                                                              
                        'event_id', CASE                                                                            
                            WHEN team_id IS NOT NULL                                                                
                            THEN event_id::text || '_' || team_id::text                                             
                            ELSE event_id::text || '_no_team'                                                       
                        END,                                                                                        
                        'original_event_id', event_id,                                                              
                        'title', title,                                                                             
                        'title_short', title_short,                                                                 
                        'subtitle', subtitle,                                                                       
                        'date', date,                                                                               
                        'location', location,                                                                       
                        'price', price,                                                                             
                        'active', active,                                                                           
                        'allow_multi_team', allow_multi_team,                                                       
                        'league_id', league_id,                                                                     
                        'stripe_price_ids', stripe_price_ids,                                                       
                        'display_registration_status', display_registration_status,                                 
                        'display_date', display_date,                                                               
                        'display_location_full', display_location_full,                                             
                        'display_event_section_title_full', display_event_section_title_full,                       
                        'event_external_url', event_external_url,                                                   
                        'user_team_count', user_team_count,                                                         
                        'userStatus', json_build_object(                                                            
                            'isRegistered', registration_id IS NOT NULL,                                            
                            'registration_id', registration_id,                                                     
                            'team', team_name,                                                                      
                            'team_id', team_id,                                                                     
                            'waiverSigned', COALESCE(waiver_signed, false),                                         
                            'paymentStatus', COALESCE(paid, false)                                                  
                        )                                                                                           
                    )                                                                                               
                ) FROM all_events WHERE active = true),                                                             
                '[]'::json                                                                                          
            ),                                                                                                      
            'previousEvents', COALESCE(                                                                             
                (SELECT json_agg(                                                                                   
                    json_build_object(                                                                              
                        'event_id', CASE                                                                            
                            WHEN team_id IS NOT NULL                                                                
                            THEN event_id::text || '_' || team_id::text                                             
                            ELSE event_id::text || '_no_team'                                                       
                        END,                                                                                        
                        'original_event_id', event_id,                                                              
                        'title', title,                                                                             
                        'title_short', title_short,                                                                 
                        'subtitle', subtitle,                                                                       
                        'date', date,                                                                               
                        'location', location,                                                                       
                        'price', price,                                                                             
                        'active', active,                                                                           
                        'allow_multi_team', allow_multi_team,                                                       
                        'league_id', league_id,                                                                     
                        'stripe_price_ids', stripe_price_ids,                                                       
                        'display_registration_status', display_registration_status,                                 
                        'display_date', display_date,                                                               
                        'display_location_full', display_location_full,                                             
                        'display_event_section_title_full', display_event_section_title_full,                       
                        'event_external_url', event_external_url,                                                   
                        'user_team_count', user_team_count,                                                         
                        'userStatus', json_build_object(                                                            
                            'isRegistered', registration_id IS NOT NULL,                                            
                            'registration_id', registration_id,                                                     
                            'team', team_name,                                                                      
                            'team_id', team_id,                                                                     
                            'waiverSigned', COALESCE(waiver_signed, false),                                         
                            'paymentStatus', COALESCE(paid, false)                                                  
                        )                                                                                           
                    )                                                                                               
                ) FROM all_events WHERE active = false),                                                            
                '[]'::json                                                                                          
            )                                                                                                       
        ) INTO v_result;                                                                                            
                                                                                                                    
        RETURN v_result;                                                                                            
    END;                                                                                                            
  $function$
;

CREATE OR REPLACE FUNCTION public.join_team_with_registration_id(p_registration_id uuid, p_event_id uuid, p_user_email text, p_first_name text, p_last_name text, p_jersey_number integer, p_user_id text DEFAULT NULL::text)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
  DECLARE
      v_found_event_id UUID;
      v_event_allow_multi_team BOOLEAN;
      v_player_already_in_team INTEGER;
      v_player_team_count INTEGER;
      v_max_teams INTEGER;
      v_jersey_conflict INTEGER;
      v_validated_user_id TEXT;
      v_user_exists BOOLEAN;
  BEGIN
      -- Debug: Log what we received
      RAISE NOTICE 'Join team RPC called with user_id: %, user_email: %', p_user_id, p_user_email;

      -- 1. Validate registration exists and get event info
      SELECT er.event_id
      INTO v_found_event_id
      FROM event_registrations er
      WHERE er.registration_id = p_registration_id;

      IF NOT FOUND THEN
          RETURN json_build_object(
              'success', false,
              'error', 'Invalid registration ID',
              'status', 404
          );
      END IF;

      -- 2. Verify event_id matches
      IF v_found_event_id != p_event_id THEN
          RETURN json_build_object(
              'success', false,
              'error', 'This registration ID is for a different event',
              'status', 400
          );
      END IF;

      -- 3. Check if user already in THIS team
      SELECT COUNT(*)
      INTO v_player_already_in_team
      FROM event_players
      WHERE registration_id = p_registration_id
      AND user_email = p_user_email;

      IF v_player_already_in_team > 0 THEN
          RETURN json_build_object(
              'success', false,
              'error', 'You''re already on this team',
              'status', 400
          );
      END IF;

      -- 4. Get event's allow_multi_team setting
      SELECT allow_multi_team
      INTO v_event_allow_multi_team
      FROM events
      WHERE event_id = p_event_id;

      -- 5. Count how many teams THIS PLAYER is already on for this event
      SELECT COUNT(DISTINCT er.registration_id)
      INTO v_player_team_count
      FROM event_registrations er
      JOIN event_players ep ON er.registration_id = ep.registration_id
      WHERE er.event_id = p_event_id
      AND ep.user_email = p_user_email;

      -- 6. Check team limit based on allow_multi_team
      v_max_teams := CASE WHEN v_event_allow_multi_team THEN 2 ELSE 1 END;

      IF v_player_team_count >= v_max_teams THEN
          RETURN json_build_object(
              'success', false,
              'error', format('You''ve reached the maximum teams (%s) for this event', v_max_teams),
              'status', 400
          );
      END IF;

      -- 7. Check jersey number not duplicate in THIS team
      SELECT COUNT(*)
      INTO v_jersey_conflict
      FROM event_players
      WHERE registration_id = p_registration_id
      AND jersey_number = p_jersey_number;

      IF v_jersey_conflict > 0 THEN
          RETURN json_build_object(
              'success', false,
              'error', format('Jersey number #%s is already taken in this team', p_jersey_number),
              'status', 400
          );
      END IF;

      -- 8. Validate user_id exists in users table (WITH DEBUG LOGGING)
      v_validated_user_id := NULL;
      IF p_user_id IS NOT NULL THEN
          -- Check if user exists
          SELECT EXISTS(SELECT 1 FROM users WHERE user_id = p_user_id) INTO v_user_exists;
          RAISE NOTICE 'User exists check: %, user_id: %', v_user_exists, p_user_id;

          IF v_user_exists THEN
              v_validated_user_id := p_user_id;
              RAISE NOTICE 'User found! Setting validated_user_id to: %', v_validated_user_id;
          ELSE
              RAISE NOTICE 'User NOT found in users table, setting to NULL';
          END IF;
      ELSE
          RAISE NOTICE 'p_user_id is NULL, skipping validation';
      END IF;

      RAISE NOTICE 'Final validated_user_id: %', v_validated_user_id;

      -- 9. Add player to event_players
      INSERT INTO event_players (registration_id, user_email, user_id, first_name, last_name, jersey_number, waiver_signed)
      VALUES (p_registration_id, p_user_email, v_validated_user_id, p_first_name, p_last_name, p_jersey_number, false);

      -- 10. Return success
      RETURN json_build_object(
          'success', true,
          'message', 'Successfully joined team'
      );

  EXCEPTION
      WHEN OTHERS THEN
          RETURN json_build_object(
              'success', false,
              'error', 'An unexpected error occurred: ' || SQLERRM,
              'status', 500
          );
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.on_after_payment_succeed(p_payment_id text, p_event_id text, p_registration_id text, p_team_id text, p_amount bigint, p_currency text, p_metadata jsonb, p_user_email text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
  BEGIN
      -- Insert payment record
      INSERT INTO public.event_payments (
          payment_id,
          event_id,
          registration_id,
          team_id,
          amount,
          currency,
          metadata,
          user_email,
          created_at,
          updated_at
      ) VALUES (
          p_payment_id::uuid,
          p_event_id::uuid,
          p_registration_id::uuid,
          p_team_id::uuid,
          p_amount,
          p_currency,
          p_metadata,
          p_user_email,
          now(),
          now()
      );

      -- Update registration status
      UPDATE public.event_registrations
      SET paid = true
      WHERE registration_id = p_registration_id::uuid;
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.register_event_and_update_event_players_table(event_id uuid, team_id uuid, players jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
    reg_id UUID;
    player_data JSONB; -- Variable to hold each player's JSONB data
BEGIN
    -- Debugging: Check input type and structure
    RAISE NOTICE 'Players input: %', players;
    RAISE NOTICE 'Players type: %', jsonb_typeof(players);

    -- Ensure `players` is a JSONB array
    IF jsonb_typeof(players) IS DISTINCT FROM 'array' THEN
        RAISE EXCEPTION 'Invalid input: players must be a JSONB array';
    END IF;

    -- Step 1: Insert into event_registrations and get the registration_id
    INSERT INTO event_registrations (event_id, team_id)
    VALUES (event_id, team_id)
    RETURNING registration_id INTO reg_id;

    -- Debugging: Confirm `registration_id` generated
    RAISE NOTICE 'Generated registration_id: %', reg_id;

    -- Step 2: Iterate over players and insert into registration_players
    FOR player_data IN SELECT * FROM jsonb_array_elements(players) LOOP
        -- Debugging: Check each player's data
        RAISE NOTICE 'Processing player data: %', player_data;

        INSERT INTO event_players (registration_id, user_email, first_name, last_name, jersey_number, updated_at)
        VALUES (
            reg_id,
            player_data->>'user_email',
            player_data->>'first_name',
            player_data->>'last_name',
            (player_data->>'jersey_number')::INTEGER,
            NOW()
        );
    END LOOP;

    -- Debugging: Confirm successful completion
    RAISE NOTICE 'All players processed successfully';
END;$function$
;

CREATE OR REPLACE FUNCTION public.register_team_for_event(p_event_id uuid, p_team_id uuid, p_user_email text, p_first_name text, p_last_name text, p_user_id text DEFAULT NULL::text)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
  DECLARE
      v_event_allow_multi_team BOOLEAN;
      v_existing_team_count INTEGER;
      v_player_team_count INTEGER;
      v_max_teams INTEGER;
      v_registration_id UUID;
  BEGIN
      -- 1. Validate event exists and get allow_multi_team setting
      SELECT allow_multi_team
      INTO v_event_allow_multi_team
      FROM events
      WHERE event_id = p_event_id;

      IF NOT FOUND THEN
          RETURN json_build_object(
              'success', false,
              'error', 'Event not found',
              'status', 404
          );
      END IF;

      -- 2. Check if this team is already registered for this event (block duplicates)
      SELECT COUNT(*)
      INTO v_existing_team_count
      FROM event_registrations
      WHERE event_id = p_event_id
      AND team_id = p_team_id;

      IF v_existing_team_count > 0 THEN
          RETURN json_build_object(
              'success', false,
              'error', 'This team is already registered for this event',
              'status', 400
          );
      END IF;

      -- 3. Count how many teams THIS PLAYER is already on for this event
      SELECT COUNT(DISTINCT er.registration_id)
      INTO v_player_team_count
      FROM event_registrations er
      JOIN event_players ep ON er.registration_id = ep.registration_id
      WHERE er.event_id = p_event_id
      AND ep.user_email = p_user_email;

      -- 4. Check team limit based on allow_multi_team
      v_max_teams := CASE WHEN v_event_allow_multi_team THEN 10 ELSE 1 END;

      IF v_player_team_count >= v_max_teams THEN
          RETURN json_build_object(
              'success', false,
              'error', format('You''ve reached the maximum teams (%s) for this event', v_max_teams),
              'status', 400
          );
      END IF;

      -- 5. Create event_registration record
      INSERT INTO event_registrations (event_id, team_id, paid, edited_count)
      VALUES (p_event_id, p_team_id, false, 0)
      RETURNING registration_id INTO v_registration_id;

      -- 6. Add creator as first player (jersey 998) + admin (jersey 999)
      INSERT INTO event_players (registration_id, user_email, user_id, first_name, last_name, jersey_number, waiver_signed)
      VALUES
          (v_registration_id, p_user_email, p_user_id, p_first_name, p_last_name, 998, false),
          (v_registration_id, 'webadmin@shegotbuckets.org', NULL, 'Web', 'Admin', 999, false);

      -- 7. Return success with registration_id
      RETURN json_build_object(
          'success', true,
          'registration_id', v_registration_id,
          'message', 'Team registered successfully'
      );

  EXCEPTION
      WHEN OTHERS THEN
          RETURN json_build_object(
              'success', false,
              'error', 'An unexpected error occurred: ' || SQLERRM,
              'status', 500
          );
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.register_team_on_payment(p_payment_id uuid, p_event_id uuid, p_team_id uuid, p_user_email text, p_first_name text, p_last_name text, p_amount bigint, p_currency text, p_metadata jsonb)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
  DECLARE
      v_registration_result JSON;
      v_registration_id UUID;
      v_user_id TEXT;
  BEGIN
      RAISE NOTICE 'Step 1: Looking up user_id for email: %', p_user_email;

      -- Step 1: Lookup user_id from users table
      SELECT user_id INTO v_user_id
      FROM users
      WHERE email = p_user_email
      LIMIT 1;

      RAISE NOTICE 'Step 1 complete: user_id = %', v_user_id;

      -- Step 2: Call register_team_for_event to create registration
      RAISE NOTICE 'Step 2: Calling register_team_for_event';

      v_registration_result := register_team_for_event(
          p_event_id,
          p_team_id,
          p_user_email,
          p_first_name,
          p_last_name,
          v_user_id
      );

      RAISE NOTICE 'Step 2 complete: result = %', v_registration_result;

      -- Step 3: Check if registration succeeded
      IF NOT (v_registration_result->>'success')::boolean THEN
          RAISE NOTICE 'Step 3: Registration failed';
          RETURN v_registration_result;
      END IF;

      -- Step 4: Extract registration_id from result
      v_registration_id := (v_registration_result->>'registration_id')::uuid;
      RAISE NOTICE 'Step 4: registration_id = %', v_registration_id;

      -- Step 5: Create payment record
      RAISE NOTICE 'Step 5: Creating payment record';

      INSERT INTO public.event_payments (
          payment_id,
          event_id,
          registration_id,
          team_id,
          amount,
          currency,
          metadata,
          user_email,
          created_at,
          updated_at
      ) VALUES (
          p_payment_id,
          p_event_id,
          v_registration_id,
          p_team_id,
          p_amount,
          p_currency,
          p_metadata,
          p_user_email,
          now(),
          now()
      );

      RAISE NOTICE 'Step 5 complete: Payment record created';

      -- Step 6: Mark registration as paid
      RAISE NOTICE 'Step 6: Marking registration as paid';

      UPDATE public.event_registrations
      SET paid = true
      WHERE registration_id = v_registration_id;

      RAISE NOTICE 'Step 6 complete: Registration marked as paid';

      -- Step 7: Return success with registration_id
      RETURN json_build_object(
          'success', true,
          'registration_id', v_registration_id,
          'message', 'Team registered and payment processed'
      );

  EXCEPTION
      WHEN OTHERS THEN
          RAISE NOTICE 'EXCEPTION: % %', SQLSTATE, SQLERRM;
          RETURN json_build_object(
              'success', false,
              'error', 'Payment processing failed: ' || SQLERRM,
              'status', 500
          );
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.sync_event_players_user_id()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
  BEGIN
      -- Update all event_players with matching email
      UPDATE event_players
      SET user_id = NEW.user_id
      WHERE user_email = NEW.email
      AND user_id IS NULL;

      -- Log how many records were updated
      RAISE NOTICE 'Synced user_id for email %: % records updated',
          NEW.email,
          (SELECT COUNT(*) FROM event_players WHERE user_email = NEW.email);

      RETURN NEW;
  END;
  $function$
;

grant delete on table "public"."event_payments" to "anon";

grant insert on table "public"."event_payments" to "anon";

grant references on table "public"."event_payments" to "anon";

grant select on table "public"."event_payments" to "anon";

grant trigger on table "public"."event_payments" to "anon";

grant truncate on table "public"."event_payments" to "anon";

grant update on table "public"."event_payments" to "anon";

grant delete on table "public"."event_payments" to "authenticated";

grant insert on table "public"."event_payments" to "authenticated";

grant references on table "public"."event_payments" to "authenticated";

grant select on table "public"."event_payments" to "authenticated";

grant trigger on table "public"."event_payments" to "authenticated";

grant truncate on table "public"."event_payments" to "authenticated";

grant update on table "public"."event_payments" to "authenticated";

grant delete on table "public"."event_payments" to "service_role";

grant insert on table "public"."event_payments" to "service_role";

grant references on table "public"."event_payments" to "service_role";

grant select on table "public"."event_payments" to "service_role";

grant trigger on table "public"."event_payments" to "service_role";

grant truncate on table "public"."event_payments" to "service_role";

grant update on table "public"."event_payments" to "service_role";

grant delete on table "public"."event_players" to "anon";

grant insert on table "public"."event_players" to "anon";

grant references on table "public"."event_players" to "anon";

grant select on table "public"."event_players" to "anon";

grant trigger on table "public"."event_players" to "anon";

grant truncate on table "public"."event_players" to "anon";

grant update on table "public"."event_players" to "anon";

grant delete on table "public"."event_players" to "authenticated";

grant insert on table "public"."event_players" to "authenticated";

grant references on table "public"."event_players" to "authenticated";

grant select on table "public"."event_players" to "authenticated";

grant trigger on table "public"."event_players" to "authenticated";

grant truncate on table "public"."event_players" to "authenticated";

grant update on table "public"."event_players" to "authenticated";

grant delete on table "public"."event_players" to "service_role";

grant insert on table "public"."event_players" to "service_role";

grant references on table "public"."event_players" to "service_role";

grant select on table "public"."event_players" to "service_role";

grant trigger on table "public"."event_players" to "service_role";

grant truncate on table "public"."event_players" to "service_role";

grant update on table "public"."event_players" to "service_role";

grant delete on table "public"."event_registrations" to "anon";

grant insert on table "public"."event_registrations" to "anon";

grant references on table "public"."event_registrations" to "anon";

grant select on table "public"."event_registrations" to "anon";

grant trigger on table "public"."event_registrations" to "anon";

grant truncate on table "public"."event_registrations" to "anon";

grant update on table "public"."event_registrations" to "anon";

grant delete on table "public"."event_registrations" to "authenticated";

grant insert on table "public"."event_registrations" to "authenticated";

grant references on table "public"."event_registrations" to "authenticated";

grant select on table "public"."event_registrations" to "authenticated";

grant trigger on table "public"."event_registrations" to "authenticated";

grant truncate on table "public"."event_registrations" to "authenticated";

grant update on table "public"."event_registrations" to "authenticated";

grant delete on table "public"."event_registrations" to "service_role";

grant insert on table "public"."event_registrations" to "service_role";

grant references on table "public"."event_registrations" to "service_role";

grant select on table "public"."event_registrations" to "service_role";

grant trigger on table "public"."event_registrations" to "service_role";

grant truncate on table "public"."event_registrations" to "service_role";

grant update on table "public"."event_registrations" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."leagues" to "anon";

grant insert on table "public"."leagues" to "anon";

grant references on table "public"."leagues" to "anon";

grant select on table "public"."leagues" to "anon";

grant trigger on table "public"."leagues" to "anon";

grant truncate on table "public"."leagues" to "anon";

grant update on table "public"."leagues" to "anon";

grant delete on table "public"."leagues" to "authenticated";

grant insert on table "public"."leagues" to "authenticated";

grant references on table "public"."leagues" to "authenticated";

grant select on table "public"."leagues" to "authenticated";

grant trigger on table "public"."leagues" to "authenticated";

grant truncate on table "public"."leagues" to "authenticated";

grant update on table "public"."leagues" to "authenticated";

grant delete on table "public"."leagues" to "service_role";

grant insert on table "public"."leagues" to "service_role";

grant references on table "public"."leagues" to "service_role";

grant select on table "public"."leagues" to "service_role";

grant trigger on table "public"."leagues" to "service_role";

grant truncate on table "public"."leagues" to "service_role";

grant update on table "public"."leagues" to "service_role";

grant delete on table "public"."members" to "anon";

grant insert on table "public"."members" to "anon";

grant references on table "public"."members" to "anon";

grant select on table "public"."members" to "anon";

grant trigger on table "public"."members" to "anon";

grant truncate on table "public"."members" to "anon";

grant update on table "public"."members" to "anon";

grant delete on table "public"."members" to "authenticated";

grant insert on table "public"."members" to "authenticated";

grant references on table "public"."members" to "authenticated";

grant select on table "public"."members" to "authenticated";

grant trigger on table "public"."members" to "authenticated";

grant truncate on table "public"."members" to "authenticated";

grant update on table "public"."members" to "authenticated";

grant delete on table "public"."members" to "service_role";

grant insert on table "public"."members" to "service_role";

grant references on table "public"."members" to "service_role";

grant select on table "public"."members" to "service_role";

grant trigger on table "public"."members" to "service_role";

grant truncate on table "public"."members" to "service_role";

grant update on table "public"."members" to "service_role";

grant delete on table "public"."teams" to "anon";

grant insert on table "public"."teams" to "anon";

grant references on table "public"."teams" to "anon";

grant select on table "public"."teams" to "anon";

grant trigger on table "public"."teams" to "anon";

grant truncate on table "public"."teams" to "anon";

grant update on table "public"."teams" to "anon";

grant delete on table "public"."teams" to "authenticated";

grant insert on table "public"."teams" to "authenticated";

grant references on table "public"."teams" to "authenticated";

grant select on table "public"."teams" to "authenticated";

grant trigger on table "public"."teams" to "authenticated";

grant truncate on table "public"."teams" to "authenticated";

grant update on table "public"."teams" to "authenticated";

grant delete on table "public"."teams" to "service_role";

grant insert on table "public"."teams" to "service_role";

grant references on table "public"."teams" to "service_role";

grant select on table "public"."teams" to "service_role";

grant trigger on table "public"."teams" to "service_role";

grant truncate on table "public"."teams" to "service_role";

grant update on table "public"."teams" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "Enable read access for all users"
  on "public"."event_payments"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."event_players"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."event_registrations"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."events"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."leagues"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."members"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."teams"
  as permissive
  for select
  to public
using (true);



  create policy "Enable service role access"
  on "public"."users"
  as permissive
  for all
  to public
using ((auth.role() = 'service_role'::text));


CREATE TRIGGER sync_user_id_on_user_create AFTER INSERT OR UPDATE OF email ON public.users FOR EACH ROW EXECUTE FUNCTION public.sync_event_players_user_id();


