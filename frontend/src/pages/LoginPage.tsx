import { useMutation } from '@tanstack/react-query'
import { type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { api } from '../api'
import { AuthShell } from '../components/AuthShell'
import { Feedback } from '../components/Feedback'

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const login = useMutation({
    mutationFn: api.login,
    onSuccess: () => navigate('/dashboard', { replace: true }),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    login.mutate({
      username: String(formData.get('username') ?? '').trim(),
      password: String(formData.get('password') ?? ''),
    })
  }

  return (
    <AuthShell>
      <h1 className="auth-title">Sign in</h1>
      <p className="auth-subtitle">Use your username and password to continue.</p>

      <Feedback
        message={searchParams.has('registered') ? 'Account created. You can sign in now.' : null}
        tone="success"
      />
      <Feedback message={login.error instanceof Error ? login.error.message : null} />

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            autoComplete="username"
            autoFocus
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            type="text"
          />
        </div>

        <div className="field field-spaced">
          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </div>

        <button className="button button-primary button-block" disabled={login.isPending} type="submit">
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="auth-footer">
        New here? <Link to="/auth/register">Create an account</Link>
      </p>
    </AuthShell>
  )
}
