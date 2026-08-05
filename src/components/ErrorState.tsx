type ErrorStateProps = {
  message?: string
  title?: string
}

export function ErrorState({ message, title = 'Something went wrong' }: ErrorStateProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
      <h3 className="text-4xl font-serif tracking-tight font-medium text-neutral-900">{title}</h3>
      {message && <p className="mt-4 text-neutral-600">{message}</p>}
    </section>
  )
}
