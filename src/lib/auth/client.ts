import { createAuthClient } from 'better-auth/react'
import { adminClient, magicLinkClient, emailOTPClient } from 'better-auth/client/plugins'
import { nextCookies } from 'better-auth/next-js'

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  plugins: [adminClient(), nextCookies(), magicLinkClient(), emailOTPClient()],
})

export const { signUp, signIn, signOut, useSession } = authClient

export type Session = typeof authClient.$Infer.Session

authClient.$store.listen('$sessionSignal', async () => {})
