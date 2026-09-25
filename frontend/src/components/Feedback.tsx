type FeedbackProps = {
  message: string | null
  tone?: 'danger' | 'success'
}

export function Feedback({ message, tone = 'danger' }: FeedbackProps) {
  if (!message) return null

  return (
    <div className={`alert alert-${tone}`} role="alert" aria-live="polite">
      {message}
    </div>
  )
}
