import type { PayloadRequest } from 'payload'

export const allAuthenticatedUsers = ({ req: { user } }: { req: PayloadRequest }) => {
  if (!user) return false
  if (user.role?.some((r) => r === 'admin')) return true

  // Normal users can only access records they created
  return {
    user: {
      equals: user.id,
    },
  }
}
