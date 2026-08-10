// import 'server-only'
import { revalidatePath } from 'next/cache'

export const revalidatePost = (slug?: string) => {
  revalidatePath('/')
  revalidatePath('/posts')
  if (slug) revalidatePath(`/posts/${slug}`)
}

export const revalidateProject = (slug?: string) => {
  revalidatePath('/')
  if (slug) revalidatePath(`/projects/${slug}`)
}

export const revalidateGlobal = (path: string) => {
  revalidatePath(path)
}

export const revalidateLayout = () => {
  revalidatePath('/', 'layout')
}
