import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { documentTypes } from '../data/docsData';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutGrid, ChevronRight } from 'lucide-react';

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Баары');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Категориялардын тизмесин алуу
  const categories = ['Баары', ...Array.from(new Set(documentTypes.map(d => d.category)))];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Издөө жана чыпкалоо логикасы
  const filteredTemplates = documentTypes.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Баары' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isMobile = windowWidth <= 1024;

  return (
    <div style={pageStyles.container}>
      <Sidebar />
      <div style={{
        ...pageStyles.content,
        marginLeft: isMobile ? '0' : '260px',
        padding: isMobile ? '20px' : '40px'
      }}>
        
        {/* Header */}
        <div style={pageStyles.header}>
          <div>
            <h2 style={pageStyles.title}>📜 Бардык шаблондор</h2>
            <p style={pageStyles.subtitle}>Керектүү документтин түрүн тандап, толтуруп баштаңыз.</p>
          </div>
          
          <div style={pageStyles.searchBox}>
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Шаблон издөө..." 
              style={pageStyles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div style={pageStyles.categoryBar}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...pageStyles.categoryBtn,
                background: activeCategory === cat ? '#3b82f6' : '#fff',
                color: activeCategory === cat ? '#fff' : '#64748b',
                border: activeCategory === cat ? '1px solid #3b82f6' : '1px solid #e2e8f0',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Section */}
        {filteredTemplates.length > 0 ? (
          <div style={{
            ...pageStyles.grid,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))'
          }}>
            {filteredTemplates.map((doc) => (
              <div 
                key={doc.id} 
                style={pageStyles.card} 
                onClick={() => navigate(`/create/${doc.id}`)}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{...pageStyles.cardIcon, background: doc.color + '15', color: doc.color}}>
                  {doc.icon}
                </div>
                <div style={pageStyles.cardInfo}>
                  <h4 style={pageStyles.docTitle}>{doc.title}</h4>
                  <p style={pageStyles.docCategory}>{doc.category}</p>
                </div>
                <ChevronRight size={20} color="#cbd5e1" />
              </div>
            ))}
          </div>
        ) : (
          <div style={pageStyles.emptyState}>
            <LayoutGrid size={48} color="#cbd5e1" />
            <p>Мындай шаблон табылган жок.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f8fafc', minHeight: '100vh' },
  content: { flex: 1, transition: 'all 0.3s ease' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subtitle: { color: '#64748b', marginTop: '5px', fontSize: '14px' },
  searchBox: { display: 'flex', alignItems: 'center', background: '#fff', padding: '10px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '300px' },
  searchInput: { border: 'none', outline: 'none', marginLeft: '10px', fontSize: '14px', width: '100%' },
  categoryBar: { display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '5px' },
  categoryBtn: { padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: '0.2s', whiteSpace: 'nowrap' },
  grid: { display: 'grid', gap: '20px' },
  card: { 
    background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', 
    display: 'flex', alignItems: 'center', gap: '18px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
  },
  cardIcon: { width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
  cardInfo: { flex: 1 },
  docTitle: { margin: 0, color: '#1e293b', fontSize: '16px', fontWeight: '700' },
  docCategory: { margin: '4px 0 0', fontSize: '12px', color: '#94a3b8', fontWeight: '500' },
  emptyState: { textAlign: 'center', padding: '60px', color: '#94a3b8' }
};

export default Templates;