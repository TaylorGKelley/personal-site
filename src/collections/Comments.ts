import { allAuthenticatedUsers } from '@/access/allAuthenticatedUsers'
import { authenticated } from '@/access/authenticated'
import type { CollectionConfig, RelationshipFieldValidation } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'content',
    defaultColumns: ['content', 'post', 'parent'],
  },
  access: {
    read: () => true,
    // Restrict creation to logged-in users or admins using your Better Auth setup
    create: allAuthenticatedUsers,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts', // Assumes your posts collection slug is 'posts'
      required: true,
      index: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    // 1. The Parent Field: This establishes the self-referencing hierarchy
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'comments',
      required: false,
      index: true,
      admin: {
        description: 'Leave blank if this is a top-level comment.',
      },
      validate: (async (value, { req }) => {
        if (!value) return true

        try {
          // Extract the payload local API instance from the request object
          const { payload } = req
          const parentId = Array.isArray(value) ? value[0] : value

          if (!parentId) return true

          const parentComment = await payload.findByID({
            collection: 'comments',
            id: parentId as string,
          })

          if (parentComment && parentComment.parent) {
            return 'Replies can only be 1 level deep. You cannot reply to an existing reply.'
          }

          return true
        } catch (error) {
          return 'The specified parent comment does not exist.'
        }
      }) as RelationshipFieldValidation,
    },
    // 2. The Replies Field: A virtual join field to easily pull replies down to the client
    {
      name: 'replies',
      type: 'join',
      collection: 'comments',
      on: 'parent',
      admin: {
        description: 'Replies attached to this comment.',
      },
    },
  ],
}
