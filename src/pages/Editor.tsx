import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentTypes } from '../data/docsData';
import Sidebar from '../components/Sidebar';
import { 
  ArrowLeft, Sparkles, Download, Printer, User, 
  Building2, FileText, CheckCircle2, Eye, Edit3
} from 'lucide-react';

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const docInfo = documentTypes.find(d => d.id === id);

  const [isProcessing, setIsProcessing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit'); // Мобилдик үчүн режимдер
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    receiverName: '',
    receiverPos: '',
    date: new Date().toLocaleDateString('kg-KG'),
    otherDetails: ''
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem('my_documents') || '[]');
    const newDoc = {
      id: Date.now().toString(),
      templateId: id,
      title: docInfo?.title || 'Аталышсыз',
      date: new Date().toLocaleDateString('kg-KG'),
      data: formData
    };
    localStorage.setItem('my_documents', JSON.stringify([newDoc, ...history.slice(0, 19)]));
  };

  const handleAICheck = () => {
    if (!formData.fullName || !formData.otherDetails) {
      alert("Сураныч, негизги талааларды толтуруңуз!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const legalText = `Кыргыз Республикасынын колдонуудагы мыйзамдарынын ченемдерине ылайык, Сизге төмөндөгүлөрдү маалымдайм:\n\n${formData.otherDetails}\n\nЖогоруда айтылгандардын негизинде жана мыйзам чегинде тиешелүү чечим кабыл алууңузду суранам. Кабыл алынган чаралар тууралуу жазуу жүзүндө жооп берүүңүздү өтүнөм.`;
      setFormData(prev => ({ ...prev, otherDetails: legalText }));
      setIsProcessing(false);
      saveToHistory();
    }, 1500);
  };

  if (!docInfo) return <div style={{padding: '100px', textAlign: 'center'}}>Документ табылган жок...</div>;

  const isMobile = windowWidth <= 1024;
  
  // А4 баракчасын мобилдик экранга тууралоо үчүн коэффициент
  const scaleValue = isMobile ? (windowWidth - 40) / 794 : 1; // 794px бул 210mm (A4)

  return (
    <div style={editorStyles.container}>
      <div className="no-print">
        <Sidebar />
      </div>
      
      <div style={{
        ...editorStyles.content,
        marginLeft: isMobile ? '0' : '260px',
        padding: isMobile ? '0 15px 80px' : '0 40px 40px'
      }}>
        {/* Toolbar */}
        <div style={{
          ...editorStyles.toolbar,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '15px' : '0',
          padding: isMobile ? '15px 0' : '20px 0'
        }} className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate(-1)} style={editorStyles.iconBtn}>
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 style={{...editorStyles.title, fontSize: isMobile ? '16px' : '18px'}}>{docInfo.title}</h2>
              <span style={editorStyles.status}><CheckCircle2 size={12} /> Сакталды</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
            <button onClick={() => window.print()} style={{...editorStyles.secondaryBtn, flex: isMobile ? 1 : 'none'}}>
              <Printer size={18} /> {!isMobile && 'Принтер'}
            </button>
            <button onClick={() => window.print()} style={{...editorStyles.primaryBtn, flex: isMobile ? 1 : 'none'}}>
              <Download size={18} /> {!isMobile && 'PDF'}
            </button>
          </div>
        </div>

        {/* Mobile View Switcher */}
        {isMobile && (
          <div style={editorStyles.mobileTabs} className="no-print">
            <button 
              onClick={() => setViewMode('edit')}
              style={{...editorStyles.tab, borderBottom: viewMode === 'edit' ? '2px solid #3b82f6' : 'none', color: viewMode === 'edit' ? '#3b82f6' : '#64748b'}}
            >
              <Edit3 size={18} /> Форма
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              style={{...editorStyles.tab, borderBottom: viewMode === 'preview' ? '2px solid #3b82f6' : 'none', color: viewMode === 'preview' ? '#3b82f6' : '#64748b'}}
            >
              <Eye size={18} /> Алдын ала көрүү
            </button>
          </div>
        )}

        <div style={{
          ...editorStyles.mainLayout,
          gridTemplateColumns: isMobile ? '1fr' : '400px 1fr'
        }}>
          {/* Форма панели */}
          {(viewMode === 'edit' || !isMobile) && (
            <div style={editorStyles.formPanel} className="no-print">
              <section style={editorStyles.formSection}>
                <h4 style={editorStyles.sectionLabel}><Building2 size={16} /> Алуучу</h4>
                <input 
                  type="text" 
                  value={formData.receiverName}
                  placeholder="Мисалы: Ректорго..." 
                  style={editorStyles.input}
                  onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                />
              </section>

              <section style={editorStyles.formSection}>
                <h4 style={editorStyles.sectionLabel}><User size={16} /> Жөнөтүүчү</h4>
                <input 
                  type="text" 
                  value={formData.fullName}
                  placeholder="Аты-жөнүңүз" 
                  style={editorStyles.input}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <input 
                  type="text" 
                  value={formData.address}
                  placeholder="Байланыш маалыматы" 
                  style={{...editorStyles.input, marginTop: '10px'}}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </section>

              <section style={editorStyles.formSection}>
                <h4 style={editorStyles.sectionLabel}><FileText size={16} /> Мазмуну</h4>
                <textarea 
                  placeholder="Мазмунун жазыңыз..." 
                  style={editorStyles.textarea}
                  value={formData.otherDetails}
                  onChange={(e) => setFormData({...formData, otherDetails: e.target.value})}
                />
                <button 
                  style={{...editorStyles.aiBtn, background: isProcessing ? '#94a3b8' : '#8b5cf6'}} 
                  onClick={handleAICheck}
                  disabled={isProcessing}
                >
                  <Sparkles size={18} /> {isProcessing ? 'AI иштеп жатат...' : 'AI Юридикалык жардам'}
                </button>
              </section>
            </div>
          )}

          {/* Документ Preview */}
          {(viewMode === 'preview' || !isMobile) && (
            <div style={{
              ...editorStyles.previewContainer,
              display: isMobile && viewMode !== 'preview' ? 'none' : 'block'
            }}>
              <div 
                style={{
                  ...editorStyles.paper,
                  transform: isMobile ? `scale(${scaleValue})` : 'none',
                  transformOrigin: 'top center',
                  marginBottom: isMobile ? `-${(1 - scaleValue) * 1120}px` : '0' // А4 бийиктигин компенсациялоо
                }} 
                id="printable-doc"
              >
                <div style={editorStyles.docHeader}>
                  <div style={editorStyles.headerRight}>
                    <p><strong>{formData.receiverName || '_________________________'}</strong></p>
                    <p>Кимден: {formData.fullName || '_____________________'}</p>
                    <p>Дареги: {formData.address || '_____________________'}</p>
                  </div>
                </div>

                <h3 style={editorStyles.docTypeTitle}>
                  {docInfo.category === 'Арыздар' ? 'АРЫЗ' : 'КЕЛИШИМ'}
                </h3>

                <div style={editorStyles.docContent}>
                  <p style={{ textIndent: '1.25cm', textAlign: 'justify' }}>
                    Мен, <strong>{formData.fullName || '________________'}</strong>, ушул билдирүү аркылуу төмөнкүнү баяндайм:
                  </p>
                  <p style={{ whiteSpace: 'pre-wrap', marginTop: '1.5rem', minHeight: '300px', textAlign: 'justify' }}>
                    {formData.otherDetails || 'Документтин мазмуну бул жерде пайда болот...'}
                  </p>
                </div>

                <div style={editorStyles.footerSection}>
                  <p>Колу: _________________</p>
                  <p>Дата: {formData.date}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          #printable-doc { 
            box-shadow: none !important; 
            border: none !important; 
            margin: 0 !important;
            padding: 1.5cm !important;
            width: 210mm !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const editorStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f1f5f9', minHeight: '100vh' },
  content: { flex: 1, transition: 'all 0.3s ease' },
  toolbar: { 
    display: 'flex', justifyContent: 'space-between',
    position: 'sticky', top: 0, background: '#f1f5f9', zIndex: 10
  },
  mobileTabs: {
    display: 'flex', background: '#fff', borderRadius: '12px', marginBottom: '20px',
    padding: '4px', border: '1px solid #e2e8f0'
  },
  tab: {
    flex: 1, padding: '10px', border: 'none', background: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer'
  },
  iconBtn: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', cursor: 'pointer' },
  title: { fontWeight: '700', color: '#1e293b', margin: 0 },
  status: { fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' },
  primaryBtn: { background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  secondaryBtn: { background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  mainLayout: { display: 'grid', gap: '30px', alignItems: 'start' },
  formPanel: { background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px' },
  formSection: { display: 'flex', flexDirection: 'column' },
  sectionLabel: { fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' },
  input: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', background: '#f8fafc' },
  textarea: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', minHeight: '180px', background: '#f8fafc', outline: 'none', resize: 'none' },
  aiBtn: { color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', marginTop: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  previewContainer: { paddingBottom: '40px', overflowX: 'hidden', display: 'flex', justifyContent: 'center' },
  paper: { 
    background: '#fff', width: '210mm', minHeight: '297mm', padding: '2.5cm 1.5cm 2cm 2.5cm',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderRadius: '2px',
    fontFamily: '"Times New Roman", Times, serif', color: '#000', fontSize: '14pt'
  },
  docHeader: { display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' },
  headerRight: { width: '65%', textAlign: 'left', lineHeight: '1.4' },
  docTypeTitle: { textAlign: 'center', fontSize: '16pt', fontWeight: 'bold', margin: '2rem 0' },
  docContent: { lineHeight: '1.5' },
  footerSection: { marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }
};

export default Editor;