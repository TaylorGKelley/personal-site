import type { PayloadRequest } from 'payload'

export const authenticated = async ({ req: { user } }: { req: PayloadRequest }) => {
  return user?.role?.some((r) => r === 'admin') || false
}
