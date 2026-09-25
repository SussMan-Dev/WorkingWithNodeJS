import type { ReactNode } from 'react'
import { Brand } from './Brand'

type AuthShellProps = {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="auth-page">
      <div className="auth-wrap">
        <div className="auth-brand"><Brand /></div>
        <section className="auth-card">{children}</section>
      </div>
    </main>
  )
}
