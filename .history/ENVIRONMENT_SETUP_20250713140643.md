# Environment Variables Setup Guide

This guide explains how to set up environment variables for the Personal Growth Next.js Firebase project.

## Quick Start

1. Copy the `env.example` file to `.env.local`:

   ```bash
   cp env.example .env.local
   ```

2. Fill in your actual values in `.env.local`

3. Never commit `.env.local` to version control (it's already in `.gitignore`)

## Environment Variables Overview

### Firebase Configuration

All Firebase variables are prefixed with `NEXT_PUBLIC_` because they need to be accessible on the client side.

| Variable                                   | Description                       | Example                        |
| ------------------------------------------ | --------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API key                  | `AIzaSyC...`                   |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain              | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID               | `your-project-id`              |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket           | `your-project.appspot.com`     |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID      | `123456789`                    |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID                   | `1:123456789:web:abc123`       |
| `NEXT_PUBLIC_FIREBASE_MEASURMENT_ID`       | Firebase analytics measurement ID | `G-XXXXXXXXXX`                 |

### Stripe Configuration

Stripe variables are used for payment processing.

| Variable                | Description                                   | Example       |
| ----------------------- | --------------------------------------------- | ------------- |
| `STRIPE_SECRET`         | Stripe secret key (server-side only)          | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret for subscription events | `whsec_...`   |

### OpenAI Configuration

OpenAI is used for AI-powered test analysis.

| Variable         | Description    | Example  |
| ---------------- | -------------- | -------- |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |

### Site URLs

URLs used throughout the application.

| Variable               | Description                  | Example                   |
| ---------------------- | ---------------------------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Base URL for the application | `https://your-domain.com` |
| `NEXT_PUBLIC_URL`      | Alternative URL variable     | `https://your-domain.com` |

## How to Get These Values

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click on the web app (</>) icon
6. Copy the configuration values

### Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers > API keys
3. Copy the "Secret key" (starts with `sk_test_` for test mode)

### OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API keys
3. Create a new API key
4. Copy the key (starts with `sk-`)

## Environment File Structure

```
.env.local          # Local development (not committed)
.env.example        # Template file (committed)
.env.production     # Production environment (not committed)
.env.development    # Development environment (not committed)
```

## Next.js Environment Variables Best Practices

### Client-Side Variables

Variables that need to be accessible in the browser must be prefixed with `NEXT_PUBLIC_`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
```

### Server-Side Variables

Variables that should only be accessible on the server (API routes, server components):

```env
STRIPE_SECRET=your_secret_here
OPENAI_API_KEY=your_key_here
```

## Security Notes

1. **Never commit sensitive keys**: The `.gitignore` file already excludes `.env*` files
2. **Use different keys for development and production**: Create separate Firebase projects if needed
3. **Rotate keys regularly**: Especially for production environments
4. **Use environment-specific files**: `.env.local` for local development, `.env.production` for production

## Troubleshooting

### Common Issues

1. **"process.env is undefined"**: Make sure you're using `NEXT_PUBLIC_` prefix for client-side variables
2. **"API key not found"**: Check that your `.env.local` file exists and has the correct variable names
3. **"Firebase not initialized"**: Verify all Firebase environment variables are set correctly

### Debugging Environment Variables

Add this to a component to debug your environment variables:

```javascript
console.log("Environment variables:", {
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  // Add other variables as needed
});
```

## Deployment

### Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each environment variable from your `.env.local` file
4. Deploy your application

### Other Platforms

Most hosting platforms have similar environment variable configuration in their dashboard settings.

## File Locations

- **Firebase config**: `firebase/index.js`
- **Stripe integration**: `app/api/stripe/checkout/route.ts` and `app/api/stripe/orders/route.ts`
- **OpenAI integration**: `app/api/test/route.ts`
- **Site URL usage**: `lib/createCheckout.ts`, `app/checkout/[id]/page.tsx`, `components/Products/Test.tsx`
