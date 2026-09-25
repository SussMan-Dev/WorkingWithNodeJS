import { Link, NavLink, Outlet } from 'react-router'
import { Brand } from './Brand'

const navigation = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/roles', label: 'Roles' },
  { to: '/products', label: 'Products' },
]

export function AdminLayout() {
  return (
    <>
      <header className="app-navbar">
        <div className="container navbar-inner">
          <Brand to="/dashboard" />
          <Link className="button button-quiet button-small" to="/">Public home</Link>
        </div>
      </header>

      <main className="container page-shell admin-grid">
        <aside className="admin-sidebar" aria-label="Admin navigation">
          <p className="admin-sidebar-title">Management</p>
          <nav className="admin-nav">
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </>
  )
}
