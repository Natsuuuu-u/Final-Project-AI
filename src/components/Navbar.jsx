import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Browse', to: '/browse' },
  { label: 'Genres', to: '/genres' },
  { label: 'AI Assistant', to: '/ai' },
]

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner container">
        <NavLink to="/" className="brand">
          MovieMind
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
