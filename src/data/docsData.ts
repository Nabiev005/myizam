export const documentTypes = [
  // --- КЕЛИШИМДЕР (Contracts) ---
  {
    id: 'rent-apartment',
    title: 'Батирди ижарага берүү',
    description: 'Турак жайды узак мөөнөткө же суткага ижарага берүү келишими.',
    icon: '🏠',
    color: '#E3F2FD', // Көк
    category: 'Келишимдер',
    players: '5.2k'
  },
  {
    id: 'sale-auto',
    title: 'Унаа сатуу-сатып алуу',
    description: 'Автоунааны менчикке өткөрүү боюнча стандарттык келишим.',
    icon: '🚗',
    color: '#E1F5FE',
    category: 'Келишимдер',
    players: '3.8k'
  },
  {
    id: 'loan-money',
    title: 'Акча карыз берүү (Тилкат)',
    description: 'Жеке жактар арасындагы акча каражаттарын карызга берүү келишими.',
    icon: '💸',
    color: '#E8F5E9', // Жашыл
    category: 'Келишимдер',
    players: '2.1k'
  },
  {
    id: 'service-contract',
    title: 'Кызмат көрсөтүү',
    description: 'Фрилансерлер жана адистер үчүн жумуш аткаруу келишими.',
    icon: '🛠️',
    color: '#F3E5F5', // Сүр
    category: 'Келишимдер',
    players: '1.5k'
  },

  // --- АРЫЗДАР (Applications) ---
  {
    id: 'resignation',
    title: 'Жумуштан кетүү арызы',
    description: 'Өз каалоосу менен эмгек келишимин токтотуу тууралуу арыз.',
    icon: '📄',
    color: '#FFF3E0', // Саргыч
    category: 'Арыздар',
    players: '8.4k'
  },
  {
    id: 'vacation-leave',
    title: 'Өргүүгө чыгуу арызы',
    description: 'Жылдык акы төлөнүүчү эмгек өргүүсүн алуу үчүн билдирүү.',
    icon: '🏖️',
    color: '#E0F7FA',
    category: 'Арыздар',
    players: '4.2k'
  },
  {
    id: 'maternity-leave',
    title: 'Депозитке арыз (Бала багуу)',
    description: 'Бала багуу боюнча өргүүгө чыгуу жана жөлөк пул алуу арызы.',
    icon: '👶',
    color: '#FCE4EC', // Кызгылт
    category: 'Арыздар',
    players: '1.1k'
  },

  // --- ИШЕНИМ КАТТАР (Power of Attorney) ---
  {
    id: 'poa-auto',
    title: 'Унаа башкарууга ишеним кат',
    description: 'Автоунааны үчүнчү жактарга башкарууга укук берүүчү документ.',
    icon: '🔑',
    color: '#FFF9C4', // Сары
    category: 'Ишеним каттар',
    players: '2.9k'
  },
  {
    id: 'poa-general',
    title: 'Башкы ишеним кат',
    description: 'Мүлктү башкаруу жана бардык органдарда өкүлчүлүк кылуу укугу.',
    icon: '📜',
    color: '#F5F5F5',
    category: 'Ишеним каттар',
    players: '1.7k'
  },

  // --- ҮЙ-БҮЛӨ ЖАНА МҮЛК ---
  {
    id: 'alimony-claim',
    title: 'Алимент өндүрүү',
    description: 'Сотко берилүүчү алимент өндүрүү тууралуу доо арыздын үлгүсү.',
    icon: '⚖️',
    color: '#FFEBEE',
    category: 'Үй-бүлө',
    players: '950'
  },
  {
    id: 'inheritance',
    title: 'Мурасты кабыл алуу',
    description: 'Нотариуска мурас укугун таануу боюнча кайрылуу.',
    icon: '🏛️',
    color: '#EFEBE9',
    category: 'Үй-бүлө',
    players: '600'
  },
  {
    id: 'gift-contract',
    title: 'Белекке берүү (Дарение)',
    description: 'Кыймылсыз мүлктү же баалуу буюмду акысыз белекке берүү келишими.',
    icon: '🎁',
    color: '#EDE7F6',
    category: 'Келишимдер',
    players: '1.3k'
  }
];