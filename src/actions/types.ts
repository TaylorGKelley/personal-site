export type FetchAction<T> = () => Promise<{ data: T | null; error?: string }>
