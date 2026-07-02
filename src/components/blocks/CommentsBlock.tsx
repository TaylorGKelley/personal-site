type CommentsBlockProps = {
  comments: Comment
}

export default function CommentsBlock({ comments }: CommentsBlockProps) {
  return (
    <section>
      <div>{/*title*/}</div>
      <article>{/*comment contents*/}</article>
    </section>
  )
}
