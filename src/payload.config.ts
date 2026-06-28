import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomePage } from './globals/HomePage'
import { Files } from './collections/Files'
import { Projects } from './collections/Projects'
import { Frameworks } from './collections/Frameworks'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { PostsPage } from './globals/PostsPage'
import { ContactPage } from './globals/ContactPage'
import { ProjectsPage } from './globals/ProjectsPage'

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
  globals: [HomePage, ContactPage, PostsPage, ProjectsPage],
  editor: lexicalEditor(),
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
  plugins: [],
})
