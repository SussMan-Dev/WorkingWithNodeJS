import { useMutation } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { api } from '../api'
import { AuthShell } from '../components/AuthShell'
import { Feedback } from '../components/Feedback'
import type { UserInput } from '../types'

export function RegisterPage() {
  const navigate = useNavigate()
  const [clientError, setClientError] = useState<string | null>(null)
  const register = useMutation({
    mutationFn: api.register,
    onSuccess: () => navigate('/auth/login?registered=1', { replace: true }),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setClientError(null)
    const formData = new FormData(event.currentTarget)
    const input: UserInput = {
      username: String(formData.get('username') ?? '').trim(),
      dateOfBirth: String(formData.get('dateOfBirth') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    }

    if (input.password !== input.confirmPassword) {
      setClientError('Password and confirmation must match.')
      return
    }

    register.mutate(input)
  }

  return (
    <AuthShell>
      <h1 className="auth-title">Create an account</h1>
      <p className="auth-subtitle">Add a few details to set up your profile.</p>
      <Feedback message={clientError ?? (register.error instanceof Error ? register.error.message : null)} />

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field field-wide">
            <label htmlFor="username">Username</label>
            <input autoComplete="username" autoFocus id="username" name="username" required type="text" />
          </div>
          <div className="field">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input id="dateOfBirth" name="dateOfBirth" required type="date" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input autoComplete="new-password" id="password" name="password" required type="password" />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input autoComplete="new-password" id="confirmPassword" name="confirmPassword" required type="password" />
          </div>
        </div>

        <button className="button button-primary button-block form-submit" disabled={register.isPending} type="submit">
          {register.isPending ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/auth/login">Sign in</Link>
      </p>
    </AuthShell>
  )
}
