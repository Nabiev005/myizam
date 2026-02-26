import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentTypes } from '../data/docsData';
import Sidebar from '../components/Sidebar';
import { 
  ArrowLeft, Sparkles, Download, Printer, User, 
  Building2, FileText, CheckCircle2, Eye, Edit3, MapPin
} from 'lucide-react';

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const docInfo = documentTypes.find(d => d.id === id);

  const [isProcessing, setIsProcessing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
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
    }, 1500);
  };

  if (!docInfo) return <div style={{padding: '100px', textAlign: 'center'}}>Документ табылган жок...</div>;

  const isMobile = windowWidth <= 1024;

  return (
    <div style={editorStyles.container}>
      <div className="no-print">
        <Sidebar />
      </div>
      
      <div style={{
        ...editorStyles.content,
        marginLeft: isMobile ? '0' : '280px',
        padding: isMobile ? '0 16px 120px' : '0 40px 40px'
      }}>
        {/* Toolbar */}
        <div style={editorStyles.toolbar} className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <button onClick={() => navigate(-1)} style={editorStyles.iconBtn}>
              <ArrowLeft size={20} />
            </button>
            <div style={{ minWidth: 0 }}>
              <h2 style={editorStyles.title}>{docInfo.title}</h2>
              <div style={editorStyles.statusBadge}><CheckCircle2 size={12} /> Авто-сактоо иштеп жатат</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={editorStyles.secondaryBtn}>
              <Printer size={18} /> {!isMobile && 'Принтер'}
            </button>
            <button onClick={() => window.print()} style={editorStyles.primaryBtn}>
              <Download size={18} /> {!isMobile && 'PDF жүктөө'}
            </button>
          </div>
        </div>

        <div style={{
          ...editorStyles.mainLayout,
          gridTemplateColumns: isMobile ? '1fr' : '420px 1fr'
        }}>
          {/* Input Panel */}
          {(viewMode === 'edit' || !isMobile) && (
            <div style={editorStyles.formPanel} className="no-print">
              <div style={editorStyles.inputCard}>
                <label style={editorStyles.fieldLabel}><Building2 size={16} /> Алуучу</label>
                <input 
                  type="text" 
                  value={formData.receiverName}
                  placeholder="Мекеменин аталышы же жетекчиси" 
                  style={editorStyles.styledInput}
                  onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                />
              </div>

              <div style={editorStyles.inputCard}>
                <label style={editorStyles.fieldLabel}><User size={16} /> Жөнөтүүчү</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  placeholder="Толук аты-жөнүңүз" 
                  style={editorStyles.styledInput}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <div style={{position: 'relative', marginTop: '12px'}}>
                  <MapPin size={18} style={editorStyles.innerIcon} />
                  <input 
                    type="text" 
                    value={formData.address}
                    placeholder="Дарегиңиз же номериңиз" 
                    style={{...editorStyles.styledInput, paddingLeft: '40px'}}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div style={editorStyles.inputCard}>
                <label style={editorStyles.fieldLabel}><FileText size={16} /> Мазмуну</label>
                <textarea 
                  placeholder="Кыскача мазмунун жазыңыз..." 
                  style={editorStyles.styledTextarea}
                  value={formData.otherDetails}
                  onChange={(e) => setFormData({...formData, otherDetails: e.target.value})}
                />
                <button 
                  style={{...editorStyles.aiBtn, background: isProcessing ? '#94a3b8' : 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'}} 
                  onClick={handleAICheck}
                  disabled={isProcessing}
                >
                  <Sparkles size={18} /> {isProcessing ? 'AI иштеп жатат...' : 'AI Юридикалык жардам'}
                </button>
              </div>
            </div>
          )}

          {/* Document Preview - ТАПТААЗА ВЕРСИЯ */}
          {(viewMode === 'preview' || !isMobile) && (
            <div style={editorStyles.previewWrapper}>
              <div id="printable-doc" style={editorStyles.paper}>
                
                {/* Header (Right Side) */}
                <div style={editorStyles.docHeader}>
                  <div style={editorStyles.headerRight}>
                    <p style={{fontWeight: 'bold', margin: '0 0 4px 0'}}>{formData.receiverName || '_________________________'}</p>
                    <p style={{margin: '0 0 2px 0'}}>Кимден: {formData.fullName || '_____________________'}</p>
                    <p style={{margin: '0'}}>Дареги: {formData.address || '_____________________'}</p>
                  </div>
                </div>

                {/* Title */}
                <h3 style={editorStyles.docTypeTitle}>
                  {docInfo.category === 'Арыздар' ? 'АРЫЗ' : 'КЕЛИШИМ'}
                </h3>

                {/* Body Content */}
                <div style={editorStyles.docBody}>
                  <p style={{ textIndent: '1.25cm', textAlign: 'justify', margin: '0 0 15px 0' }}>
                    Мен, <strong>{formData.fullName || '________________'}</strong>, ушул билдирүү аркылуу төмөнкүнү билдирем:
                  </p>
                  <div style={{ whiteSpace: 'pre-wrap', textAlign: 'justify', lineHeight: '1.5' }}>
                    {formData.otherDetails || 'Документтин мазмуну бул жерде пайда болот...'}
                  </div>
                </div>

                {/* Footer Section */}
                <div style={editorStyles.docFooter}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <div>
                      <p style={{margin: '0 0 10px 0'}}>Колу: _________________</p>
                      <p style={{margin: '0'}}>Дата: {formData.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Tabs */}
      {isMobile && (
        <div style={editorStyles.mobileTabs} className="no-print">
          <button onClick={() => setViewMode('edit')} style={{...editorStyles.tab, color: viewMode === 'edit' ? '#3b82f6' : '#64748b'}}>
            <Edit3 size={20} /> Форма
          </button>
          <button onClick={() => setViewMode('preview')} style={{...editorStyles.tab, color: viewMode === 'preview' ? '#3b82f6' : '#64748b'}}>
            <Eye size={20} /> Баракча
          </button>
        </div>
      )}

      {/* PRINT STYLES - Эң маанилүү жер */}
      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          
          #printable-doc { 
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 2.5cm 1.5cm 2cm 2.5cm !important;
            box-shadow: none !important;
            border: none !important;
            font-size: 14pt !important;
            display: flex !important;
            flex-direction: column !important;
            visibility: visible !important;
          }
          
          /* Башка бардык элементтерди жашыруу */
          body > *:not(#printable-doc) { visibility: hidden; }
        }
      `}</style>
    </div>
  );
};

const editorStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f1f5f9', minHeight: '100vh' },
  content: { flex: 1, transition: '0.3s' },
  toolbar: { 
    display: 'flex', justifyContent: 'space-between', padding: '15px 0', 
    position: 'sticky', top: 0, background: '#f1f5f9', zIndex: 50, borderBottom: '1px solid #e2e8f0' 
  },
  title: { fontWeight: '800', margin: 0, fontSize: '18px', color: '#0f172a' },
  statusBadge: { fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' },
  iconBtn: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', cursor: 'pointer' },
  primaryBtn: { background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  secondaryBtn: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  mainLayout: { display: 'grid', gap: '30px', marginTop: '20px' },
  formPanel: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputCard: { background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' },
  fieldLabel: { fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' },
  styledInput: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9', background: '#f8fafc', outline: 'none', fontSize: '15px' },
  innerIcon: { position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  styledTextarea: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9', background: '#f8fafc', minHeight: '150px', outline: 'none', resize: 'none', fontSize: '15px' },
  aiBtn: { color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', marginTop: '10px', fontWeight: '700', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
  
  // Документтин стили
  previewWrapper: { display: 'flex', justifyContent: 'center' },
  paper: { 
    background: '#fff', width: '210mm', minHeight: '297mm', padding: '2.5cm 1.5cm 2cm 2.5cm',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column',
    fontFamily: '"Times New Roman", Times, serif', color: '#000', fontSize: '14pt', lineHeight: '1.4'
  },
  docHeader: { display: 'flex', justifyContent: 'flex-end', marginBottom: '2.5rem' },
  headerRight: { width: '55%' },
  docTypeTitle: { textAlign: 'center', fontSize: '16pt', fontWeight: 'bold', margin: '2rem 0' },
  docBody: { flex: 1 },
  docFooter: { marginTop: '2rem' },
  mobileTabs: { position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', background: '#fff', borderRadius: '15px', padding: '5px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100, width: '280px' },
  tab: { flex: 1, border: 'none', background: 'none', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '700', fontSize: '14px' }
};

export default Editor;