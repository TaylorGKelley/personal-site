import type { PayloadRequest } from 'payload'

export const authenticated = async ({ req: { user } }: { req: PayloadRequest }) => {
  return Boolean(user);
}
