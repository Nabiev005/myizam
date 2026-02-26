import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Иконкаларды импорттоо
import { Home, FolderOpen, FileText, Settings, Menu, X, Gavel } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Менюлардын тизмеси иконка компоненттери менен
  const menuItems = [
    { name: 'Башкы бет', path: '/', icon: <Home size={20} /> },
    { name: 'Менин документтерим', path: '/my-docs', icon: <FolderOpen size={20} /> },
    { name: 'Шаблондор', path: '/templates', icon: <FileText size={20} /> },
    { name: 'Жөндөөлөр', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {isMobile && (
        <div style={sidebarStyles.mobileHeader}>
          <div style={sidebarStyles.logoMobile}>
            <Gavel size={22} style={{ marginRight: '8px', color: '#3b82f6' }} /> 
            МыйзамДок
          </div>
          <button onClick={toggleSidebar} style={sidebarStyles.menuButton}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {isMobile && isOpen && <div onClick={toggleSidebar} style={sidebarStyles.overlay} />}

      <div style={{
        ...sidebarStyles.sidebar,
        left: isOpen ? '0' : '-280px',
        boxShadow: isOpen && isMobile ? '10px 0 30px rgba(0,0,0,0.1)' : 'none',
      }}>
        <div style={sidebarStyles.logo}>
          <Gavel size={32} style={{ marginBottom: '10px', color: '#3b82f6' }} />
          <div>МыйзамДок</div>
        </div>
        
        <nav style={sidebarStyles.nav}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => isMobile && setIsOpen(false)}
                style={{
                  ...(isActive ? sidebarStyles.navItemActive : sidebarStyles.navItem),
                  textDecoration: 'none'
                }}
              >
                <span style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={sidebarStyles.footer}>
          <div style={sidebarStyles.version}>v1.0.0</div>
          <p style={{fontSize: '10px', marginTop: '5px'}}>Кыргызстан 2026</p>
        </div>
      </div>
    </>
  );
};

const sidebarStyles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: '260px',
    background: '#fff',
    borderRight: '1px solid #e2e8f0',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    bottom: 0,
    zIndex: 1000,
    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  logo: { 
    fontSize: '24px', 
    fontWeight: '900', 
    color: '#1e293b', 
    marginBottom: '40px', 
    textAlign: 'center', 
    letterSpacing: '-1px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  nav: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  navItem: { 
    padding: '12px 15px', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    color: '#64748b', 
    fontSize: '15px', 
    transition: '0.2s ease',
    display: 'flex',
    alignItems: 'center'
  },
  navItemActive: { 
    padding: '12px 15px', 
    borderRadius: '12px', 
    background: '#3b82f6', 
    color: '#fff', 
    fontWeight: '600', 
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center'
  },
  mobileHeader: { 
    display: 'flex', 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: '64px', 
    background: '#fff', 
    borderBottom: '1px solid #e2e8f0', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 20px', 
    zIndex: 900 
  },
  menuButton: { 
    background: '#f1f5f9', 
    border: 'none', 
    width: '40px', 
    height: '40px', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#1e293b'
  },
  logoMobile: { 
    fontWeight: '800', 
    fontSize: '18px', 
    color: '#1e293b', 
    display: 'flex', 
    alignItems: 'center' 
  },
  overlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'rgba(15, 23, 42, 0.5)', 
    backdropFilter: 'blur(4px)', 
    zIndex: 950 
  },
  footer: { 
    borderTop: '1px solid #f1f5f9', 
    paddingTop: '20px', 
    color: '#94a3b8', 
    textAlign: 'center' 
  },
  version: { fontSize: '12px', fontWeight: 'bold' }
};

export default Sidebar;