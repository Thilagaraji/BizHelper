import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import './Layout.css';

export default function Layout({ children, currentPage, onPageChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Service Requests', icon: FileText },
  ];

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <motion.div
          className="header-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo-section">
            <h1 className="logo">BizHelper Pro</h1>
            <span className="tagline">Client Portal</span>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </header>

      {/* Navigation */}
      <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <motion.div
          className="nav-content"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="nav-items">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <motion.button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="nav-footer">
            <button className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="nav-item logout">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 BizHelper Pro. All rights reserved. Built with React + Framer Motion</p>
      </footer>
    </div>
  );
}
