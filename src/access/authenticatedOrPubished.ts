import type { Access } from 'payload';

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) { // authenticated
    return true
  }

  return { // published
    _status: {
      equals: 'published',
    },
  }
}
