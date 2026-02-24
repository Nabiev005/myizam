import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FileText, Calendar, Trash2, ArrowRight, Search, Plus, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SavedDoc {
  id: string;
  title: string;
  date: string;
  category?: string;
}

const MyDocs: React.FC = () => {
  const navigate = useNavigate();
  const [savedDocs, setSavedDocs] = useState<SavedDoc[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Экрандын өлчөмүн көзөмөлдөө
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Маалыматтарды жүктөө жана сорттоо
  useEffect(() => {
    const data = localStorage.getItem('my_documents');
    if (data) {
      const parsed: SavedDoc[] = JSON.parse(data);
      // Жаңыларын башына коюу (эгер ID убакыт менен берилсе)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedDocs(parsed.sort((a, b) => Number(b.id) - Number(a.id)));
    }
  }, []);

  const deleteDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Бул документти өчүрүүнү каалайсызбы?")) {
      const updatedDocs = savedDocs.filter(doc => doc.id !== id);
      setSavedDocs(updatedDocs);
      localStorage.setItem('my_documents', JSON.stringify(updatedDocs));
    }
  };

  // Издөө логикасы
  const filteredDocs = savedDocs.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMobile = windowWidth <= 1024;

  return (
    <div style={pageStyles.container}>
      <Sidebar />
      <div style={{
        ...pageStyles.content,
        marginLeft: isMobile ? '0' : '260px',
        padding: isMobile ? '20px' : '40px'
      }}>
        
        {/* Header Section */}
        <div style={{
          ...pageStyles.header,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          gap: '20px'
        }}>
          <div>
            <h2 style={pageStyles.title}>📂 Менин документтерим</h2>
            <p style={pageStyles.subtitle}>Түзүлгөн документтер: <strong>{savedDocs.length}</strong></p>
          </div>
          
          <div style={pageStyles.searchWrapper}>
            <Search size={18} style={pageStyles.searchIcon} />
            <input 
              type="text" 
              placeholder="Документтерди издөө..." 
              style={pageStyles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Section */}
        {savedDocs.length === 0 ? (
          <div style={pageStyles.emptyState}>
            <FolderOpen size={80} color="#e2e8f0" />
            <h3 style={{ marginTop: '20px', color: '#1e293b' }}>Азырынча бош</h3>
            <p style={{ color: '#64748b', maxWidth: '300px', margin: '10px auto' }}>
              Сиз али бир дагы документ түзө элексиз. Баштоо үчүн шаблонду тандаңыз.
            </p>
            <button onClick={() => navigate('/templates')} style={pageStyles.createBtn}>
              <Plus size={20} /> Жаңы түзүү
            </button>
          </div>
        ) : (
          <div style={{
            ...pageStyles.grid,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))'
          }}>
            {filteredDocs.map((doc) => (
              <div 
                key={doc.id} 
                style={pageStyles.card}
                onClick={() => navigate(`/create/${doc.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={pageStyles.cardIcon}>
                  <FileText color="#3b82f6" size={24} />
                </div>
                <div style={pageStyles.cardInfo}>
                  <h4 style={pageStyles.docTitle}>{doc.title}</h4>
                  <div style={pageStyles.docMeta}>
                    <Calendar size={14} /> <span>{doc.date}</span>
                    {doc.category && <span style={pageStyles.tag}>{doc.category}</span>}
                  </div>
                </div>
                <div style={pageStyles.actions}>
                  <button onClick={(e) => deleteDoc(doc.id, e)} style={pageStyles.deleteBtn}>
                    <Trash2 size={18} />
                  </button>
                  <ArrowRight size={18} color="#cbd5e1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f8fafc', minHeight: '100vh' },
  content: { flex: 1, transition: 'all 0.3s ease' },
  header: { marginBottom: '40px', display: 'flex', justifyContent: 'space-between' },
  title: { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subtitle: { color: '#64748b', marginTop: '5px', fontSize: '14px' },
  searchWrapper: { position: 'relative', width: '100%', maxWidth: '350px' },
  searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  searchInput: { 
    width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', 
    outline: 'none', background: '#fff', fontSize: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
  },
  grid: { display: 'grid', gap: '20px' },
  card: { 
    background: '#fff', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0', 
    display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
  },
  cardIcon: { 
    width: '50px', height: '50px', borderRadius: '15px', background: '#eff6ff', 
    display: 'flex', alignItems: 'center', justifyContent: 'center' 
  },
  cardInfo: { flex: 1 },
  docTitle: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  docMeta: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#94a3b8', marginTop: '8px' },
  tag: { background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', color: '#475569' },
  actions: { display: 'flex', alignItems: 'center', gap: '12px' },
  deleteBtn: { background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '8px', transition: '0.2s' },
  emptyState: { 
    textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '30px', 
    border: '2px dashed #e2e8f0', marginTop: '20px' 
  },
  createBtn: { 
    marginTop: '25px', background: '#3b82f6', color: '#fff', border: 'none', 
    padding: '12px 28px', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
  }
};

export default MyDocs;