# Getting Started

## Prerequisites

-   Node.js and yarn/bun installed
-   Accounts and API keys for:
    -   Supabase
    -   Stripe (if using payments)
    -   Clerk (if using authentication)

## Setup

1. Clone the repository:

    ```
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies and start project:
   ```
   npm install
   npm run build
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to see your application running.

## Additional Configuration

-   Webhooks: Set up webhooks for Clerk (if using auth) at `/api/auth/webhook` and for Stripe (if using payments) at `/api/payments/webhook`.
-   Customize the landing page, dashboard, and other components as needed.
-   Modify the Prisma schema in `prisma/schema.prisma` if you need to change the database structure.

## Important Security Notes

-   Enable Row Level Security (RLS) in your Supabase project to ensure data protection at the database level.
-   Always make Supabase calls on the server-side (in API routes or server components) to keep your service key secure.

## Learn More

Refer to the documentation of the individual technologies used in this project for more detailed information:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [Supabase Documentation](https://supabase.io/docs)
-   [Prisma Documentation](https://www.prisma.io/docs)
-   [Clerk Documentation](https://clerk.dev/docs) (if using auth)
-   [Stripe Documentation](https://stripe.com/docs) (if using payments)
