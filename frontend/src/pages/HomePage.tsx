import { Link } from 'react-router'
import { Brand } from '../components/Brand'

export function HomePage() {
  return (
    <>
      <header className="app-navbar">
        <div className="container navbar-inner">
          <Brand />
          <div className="nav-actions">
            <Link className="button button-quiet button-small" to="/auth/login">Sign in</Link>
            <Link className="button button-primary button-small" to="/auth/register">Create account</Link>
          </div>
        </div>
      </header>

      <main className="basic-home">
        <section className="container basic-hero">
          <span className="hero-kicker">USERHUB</span>
          <h1 className="hero-title">Manage users without the clutter.</h1>
          <p className="hero-copy">
            A straightforward place to create an account, sign in, and keep user information organised.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/auth/register">Create account</Link>
            <Link className="button button-quiet" to="/auth/login">Sign in</Link>
            <Link className="button button-text" to="/dashboard">Open dashboard</Link>
          </div>
        </section>
      </main>
    </>
  )
}
