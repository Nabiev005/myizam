import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Gavel, CheckCircle, ShieldCheck, Cpu, Mail, Globe, Github, User } from 'lucide-react';

const About: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        paddingTop: isMobile ? '80px' : '40px' 
      }}>
        
        {/* Header Section */}
        <div style={pageStyles.header}>
          <div style={{ width: '100%', textAlign: isMobile ? 'center' : 'left' }}>
            <h2 style={{
              ...pageStyles.title,
              fontSize: isMobile ? '24px' : '32px'
            }}>⚖️ Долбоор тууралуу</h2>
            <p style={pageStyles.subtitle}>МыйзамДок — санариптик юридикалык жардамчыңыз</p>
          </div>
        </div>

        {/* Hero Section Card */}
        <div style={pageStyles.heroCard}>
          <Gavel size={isMobile ? 48 : 64} color="#3b82f6" />
          <h3 style={{ margin: '15px 0 10px', fontSize: isMobile ? '20px' : '24px' }}>МыйзамДок деген эмне?</h3>
          <p style={pageStyles.description}>
            Бул платформа Кыргызстандын жарандарына юридикалык документтерди тез, сапаттуу жана 
            автоматтык түрдө даярдоого жардам берүү максатында түзүлгөн. Биз татаал юридикалык 
            процесстерди жөнөкөйлөтүп, ар бир колдонуучуга жеткиликтүү кылабыз.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          ...pageStyles.grid,
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '15px' : '25px'
        }}>
          <div style={pageStyles.featureCard}>
            <div style={{...pageStyles.iconWrapper, color: '#3b82f6', background: '#3b82f615'}}>
              <Cpu size={24} />
            </div>
            <h4>AI Технология</h4>
            <p>Документтерди жасалма интеллекттин жардамы менен юридикалык талаптарга ылайык иштеп чыгабыз.</p>
          </div>

          <div style={pageStyles.featureCard}>
            <div style={{...pageStyles.iconWrapper, color: '#10b981', background: '#10b98115'}}>
              <ShieldCheck size={24} />
            </div>
            <h4>Коопсуздук</h4>
            <p>Сиздин жеке маалыматтарыңыз жана түзүлгөн документтериңиз шифрленген түрдө коопсуз сакталат.</p>
          </div>

          <div style={pageStyles.featureCard}>
            <div style={{...pageStyles.iconWrapper, color: '#f59e0b', background: '#f59e0b15'}}>
              <CheckCircle size={24} />
            </div>
            <h4>Ыкчамдык</h4>
            <p>Арыз же келишимдерди жазууга кеткен убакытты 10 эсеге чейин кыскартабыз.</p>
          </div>
        </div>

        {/* Author Section */}
        <div style={{
          ...pageStyles.authorSection,
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={pageStyles.authorAvatar}>
            <User size={isMobile ? 40 : 50} color="#64748b" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Набиев Айбек</h4>
            <p style={{ margin: '4px 0', color: '#64748b', fontSize: '14px' }}>Долбоордун автору / Full-stack Developer</p>
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '10px',
              justifyContent: isMobile ? 'center' : 'flex-start' 
            }}>
              <a href="mailto:info@myizamdok.kg" style={pageStyles.socialLink}><Mail size={18} /></a>
              <a href="https://github.com/Nabiev005" target="_blank" rel="noreferrer" style={pageStyles.socialLink}><Github size={18} /></a>
              <a href="https://my-portfolio-flask-six.vercel.app/" target="_blank" rel="noreferrer" style={pageStyles.socialLink}><Globe size={18} /></a>
            </div>
          </div>
          <div style={{ marginTop: isMobile ? '20px' : '0' }}>
            <div style={pageStyles.versionBadge}>v1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const pageStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  content: { flex: 1, transition: 'all 0.3s ease' },
  header: { marginBottom: '30px' },
  title: { fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' },
  subtitle: { color: '#64748b', marginTop: '6px', fontSize: '15px' },
  
  heroCard: {
    background: '#fff',
    padding: '40px 30px',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
  },
  description: {
    color: '#475569',
    lineHeight: '1.7',
    maxWidth: '700px',
    margin: '0 auto',
    fontSize: '16px'
  },

  grid: { display: 'grid' },
  featureCard: {
    background: '#fff',
    padding: '30px 24px',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  iconWrapper: {
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px'
  },
  
  authorSection: {
    background: '#fff',
    marginTop: '30px',
    padding: '25px',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  authorAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialLink: {
    color: '#94a3b8',
    transition: '0.2s',
    cursor: 'pointer'
  },
  versionBadge: {
    padding: '6px 12px',
    background: '#f1f5f9',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b'
  }
};

export default About;