import { postgresAdapter } from '@payloadcms/db-postgres'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp, { Sharp } from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { payloadIconPicker } from 'payload-icon-picker'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomePage } from './globals/HomePage'
import { Files } from './collections/Files'
import { Projects } from './collections/Projects'
import { Frameworks } from './collections/Frameworks'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { PostsPage } from './globals/PostsPage'
import { AboutPage } from './globals/AboutPage'
import { Header } from './globals/shared/Header'
import { Footer } from './globals/shared/Footer'
import { CodeBlock } from './blocks/utils/CodeBlock'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Files, Projects, Frameworks, Posts, Categories],
  globals: [Header, Footer, HomePage, AboutPage, PostsPage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [CodeBlock],
      })]
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${process.env.SUPABASE_BUCKET_NAME}/${filename}`
          },
        },
      },
      bucket: process.env.SUPABASE_BUCKET_NAME || '',
      config: {
        endpoint: `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/storage/v1/s3`,
        region: process.env.SUPABASE_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
    payloadIconPicker({
      iconPackProviderPath: './lib/lucide/components/IconPackProvider#IconPackProvider',
    }),
  ],
})
