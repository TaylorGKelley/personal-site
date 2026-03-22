---
title: Authentication service and Identity provider
preview_url: https://taylabs.taylorkelley.dev
github_url: https://github.com/TayLabs/Auth
---

# A Quick Overview

A lightweight, standalone authentication microservice designed to assist in managing user data and authentication (signup, login, and session data) to decouple this logic from the main application. It is there to serve as a central authentication server so that either multiple apps can look at the same data without having repeated logic.

This api was developed using the Node JS runtime with ExpressJS to manage API routing and middleware. Data is stored with a PostgreSQL database, coupled with a Redis store for quick session lookups. To keep things secure the Json Web Token (JWT) protocol is used for encoding session token pairs, while AES-256 encryption is used for securing sensitive data at rest and Argon2 for hashing/storing passwords.

The goal for coding this project was to provide a simple, easy to use solution to replace services such as Kinde, Clerk, or Auth0 while allowing it to be self-hostable to own your user's data. It was designed with a micro-service style architecture in mind, and supports api-key authentication to keep internal api calls secure, preventing any unauthorized calls between services.

# The Problem

Authentication can be the single, most important part of any software. It is the gateway to all user data, and if done incorrectly, it can be exploited for malicous purposes. 'Rolling your own' auth can be a great learning experience, but in actuality can lead to frustration and many hours spent researching and securing the system from XSS, CSRF, and many other forms of attacks. Secondly, with a growing environment, having a custom auth solution for each app can become a nightmare and lower the user experience across the different services.

# The Solution and Architecture
