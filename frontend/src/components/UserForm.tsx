import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import type { UserInput } from '../types'
import { Feedback } from './Feedback'

type UserFormProps = {
  initialValues?: Pick<UserInput, 'username' | 'dateOfBirth'>
  error: string | null
  isSubmitting: boolean
  mode: 'create' | 'edit'
  onSubmit: (input: UserInput) => void
}

export function UserForm({
  initialValues,
  error,
  isSubmitting,
  mode,
  onSubmit,
}: UserFormProps) {
  const [clientError, setClientError] = useState<string | null>(null)

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

    onSubmit(input)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Feedback message={clientError ?? error} />

      <div className="form-grid">
        <div className="field field-wide">
          <label htmlFor="username">Username</label>
          <input
            autoComplete="username"
            autoFocus
            defaultValue={initialValues?.username ?? ''}
            id="username"
            name="username"
            placeholder="Enter a username"
            required
            type="text"
          />
        </div>

        <div className="field">
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            defaultValue={initialValues?.dateOfBirth ?? ''}
            id="dateOfBirth"
            name="dateOfBirth"
            required
            type="date"
          />
        </div>

        <div className="field">
          <label htmlFor="password">{mode === 'edit' ? 'New password' : 'Password'}</label>
          <input
            autoComplete="new-password"
            id="password"
            name="password"
            placeholder={mode === 'edit' ? 'Enter a new password' : 'Create a password'}
            required
            type="password"
          />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">
            {mode === 'edit' ? 'Confirm new password' : 'Confirm password'}
          </label>
          <input
            autoComplete="new-password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter the password again"
            required
            type="password"
          />
        </div>
      </div>

      <p className="form-hint">
        {mode === 'edit'
          ? "Saving will replace the user's current password."
          : 'Make sure both password fields contain the same value.'}
      </p>

      <div className="form-actions">
        <Link className="button button-quiet" to="/users">Cancel</Link>
        <button className="button button-primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Create user'}
        </button>
      </div>
    </form>
  )
}
