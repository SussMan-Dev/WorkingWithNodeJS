import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: string
  subtitle: string
  action?: ReactNode
}

export function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {action ? <div className="page-action">{action}</div> : null}
    </header>
  )
}
