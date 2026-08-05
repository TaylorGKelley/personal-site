export type FetchAction<T> = (options?: { preview?: string }) => Promise<{ data: T | null; error?: string }>
