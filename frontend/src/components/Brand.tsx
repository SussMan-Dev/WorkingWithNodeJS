import { Link } from 'react-router'

type BrandProps = {
  to?: string
}

export function Brand({ to = '/' }: BrandProps) {
  return (
    <Link className="brand" to={to}>
      <span className="brand-mark" aria-hidden="true">U</span>
      <span>UserHub</span>
    </Link>
  )
}
