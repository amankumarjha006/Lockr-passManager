Lockr – Password Manager

This is a personal password manager project built with Next.js and Supabase.
⚠️ Disclaimer: This is not a professional website and is only a project for learning and practice.

Features

Save and manage website credentials securely.

Encrypt passwords before storing them (server-side).

Account authentication with Supabase.

Protected routes – only signed-in users can access dashboard or delete account.

Delete account functionality with password verification.

Technologies Used

Next.js – React framework with App Router.

Tailwind CSS – Styling.

Supabase – Database & Authentication.

Lucide React – Icons.

React Toastify – Notifications.

JavaScript / TypeScript

Getting Started (Local Development)
# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev


Open http://localhost:3000
 to see the app in your browser.
Start editing pages in the app folder – hot reload updates automatically.

Environment Variables

Create a .env.local file in your project root:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key


NEXT_PUBLIC_* keys are safe for the frontend.

SUPABASE_SERVICE_ROLE_KEY must never be exposed to the client.

Deployment

The easiest way to deploy is using Vercel
:

Push your code to GitHub.

Import your repository in Vercel.

Add the environment variables in Vercel Project Settings → Environment Variables.

Click Deploy.

Attributions

Icons: Lucide

Notifications: React Toastify

Fonts: Google Fonts

Database/Auth: Supabase

License

This project is for educational purposes only. All rights reserved by Aman Kumar Jha.