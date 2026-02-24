import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { documentTypes } from '../data/docsData';
import { useNavigate } from 'react-router-dom';
// Реалдуу иконкаларды импорттоо
import { 
  Search, 
  Bell, 
  User, 
  X, 
  ArrowRight, 
  MoreVertical, 
  Info,
  Scale,
  SearchX
} from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const filteredDocs = documentTypes.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMobile = windowWidth <= 1024;
  const contentStyle = {
    ...styles.content,
    marginLeft: isMobile ? '0' : '260px',
    marginTop: isMobile ? '64px' : '0',
    opacity: isLoaded ? 1 : 0,
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      
      <div style={contentStyle}>
        {/* Top Header */}
        <div style={styles.topHeader}>
          <div style={styles.searchBox}>
            <Search size={20} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Документ издөө..." 
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <X 
                size={18} 
                color="#94a3b8" 
                style={{ cursor: 'pointer' }} 
                onClick={() => setSearchTerm('')} 
              />
            )}
          </div>
          
          <div style={styles.userSection}>
            <div style={styles.notification}>
              <Bell size={22} />
              <div style={styles.redDot}></div>
            </div>
            <div style={styles.profileBadge}>
              <div style={styles.avatar}>
                <User size={18} color="#64748b" />
              </div>
              {!isMobile && <span style={styles.userName}>Колдонуучу</span>}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={styles.banner}>
          <div style={styles.bannerText}>
            <div style={styles.badge}>
              <Info size={14} style={{ marginRight: '6px' }} />
              Жаңы мүмкүнчүлүк
            </div>
            <h1 style={styles.bannerTitle}>Юридикалык документтерди <br/> тез жана оңой түзүңүз</h1>
            <p style={styles.bannerSubtitle}>
              Биздин AI жардамчыбыз сизге Кыргызстандын мыйзамдарына ылайык иш кагаздарын 
              бир нече мүнөттө даярдап берет.
            </p>
            <button style={styles.bannerBtn}>
              Кантип иштейт? <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>
          {!isMobile && (
            <div style={styles.bannerIllustration}>
              <Scale size={180} strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Section Title */}
        <div style={styles.sectionInfo}>
          <h2 style={styles.sectionTitle}>Популярдуу шаблондор</h2>
          <span style={styles.docCount}>{filteredDocs.length} документ</span>
        </div>

        {/* Grid */}
        <div style={styles.grid}>
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <div 
                key={doc.id} 
                style={styles.card}
                onClick={() => navigate(`/create/${doc.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconBox, background: `${doc.color}15`, color: doc.color}}>
                    {/* Эгер docsData ичинде иконка аты келсе, бул жерге иконка компонентин койсо болот */}
                    <span style={{fontSize: '24px'}}>{doc.icon}</span>
                  </div>
                  <MoreVertical size={20} color="#cbd5e1" />
                </div>
                <h4 style={styles.cardTitle}>{doc.title}</h4>
                <p style={styles.cardDesc}>{doc.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.categoryTag}>{doc.category}</span>
                  <span style={styles.playText}>
                    Түзүү <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <SearchX size={64} color="#cbd5e1" style={{ marginBottom: '16px' }} />
              <h3>Эч нерсе табылган жок</h3>
              <p>Башка сөздөр менен издеп көрүңүз</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
  content: { flex: 1, padding: '30px 5%', transition: 'all 0.4s ease' },
  topHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  searchBox: { background: '#fff', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', flex: 1, maxWidth: '400px', border: '1px solid #e2e8f0' },
  searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '14px', marginLeft: '10px', color: '#1e293b' },
  userSection: { display: 'flex', alignItems: 'center', gap: '24px' },
  notification: { position: 'relative', cursor: 'pointer', color: '#64748b' },
  redDot: { position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid #f8fafc' },
  profileBadge: { display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '5px 12px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' },
  avatar: { width: '32px', height: '32px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  userName: { fontSize: '13px', fontWeight: '600', color: '#1e293b' },
  banner: { background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '40px', color: '#fff', marginBottom: '40px', position: 'relative', display: 'flex', overflow: 'hidden' },
  bannerText: { zIndex: 2, flex: 1 },
  badge: { background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', marginBottom: '16px', width: 'fit-content' },
  bannerTitle: { fontSize: '32px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' },
  bannerSubtitle: { fontSize: '15px', opacity: 0.8, maxWidth: '480px', lineHeight: '1.6', marginBottom: '24px' },
  bannerBtn: { background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: '0.2s' },
  bannerIllustration: { position: 'absolute', right: '40px', bottom: '-20px', color: '#3b82f6', opacity: 0.2 },
  sectionInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#1e293b' },
  docCount: { color: '#94a3b8', fontSize: '13px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: '#fff', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.3s ease' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
  iconBox: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: '16px', color: '#1e293b', marginBottom: '8px', fontWeight: '700' },
  cardDesc: { fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '20px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  categoryTag: { fontSize: '10px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: '#475569', fontWeight: '600' },
  playText: { fontSize: '13px', fontWeight: '700', color: '#3b82f6', display: 'flex', alignItems: 'center' },
  emptyState: { gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center' }
};

export default Home;