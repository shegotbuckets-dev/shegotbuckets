# Development Rules

## Exporting

-   Use `export default` for page components
-   Use `export const` for everything else (components, hooks, utilities)

## Importing

Use `@` imports for:

-   Deep imports across different directories
-   Shared components/utilities
-   When the path would require multiple `../`

Use `./` imports for:

-   Files in the same directory
-   Closely related components
-   Direct parent/child relationships

# Getting Started

## Commit to this Project

This project uses Husky and lint-staged to format and lint staged files on commit.
Here is an example of how to commit:

```
git add .
git commit -m "feat: add new feature"
```

The commit message type must be one of the following:

```
[
    "feat", // New feature
    "fix", // Bug fix
    "docs", // Documentation
    "style", // Formatting, missing semi colons, etc
    "refactor", // Code change that neither fixes a bug or adds a feature
    "perf", // Performance improvements
    "test", // Adding tests
    "chore", // Maintain
    "revert", // Revert changes
    "wip", // Work in progress
],
```

## Prerequisites

-   Node.js and npminstalled
-   Accounts and API keys for:
    -   Supabase
    -   Clerk
    -   Stripe (if using payments)

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

3. Open your browser and navigate to `http://localhost:3000` to see your application running.

## Additional Configuration

-   Webhooks: Set up webhooks for Clerk (if using auth) at `/api/auth/webhook` and for Stripe (if using payments) at `/api/payments/webhook`.
-   Customize the landing page, dashboard, and other components as needed.

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
-   Good luck
