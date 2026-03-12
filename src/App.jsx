import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import Home from './pages/HomePage';
import GlobalComparisonPage from './pages/GlobalComparisonPage';
import ClimateChangePage from './pages/ClimateChangePage';
import './App.css';

const navItems = [
  { to: '/', label: 'Forecast Studio', end: true },
  { to: '/global-comparison', label: 'City Compare' },
  { to: '/climate-change', label: 'Climate Lens' },
];

const AppShellContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <div className="app-background app-background-one"></div>
      <div className="app-background app-background-two"></div>
      <div className="app-background app-background-three"></div>

      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="brand-link">
            <span className="brand-mark">W</span>
            <span className="brand-copy">
              <strong>WeatherWise</strong>
              <span>Live weather and air quality</span>
            </span>
          </Link>

          <button
            type="button"
            className={menuOpen ? 'menu-toggle menu-toggle-open' : 'menu-toggle'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav
            id="primary-navigation"
            className={menuOpen ? 'app-nav app-nav-open' : 'app-nav'}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/global-comparison" element={<GlobalComparisonPage />} />
          <Route path="/climate-change" element={<ClimateChangePage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppShellContent />
    </Router>
  );
};

export default App;
