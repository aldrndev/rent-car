# Supabase Migrations

## How to Apply

Run these SQL files **in order** in your Supabase SQL Editor:

1. **[001_create_tables.sql](./migrations/001_create_tables.sql)** — Creates all 6 tables, indexes, triggers
2. **[002_rls_policies.sql](./migrations/002_rls_policies.sql)** — RLS policies, guest tracking RPC, storage bucket
3. **[003_seed_data.sql](./migrations/003_seed_data.sql)** — Seed data (15 vehicles + 4 promo codes)

### Steps

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project → **SQL Editor**
3. Paste and run each file in order (001 → 002 → 003)

### What Gets Created

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (extends auth.users) |
| `vehicles` | Cars & motorcycles for rent |
| `bookings` | Rental bookings (member + guest) |
| `payments` | Midtrans payment records |
| `promos` | Discount voucher codes |
| `chat_messages` | AI chatbot history |

### Auto-Created

- **Profile trigger**: Auto-creates a profile when a new user signs up
- **Updated_at trigger**: Auto-updates `updated_at` on row changes
- **Order ID generator**: `generate_order_id()` function for booking order IDs
- **Storage bucket**: `vehicle-images` for upload

### Admin Setup

After running migrations, manually update a user's role to `admin`:

```sql
UPDATE public.profiles SET role = 'admin' WHERE id = '<your-user-uuid>';
```
