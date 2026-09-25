import { Link } from 'react-router'
import { PageHeader } from '../components/PageHeader'

const areas = [
  { to: '/users', title: 'Users', copy: 'Create, search, edit, and remove user accounts.', meta: 'Account directory' },
  { to: '/roles', title: 'Roles', copy: 'Review and maintain application roles.', meta: 'Access control' },
  { to: '/products', title: 'Products', copy: 'Browse inventory, prices, and stock levels.', meta: 'Catalogue' },
]

export function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        subtitle="Choose an area to view and maintain its records."
        title="Manage the system"
      />

      <div className="dashboard-grid">
        {areas.map((area) => (
          <Link className="content-card dashboard-card" key={area.to} to={area.to}>
            <span className="card-meta">{area.meta}</span>
            <h2>{area.title}</h2>
            <p>{area.copy}</p>
            <span className="card-link">Open {area.title.toLowerCase()} →</span>
          </Link>
        ))}
      </div>
    </>
  )
}
