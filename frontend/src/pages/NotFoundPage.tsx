import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="hero-kicker">404</span>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button button-primary" to="/">Return home</Link>
    </main>
  )
}
