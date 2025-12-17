# Payment-First Registration Flow - Implementation Changelog

**Date:** December 17, 2024
**Type:** Major Feature Update
**Status:** ✅ Completed

---

## Overview

Restructured the event registration flow to require payment **before** creating team registrations. Previously, registrations were created first and then marked as paid. This caused orphaned registration records when payments failed or were cancelled.

### Key Change

**Before:** Register Team → Create Registration → Pay → Mark Paid
**After:** Select Team → Pay → Create Registration (on payment success)

---

## Benefits

✅ **No orphaned registrations** - Registration only created after successful payment
✅ **Atomic transactions** - Registration + payment in single database operation
✅ **Better data integrity** - Paid status guaranteed at creation
✅ **Cleaner database** - No unpaid registration records cluttering the system

---

## Files Changed

### 1. **Database - Supabase RPC Function**

-   **New Function:** `register_team_on_payment`
-   **Location:** Add manually via Supabase UI
-   **Purpose:** Creates registration AND payment record atomically on webhook success

```sql
-- Calls register_team_for_event internally
-- Creates payment record
-- Marks registration as paid
-- Returns registration_id
```

### 2. **API Endpoints**

#### Created:

-   **`/app/api/get-latest-registration/route.ts`** (NEW)
    -   Fetches registration_id for event + team after webhook completes
    -   Used when registration_id not in success URL

#### Modified:

-   **`/app/api/payments/webhook/route.ts`**

    -   Changed from `on_after_payment_succeed` → `register_team_on_payment`
    -   Metadata now requires: `user_email`, `first_name`, `last_name` (instead of `registration_id`)
    -   Validates user info before processing

-   **`/app/api/payments/create-checkout/route.ts`**
    -   `registration_id` now **optional** (only for multi-team)
    -   Accepts `first_name`, `last_name` for new registrations
    -   Success URL includes `team_id` instead of `registration_id` for new registrations
    -   Dynamically builds metadata based on new vs existing registration

### 3. **Frontend Components**

#### **`app/dashboard/_hooks/useRegisterTeam.ts`**

-   ❌ **Removed:** Call to `/api/register-team`
-   ✅ **Added:** Direct payment checkout creation
-   Passes user details (`first_name`, `last_name`, `user_email`) to checkout
-   Simplified error handling - single try/catch for payment

#### **`app/dashboard/_components/table-section/register-column/register-team-button.tsx`**

-   Added payment required warning (amber background)
-   Shows event price in popup
-   Added "Team 2" checkbox
-   Changed button text: "Register Team" → "Register & Pay"
-   Updated "What happens next?" messaging

#### **`app/dashboard/_components/table-section/register-column/register-cell.tsx`**

-   Shows "Pending Payment" badge when `isRegistered && !isPaid`
-   Only allows multi-team registration after first payment completes
-   Updated logic to check payment status before showing "Registered"

#### **`app/dashboard/_components/table-section/payment-column/payment-cell.tsx`**

-   Removed "Pay Now" button
-   Only shows "Paid" (green) or "N/A" (gray)
-   Simplified to display-only cell

#### **`app/dashboard/_components/table-section/roster-column/roster-cell.tsx`**

-   Roster access **only after payment**
-   Shows "N/A" until `paymentStatus === true`

#### **`app/dashboard/_components/table-section/waiver-column/waiver-cell.tsx`**

-   Waiver access **only after payment**
-   Shows "N/A" until `paymentStatus === true`

#### **`app/dashboard/_components/table-section/events-table.tsx`**

-   Updated success handler to fetch `registration_id` if not in URL
-   Calls `/api/get-latest-registration` for new registrations
-   Shows registration ID toast after payment success
-   Includes copy-to-clipboard functionality

### 4. **TypeScript Types**

#### **`app/dashboard/types.ts`**

-   Updated `PaymentRequestData` interface:
    -   `registration_id` → **optional**
    -   Added: `user_email`, `first_name`, `last_name` (optional)

---

## Flow Diagram

### New Registration Flow

```
1. User clicks "Register & Pay"
   ↓
2. Frontend validates team selection + user info
   ↓
3. POST /api/payments/create-checkout
   - WITHOUT registration_id
   - WITH user details (first_name, last_name, user_email)
   ↓
4. Redirect to Stripe checkout
   ↓
5. User completes payment
   ↓
6. Stripe webhook → checkout.session.completed
   ↓
7. Call register_team_on_payment RPC
   ↓
8. RPC creates registration + payment record atomically
   ↓
9. Return to success URL: ?success=true&event_id={id}&team_id={id}
   ↓
10. Frontend fetches registration_id from API
   ↓
11. Show success toast with registration ID
   ↓
12. Refresh events data
```

### Multi-Team Registration Flow (Existing User)

```
1. User already paid for first team
   ↓
2. Click "Register" again → show registration form
   ↓
3. POST /api/payments/create-checkout
   - WITH existing registration_id (from first team)
   ↓
4. Same payment flow as above
   ↓
5. Webhook uses existing registration logic
```

---

## Testing Checklist

### Before Testing

1. ✅ Add `register_team_on_payment` function to Supabase
2. ✅ Restart dev server to load new code
3. ✅ Ensure Stripe test mode is active

### Test Cases

**Test 1: New Registration**

-   [ ] Click "Register" button
-   [ ] Verify payment warning shows with correct price
-   [ ] Select team from dropdown
-   [ ] Check "Team 2" checkbox (if applicable)
-   [ ] Click "Register & Pay"
-   [ ] Should redirect to Stripe (NO /api/register-team call)
-   [ ] Complete test payment
-   [ ] Return to dashboard
-   [ ] Verify success toast with registration ID
-   [ ] Click toast to copy registration ID
-   [ ] Verify "Copied!" confirmation
-   [ ] Verify Register cell shows "Registered" (green)
-   [ ] Verify Payment cell shows "Paid"
-   [ ] Verify Roster and Waiver are accessible

**Test 2: Payment Failure**

-   [ ] Start registration process
-   [ ] Cancel payment on Stripe page
-   [ ] Verify NO registration created in database
-   [ ] Verify user can try again

**Test 3: Multi-Team Registration**

-   [ ] Complete Test 1 first
-   [ ] Click "Register" again
-   [ ] Should allow second team registration (if event allows)
-   [ ] Verify payment includes first team's registration_id in metadata

**Test 4: Payment Pending State**

-   [ ] If webhook delayed, verify "Pending Payment" shows
-   [ ] After webhook completes, verify status updates to "Registered"

---

## Database Changes

### Supabase RPC Functions

#### New:

-   `register_team_on_payment` - Handles registration creation on payment success

#### Unchanged (still used):

-   `register_team_for_event` - Called internally by new RPC
-   `join_team_with_registration_id` - Still used for joining existing teams
-   `on_after_payment_succeed` - **DEPRECATED** (webhook no longer uses this)

---

## Breaking Changes

⚠️ **Webhook Metadata Change:**
Old metadata requirements:

```javascript
{
    event_id,
        registration_id, // Required
        team_id,
        user_email;
}
```

New metadata requirements:

```javascript
{
    event_id,
        team_id,
        user_email,
        first_name, // New
        last_name, // New
        registration_id; // Optional (only for multi-team)
}
```

⚠️ **Success URL Change:**

-   Old: `?success=true&event_id={id}&registration_id={id}`
-   New: `?success=true&event_id={id}&team_id={id}` (registration_id fetched via API)

---

## Rollback Plan

If issues arise, rollback in this order:

1. **Webhook:** Change `register_team_on_payment` back to `on_after_payment_succeed`
2. **Frontend:** Restore `/api/register-team` call in `useRegisterTeam.ts`
3. **Types:** Make `registration_id` required again in `PaymentRequestData`
4. **Cell Components:** Restore access based on `isRegistered` instead of `paymentStatus`

---

## Future Improvements

-   [ ] Add loading indicator while webhook processes
-   [ ] Implement polling for registration_id if webhook is slow
-   [ ] Add retry logic for failed webhook calls
-   [ ] Consider optimistic UI updates

---

## Notes

-   The old `/api/register-team` endpoint still exists but is no longer used
-   May be removed in future cleanup
-   `on_after_payment_succeed` RPC can be deprecated after successful deployment

---

**Implementation completed:** December 17, 2024
**Tested by:** [To be filled]
**Deployed to production:** [To be filled]
