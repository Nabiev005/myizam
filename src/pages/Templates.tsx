import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { documentTypes } from '../data/docsData';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutGrid, ChevronRight, } from 'lucide-react';

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Баары');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const categories = ['Баары', ...Array.from(new Set(documentTypes.map(d => d.category)))];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredTemplates = documentTypes.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Баары' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isMobile = windowWidth <= 1024;

  return (
    <div style={pageStyles.container}>
      <div className="no-print">
        <Sidebar />
      </div>
      
      <div style={{
        ...pageStyles.content,
        marginLeft: isMobile ? '0' : '260px',
        padding: isMobile ? '16px' : '40px',
        paddingTop: isMobile ? '80px' : '40px' // Мобилдик шапка үчүн боштук
      }}>
        
        {/* Header Section */}
        <div style={{
          ...pageStyles.header,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}>
          <div style={{ width: '100%' }}>
            <h2 style={{
              ...pageStyles.title,
              fontSize: isMobile ? '24px' : '28px'
            }}>📜 Шаблондор</h2>
            <p style={pageStyles.subtitle}>Керектүү документти тандаңыз</p>
          </div>
          
          {/* Search Box - Мобилдикте толук туурасы */}
          <div style={{
            ...pageStyles.searchBox,
            maxWidth: isMobile ? '100%' : '300px',
            marginTop: isMobile ? '10px' : '0'
          }}>
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Издөө..." 
              style={pageStyles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Bar - Скролл боло тургандай жасалды */}
        <div style={pageStyles.categoryWrapper}>
          <div style={pageStyles.categoryBar}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...pageStyles.categoryBtn,
                  background: activeCategory === cat ? '#3b82f6' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#64748b',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                  border: activeCategory === cat ? '1px solid #3b82f6' : '1px solid #e2e8f0',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        {filteredTemplates.length > 0 ? (
          <div style={{
            ...pageStyles.grid,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: isMobile ? '12px' : '20px'
          }}>
            {filteredTemplates.map((doc) => (
              <div 
                key={doc.id} 
                style={{
                  ...pageStyles.card,
                  padding: isMobile ? '16px' : '24px'
                }} 
                onClick={() => navigate(`/create/${doc.id}`)}
              >
                <div style={{
                  ...pageStyles.cardIcon, 
                  width: isMobile ? '46px' : '54px',
                  height: isMobile ? '46px' : '54px',
                  background: doc.color + '15', 
                  color: doc.color,
                  fontSize: isMobile ? '20px' : '24px'
                }}>
                  {doc.icon}
                </div>
                <div style={pageStyles.cardInfo}>
                  <h4 style={{
                    ...pageStyles.docTitle,
                    fontSize: isMobile ? '15px' : '16px'
                  }}>{doc.title}</h4>
                  <p style={pageStyles.docCategory}>{doc.category}</p>
                </div>
                <ChevronRight size={18} color="#cbd5e1" />
              </div>
            ))}
          </div>
        ) : (
          <div style={pageStyles.emptyState}>
            <LayoutGrid size={48} color="#cbd5e1" strokeWidth={1.5} />
            <p style={{marginTop: '15px'}}>Тилекке каршы, эч нерсе табылган жок.</p>
          </div>
        )}
      </div>

      <style>{`
        /* Скроллду жашыруу бирок иштетүү */
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const pageStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f8fafc', minHeight: '100vh' },
  content: { flex: 1, transition: 'all 0.3s ease' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px', gap: '15px' },
  title: { fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' },
  subtitle: { color: '#64748b', marginTop: '4px', fontSize: '14px' },
  searchBox: { 
    display: 'flex', alignItems: 'center', background: '#fff', 
    padding: '12px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', 
    width: '100%', transition: 'all 0.2s' 
  },
  searchInput: { border: 'none', outline: 'none', marginLeft: '10px', fontSize: '15px', width: '100%', background: 'transparent' },
  
  categoryWrapper: {
    margin: '0 -16px 25px -16px', // Мобилдикте экрандын четтерине тийүү үчүн
    padding: '0 16px',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch'
  },
  categoryBar: { 
    display: 'flex', 
    gap: '10px', 
    paddingBottom: '5px',
    width: 'max-content' // Баскычтар кысылбашы үчүн
  },
  categoryBtn: { 
    padding: '10px 18px', borderRadius: '12px', fontSize: '14px', 
    fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', 
    whiteSpace: 'nowrap' 
  },
  
  grid: { display: 'grid' },
  card: { 
    background: '#fff', borderRadius: '18px', border: '1px solid #e2e8f0', 
    display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', 
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  },
  cardIcon: { borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardInfo: { flex: 1, minWidth: 0 }, // minWidth текст ашып кетпеши үчүн керек
  docTitle: { margin: 0, color: '#1e293b', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  docCategory: { margin: '2px 0 0', fontSize: '12px', color: '#94a3b8', fontWeight: '500' },
  emptyState: { textAlign: 'center', padding: '80px 20px', color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center' }
};

export default Templates;