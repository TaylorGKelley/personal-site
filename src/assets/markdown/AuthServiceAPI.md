## Why

The goal of this project is to create a flexible yet opinionated open-source REST Api that can be used in place of services like Kinde, Auth0, or Supabase. It will allow the creator of a software product to self host their auth service, owning all of their users data, all for free.

## What

This service provides a few basic functions including, but not limited too, the following:

- Login/signup and basic authentication routes
- Session tracking to know which device sessions are active for a users account
- TOTP 2-factor authentication (compatible with most authenticator apps)
- Email verification after signup
- Ability to force password reset and/or logout of all devices for users
- Basic profile information and profile photos (coming soon)

## Where

This service includes running alongside a few other 'micro-services' under the TayLabs suite, including Mail, Keys (api-key auth), and Media. This allows for separation of concerns so that the Auth service is only responsible for Authentication and nothing more, giving more flexibility and increasing maintainability.

It is for use within a self-hosted, or externally hosted environment. Whilest some features are still in development, the service is actively functional and can easily be deployed via a docker-compose container.
