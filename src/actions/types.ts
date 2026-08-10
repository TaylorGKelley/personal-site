export type FetchAction<T> = (options?: { draft?: boolean }) => Promise<{ data: T | null; error?: string }>
