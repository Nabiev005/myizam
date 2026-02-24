import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  User, Mail, Bell, Save, ShieldCheck, Camera,
  Smartphone, CheckCircle, Trash2, 
} from 'lucide-react';

const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    notifications: true,
    darkMode: false,
    avatar: '' // Сүрөт үчүн кошумча талаа
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Адаптивдүүлүк үчүн экрандын өлчөмүн көзөмөлдөө
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Маалыматтарды жүктөө
  useEffect(() => {
    const savedData = localStorage.getItem('user_profile');
    if (savedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(JSON.parse(savedData));
    } else {
      setProfile({
        fullName: 'Набиев Айбек',
        email: 'example@mail.kg',
        notifications: true,
        darkMode: false,
        avatar: ''
      });
    }
  }, []);

  // 3. Сүрөт жүктөө функциясы
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Маалыматтарды сактоо
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('user_profile', JSON.stringify(profile));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  // 5. Аккаунтту өчүрүү имитациясы
  const handleDeleteAccount = () => {
    if (window.confirm("Чын эле аккаунтту өчүргүңүз келеби? Бул кадамды артка кайтаруу мүмкүн эмес.")) {
      localStorage.removeItem('user_profile');
      window.location.reload();
    }
  };

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
        <div style={{
          ...pageStyles.header,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '15px' : '0'
        }}>
          <div>
            <h2 style={pageStyles.title}>⚙️ Жөндөөлөр</h2>
            <p style={pageStyles.subtitle}>Жеке маалыматтарыңызды жана тиркеменин иштөөсүн ырастаңыз.</p>
          </div>
          
          {showSuccess && (
            <div style={pageStyles.successToast}>
              <CheckCircle size={18} /> Сакталды!
            </div>
          )}
        </div>

        <div style={{
          ...pageStyles.mainGrid,
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
        }}>
          
          {/* СОЛ ЖАГЫ: Профиль */}
          <div style={pageStyles.column}>
            <div style={pageStyles.section}>
              <div style={pageStyles.sectionHeader}>
                <User size={20} color="#3b82f6" />
                <h3 style={pageStyles.sectionTitle}>Профиль маалыматы</h3>
              </div>
              
              <div style={pageStyles.avatarSection}>
                <div 
                  style={pageStyles.avatarPlaceholder} 
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" style={pageStyles.avatarImg} />
                  ) : (
                    profile.fullName.charAt(0)
                  )}
                  <div style={pageStyles.cameraBadge}><Camera size={14} /></div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange} 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                />
                <p style={{ fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>Сүрөттү басып өзгөртүңүз</p>
              </div>

              <div style={pageStyles.field}>
                <label style={pageStyles.label}>Толук аты-жөнүңүз</label>
                <div style={pageStyles.inputContainer}>
                  <User size={16} style={pageStyles.inputIcon} />
                  <input 
                    type="text" 
                    value={profile.fullName} 
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    style={pageStyles.input} 
                  />
                </div>
              </div>

              <div style={pageStyles.field}>
                <label style={pageStyles.label}>Электрондук почта</label>
                <div style={pageStyles.inputContainer}>
                  <Mail size={16} style={pageStyles.inputIcon} />
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    style={pageStyles.input} 
                  />
                </div>
              </div>
            </div>

            <button 
              style={{
                ...pageStyles.saveBtn,
                opacity: isSaving ? 0.7 : 1,
                cursor: isSaving ? 'not-allowed' : 'pointer'
              }} 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Сакталууда...' : <><Save size={18} /> Сактоо</>}
            </button>
          </div>

          {/* ОҢ ЖАГЫ: Тиркеме */}
          <div style={pageStyles.column}>
            <div style={pageStyles.section}>
              <div style={pageStyles.sectionHeader}>
                <Smartphone size={20} color="#8b5cf6" />
                <h3 style={pageStyles.sectionTitle}>Тиркеме жөндөөлөрү</h3>
              </div>
              
              {/* Notifications Switch */}
              <div style={pageStyles.fieldInline}>
                <div style={pageStyles.infoGroup}>
                  <Bell size={18} color="#64748b" />
                  <div>
                    <div style={pageStyles.settingLabel}>Билдирмелер</div>
                    <div style={pageStyles.settingSub}>Маанилүү кабарлар</div>
                  </div>
                </div>
                <label style={pageStyles.switch} onClick={() => setProfile({...profile, notifications: !profile.notifications})}>
                  <span style={{
                    ...pageStyles.slider,
                    backgroundColor: profile.notifications ? '#3b82f6' : '#cbd5e1'
                  }}>
                    <span style={{
                      ...pageStyles.knob,
                      transform: profile.notifications ? 'translateX(20px)' : 'translateX(0px)'
                    }} />
                  </span>
                </label>
              </div>

              <div style={pageStyles.fieldInline}>
                <div style={pageStyles.infoGroup}>
                  <ShieldCheck size={18} color="#64748b" />
                  <div>
                    <div style={pageStyles.settingLabel}>Коопсуздук</div>
                    <div style={pageStyles.settingSub}>Эки факторлуу аутентификация</div>
                  </div>
                </div>
                <button style={pageStyles.textBtn}>Жөндөө</button>
              </div>
            </div>

            <div style={pageStyles.dangerZone}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Trash2 size={18} color="#ef4444" />
                <h4 style={{ color: '#ef4444', margin: 0, fontSize: '14px' }}>Коркунучтуу аймак</h4>
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '15px' }}>Бардык маалыматтарыңыз биротоло өчүрүлөт.</p>
              <button onClick={handleDeleteAccount} style={pageStyles.deleteBtn}>Аккаунтту өчүрүү</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Стилдерди адаптивдүүлүккө оптималдаштыруу
const pageStyles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', background: '#f8fafc', minHeight: '100vh', width: '100%' },
  content: { flex: 1, transition: 'all 0.3s ease' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '14px', marginTop: '5px' },
  successToast: { 
    background: '#ecfdf5', color: '#059669', padding: '8px 16px', borderRadius: '10px', 
    border: '1px solid #10b981', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' 
  },
  mainGrid: { display: 'grid', gap: '25px', alignItems: 'start' },
  column: { display: 'flex', flexDirection: 'column', gap: '20px' },
  section: { background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0 },
  avatarSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  avatarPlaceholder: { 
    width: '70px', height: '70px', borderRadius: '50%', background: '#3b82f6', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', position: 'relative', cursor: 'pointer', overflow: 'hidden'
  },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, background: '#fff', padding: '4px', borderRadius: '50%', border: '1px solid #e2e8f0', color: '#64748b', display: 'flex' },
  field: { marginBottom: '16px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' },
  inputContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '12px', color: '#94a3b8' },
  input: { width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', background: '#f8fafc' },
  fieldInline: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9' },
  infoGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  settingLabel: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  settingSub: { fontSize: '12px', color: '#94a3b8' },
  switch: { position: 'relative', width: '44px', height: '24px', cursor: 'pointer' },
  slider: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '24px', transition: '0.3s' },
  knob: { position: 'absolute', height: '18px', width: '18px', left: '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '0.3s' },
  textBtn: { background: 'none', border: 'none', color: '#3b82f6', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
  saveBtn: { background: '#1e293b', color: '#fff', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  dangerZone: { padding: '20px', borderRadius: '20px', border: '1px solid #fee2e2', background: '#fff' },
  deleteBtn: { background: '#fff5f5', border: '1px solid #fecaca', color: '#ef4444', padding: '10px', borderRadius: '10px', width: '100%', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }
};

export default Settings;