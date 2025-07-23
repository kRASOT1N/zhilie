const translations = {
  ru: {
    nav: ["Главная", "Поиск", "Подать объявление", "Избранное", "Кабинет"],
    register: "Зарегистрироваться",
    login: "Войти",
    quote: '"Сначала делайте тяжелую работу. Легкая работа сама о себе позаботится."',
    author: "Дейл Карнеги",
    searchPlaceholder1: "Город, район или метро",
    searchPlaceholder2: "Тип недвижимости (квартира, дом, офис)",
    searchPlaceholder3: "Цена от",
    searchPlaceholder4: "Цена до",
    searchBtn: "Найти",
    listingTitle: "Современная 2-комнатная квартира",
    listingLocation: "г. Алматы, мкр. Самал-2",
    listingPrice: "45 000 000 ₸",
    listingDetails: "65 м² · 2 комнаты · 5/12 этаж",
    detailsBtn: "Подробнее",
    privacy: "Политика конфиденциальности",
    // Переводы для описаний кнопок
    rentDesc: "Найти квартиру для аренды",
    rentOutDesc: "Сдать свою недвижимость",
    buyDesc: "Купить недвижимость",
    sellDesc: "Продать свою недвижимость",
    searchDesc: "Найти недвижимость",
    creditDesc: "Получить кредит на недвижимость",
    // Переводы для баннера
    bannerTitle: "Найдите идеальную недвижимость",
    bannerSubtitle: "Тысячи объявлений от проверенных продавцов",
    // Переводы для страниц авторизации
    backToMain: "На главную",
    registration: "Регистрация",
    registrationSubtitle: "Создайте аккаунт для доступа к сервису",
    fullName: "Полное имя *",
    phoneNumber: "Номер телефона *",
    email: "Email",
    password: "Пароль *",
    confirmPassword: "Подтвердите пароль *",
    registerBtn: "Зарегистрироваться",
    alreadyHaveAccount: "Уже есть аккаунт?",
    loginLink: "Войти",
    loginTitle: "Вход в аккаунт",
    loginSubtitle: "Введите номер телефона для получения кода",
    loginBtn: "Войти",
    noAccount: "Нет аккаунта?",
    registerLink: "Зарегистрироваться"
  },
  kz: {
    nav: ["Басты бет", "Іздеу", "Хабарландыру беру", "Таңдаулылар", "Кабинет"],
    register: "Тіркелу",
    login: "Кіру",
    quote: '"Алдымен ауыр жұмысты жасаңыз. Оңай жұмыс өзі-ақ орындалады."',
    author: "Дейл Карнеги",
    searchPlaceholder1: "Қала, аудан немесе метро",
    searchPlaceholder2: "Жылжымайтын мүлік түрі (пәтер, үй, офис)",
    searchPlaceholder3: "Бағасы (бастап)",
    searchPlaceholder4: "Бағасы (дейін)",
    searchBtn: "Іздеу",
    listingTitle: "Заманауи 2 бөлмелі пәтер",
    listingLocation: "Алматы қ., Самал-2 ы/а",
    listingPrice: "45 000 000 ₸",
    listingDetails: "65 м² · 2 бөлме · 5/12 қабат",
    detailsBtn: "Толығырақ",
    privacy: "Құпиялық саясаты",
    // Переводы для описаний кнопок
    rentDesc: "Жалға алуға пәтер табу",
    rentOutDesc: "Өз жылжымайтын мүлігіңізді жалға беру",
    buyDesc: "Жылжымайтын мүлік сатып алу",
    sellDesc: "Өз жылжымайтын мүлігіңізді сату",
    searchDesc: "Жылжымайтын мүлік табу",
    creditDesc: "Жылжымайтын мүлікке несие алу",
    // Переводы для баннера
    bannerTitle: "Тамаша жылжымайтын мүлікті табыңыз",
    bannerSubtitle: "Сенімді сатушылардан мыңдаған хабарландыру",
    // Переводы для страниц авторизации
    backToMain: "Басты бетке",
    registration: "Тіркелу",
    registrationSubtitle: "Қызметке кіру үшін есеп жасаңыз",
    fullName: "Толық аты *",
    phoneNumber: "Телефон нөмірі *",
    email: "Email",
    password: "Құпия сөз *",
    confirmPassword: "Құпия сөзді растаңыз *",
    registerBtn: "Тіркелу",
    alreadyHaveAccount: "Есеп бар ма?",
    loginLink: "Кіру",
    loginTitle: "Есепке кіру",
    loginSubtitle: "Код алу үшін телефон нөмірін енгізіңіз",
    loginBtn: "Кіру",
    noAccount: "Есеп жоқ па?",
    registerLink: "Тіркелу"
  }
};

// Массив городов Казахстана
const cities = [
  "Алматы", "Караганда", "Шымкент", "Тараз", "Астана", "Павлодар", "Усть‑Каменогорск", 
  "Кызылорда", "Кызыл‑Орда", "Семей", "Актобе", "Костанай", "Петропавловск", "Уральск", 
  "Атырау", "Темиртау", "Актау", "Кокшетау", "Рудный", "Экибастуз", "Талдыкорган", 
  "Жезказган", "Жанаозен", "Туркестан", "Балхаш", "Сарканд", "Байконур", "Кентау", 
  "Риддер", "Кулсары", "Щучинск", "Степногорск", "Зыряновск", "Аксу", "Джетыгара", 
  "Соран", "Талгар", "Капшагай", "Аркалык", "Шахтинск", "Лисаковск", "Шу", "Каратау", 
  "Арыс", "Айтеке би", "Абай", "Аксай", "Атбасар", "Жаркент", "Жангатас", "Аягоз", 
  "Арал", "Есик", "Шиели", "Кандыагаш", "Шалкар", "Текели", "Белые Воды", "Чардара", 
  "Сарыагаш", "Хромтау", "Георгиевка", "Яныкурган", "Ленгер", "Бурундай", "Уш‑Тюбе", 
  "Шемонаиха", "Жосалы", "Балыкшы", "Отеген Батыра", "Эмби", "Турар Рыскулов", "Макинск", 
  "Зайсан", "Акколь", "Тасбогет", "Мерке", "Михайловка", "Урджар", "Ленинское", "Бейнеу", 
  "Джалагаш", "Ерментау", "Макат", "Сарыозек", "Державинск", "Каражал", "Чемолган", 
  "Есиль", "Приозёрск", "Шахан", "Индербор", "Атасу", "Тайынша", "Луговое", "Турген", 
  "Атакент", "Темирлановка", "Шетпе", "Ералиев", "Балпык би", "Шубаркудак", "Жетыбай", 
  "Асыката", "Глубокое", "Мойынкум", "Чулаккурган", "Курчатов", "Луговой", "Кашар", "Кантаги"
];

// Массив типов недвижимости
const propertyTypes = [
  // Жильё
  "Квартира", "Дом", "Коттедж", "Комната", "Другие",
  // Койка-места
  "Койка-места в хостеле", "Койка-места в общежитии", "Койка-места в комнате", "Койка-места в квартире",
  // Недвижимость
  "Гостиница", "Общежитие", "Хостел",
  // Общепит
  "Кафе", "Ресторан", "Банкетный зал", "Столовая", "Пивной бар", "Донерная", "Кулинария", 
  "Фастфуд", "Шашлычная", "Пивной магазин", "Буфет", "Пекарня", "Цеха", "Тандырная",
  // Торговля - услуги
  "Магазин", "Сауна", "Садик", "Парикмахерская", "Салон красоты", "Ателье", "Аптека", 
  "Офис", "Бутик", "Баня", "Бильярдная", "Овощной", "Кабинеты",
  // Место
  "Место в парикмахерской", "Место в салоне красоты", "Место в ателье", "Место в паркинге", 
  "Место для маникюра", "Место для педикюра",
  // Авто
  "Автосалон", "Подъемник", "Автомойка", "СТО", "Автосервисы", "Паркинг", "Стоянка", 
  "Шиномонтаж", "АЗС", "Гараж",
  // Разное
  "Помещение", "Фитнес", "Склад", "Конференц-зал", "Образовательный центр", "Медицинский центр", 
  "Студии", "Здания", "Бизнес центр", "Промзона", "Промбаза", "Завод", "Крестьянское хозяйство", 
  "МЖС", "МАФ",
  // Участки
  "Дача", "Участок под ИЖС", "Участок под ЛПХ", "Дачный участок",
  // Отдых-лечение
  "Зоны отдыха", "База отдыха", "Санаторий"
];

let currentSuggestions = [];
let selectedIndex = -1;
let currentPropertySuggestions = [];
let selectedPropertyIndex = -1;

function showSuggestions(input, suggestions, dropdownId, currentArray, selectedIndexVar) {
  const value = input.value.toLowerCase();
  const filteredSuggestions = suggestions.filter(item => 
    item.toLowerCase().includes(value)
  ).slice(0, 10);
  
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = '';
  
  if (filteredSuggestions.length > 0 && value.length > 0) {
    filteredSuggestions.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'suggestion-item';
      itemElement.textContent = item;
      itemElement.addEventListener('click', () => {
        input.value = item;
        hideSuggestions(dropdownId);
      });
      dropdown.appendChild(itemElement);
    });
    dropdown.style.display = 'block';
    currentArray = filteredSuggestions;
  } else {
    hideSuggestions(dropdownId);
  }
}

function showCitySuggestions(input) {
  showSuggestions(input, cities, 'suggestions', currentSuggestions, selectedIndex);
}

function showPropertySuggestions(input) {
  showSuggestions(input, propertyTypes, 'property-suggestions', currentPropertySuggestions, selectedPropertyIndex);
}

function hideSuggestions(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.style.display = 'none';
  if (dropdownId === 'suggestions') {
    selectedIndex = -1;
  } else {
    selectedPropertyIndex = -1;
  }
}

// Функция для перевода кнопок
function translateButtons(lang) {
    const t = translations[lang];
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
        const title = button.querySelector('h3');
        const description = button.querySelector('p');
        
        if (title) {
            if (lang === 'kz') {
                title.textContent = button.getAttribute('data-kz') || title.textContent;
            } else {
                title.textContent = button.getAttribute('data-ru') || title.textContent;
            }
        }
        
        // Переводим описания кнопок
        if (description) {
            const buttonClass = button.className;
            if (buttonClass.includes('action-rent')) {
                description.textContent = t.rentDesc;
            } else if (buttonClass.includes('action-rent-out')) {
                description.textContent = t.rentOutDesc;
            } else if (buttonClass.includes('action-buy')) {
                description.textContent = t.buyDesc;
            } else if (buttonClass.includes('action-sell')) {
                description.textContent = t.sellDesc;
            } else if (buttonClass.includes('action-search')) {
                description.textContent = t.searchDesc;
            } else if (buttonClass.includes('action-credit')) {
                description.textContent = t.creditDesc;
            }
        }
    });
}

// --- Перевод фильтров поиска (search.html) ---
function translateSearchFilters(lang) {
    const t = translations[lang];
    // Фильтры
    const filterLabels = [
        { selector: 'label[for="categoryFilter"]', ru: 'Категория', kz: 'Санат' },
        { selector: 'label[for="actionFilter"]', ru: 'Действие', kz: 'Әрекет' },
        { selector: 'label[for="priceFrom"]', ru: 'Цена от', kz: 'Бағасы (бастап)' },
        { selector: 'label[for="priceTo"]', ru: 'Цена до', kz: 'Бағасы (дейін)' },
        { selector: 'label[for="areaFrom"]', ru: 'Площадь от', kz: 'Ауданы (бастап)' },
        { selector: 'label[for="areaTo"]', ru: 'Площадь до', kz: 'Ауданы (дейін)' },
        { selector: 'label[for="roomsFilter"]', ru: 'Количество комнат', kz: 'Бөлме саны' },
        { selector: 'label[for="cityFilter"]', ru: 'Город', kz: 'Қала' },
        { selector: 'label[for="statusFilter"]', ru: 'Статус', kz: 'Статус' },
        { selector: 'label[for="premiumFilter"]', ru: 'Тип объявления', kz: 'Хабарландыру түрі' }
    ];
    filterLabels.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) el.textContent = lang === 'kz' ? item.kz : item.ru;
    });
    // Опции фильтров
    // Категория
    const categoryOptions = [
        { ru: 'Все категории', kz: 'Барлық санаттар' },
        { ru: 'Жильё', kz: 'Тұрғын үй' },
        { ru: 'Койко-места', kz: 'Койко-орындар' },
        { ru: 'Недвижимость', kz: 'Жылжымайтын мүлік' },
        { ru: 'Общепит', kz: 'Қоғамдық тамақтану' },
        { ru: 'Торговля и услуги', kz: 'Сауда және қызметтер' },
        { ru: 'Место', kz: 'Орын' },
        { ru: 'Авто', kz: 'Авто' },
        { ru: 'Разное', kz: 'Әртүрлі' },
        { ru: 'Участки', kz: 'Учаскелер' },
        { ru: 'Отдых — лечение', kz: 'Демалыс — емдеу' }
    ];
    const categorySelect = document.getElementById('categoryFilter');
    if (categorySelect) {
        Array.from(categorySelect.options).forEach((opt, i) => {
            if (categoryOptions[i]) opt.textContent = lang === 'kz' ? categoryOptions[i].kz : categoryOptions[i].ru;
        });
    }
    // Действие
    const actionOptions = [
        { ru: 'Все действия', kz: 'Барлық әрекеттер' },
        { ru: 'Снять', kz: 'Жалға алу' },
        { ru: 'Сдать', kz: 'Жалға беру' },
        { ru: 'Купить', kz: 'Сатып алу' },
        { ru: 'Продать', kz: 'Сату' }
    ];
    const actionSelect = document.getElementById('actionFilter');
    if (actionSelect) {
        Array.from(actionSelect.options).forEach((opt, i) => {
            if (actionOptions[i]) opt.textContent = lang === 'kz' ? actionOptions[i].kz : actionOptions[i].ru;
        });
    }
    // Комнаты
    const roomsOptions = [
        { ru: 'Любое', kz: 'Кез келген' },
        { ru: '1 комната', kz: '1 бөлме' },
        { ru: '2 комнаты', kz: '2 бөлме' },
        { ru: '3 комнаты', kz: '3 бөлме' },
        { ru: '4+ комнат', kz: '4+ бөлме' }
    ];
    const roomsSelect = document.getElementById('roomsFilter');
    if (roomsSelect) {
        Array.from(roomsSelect.options).forEach((opt, i) => {
            if (roomsOptions[i]) opt.textContent = lang === 'kz' ? roomsOptions[i].kz : roomsOptions[i].ru;
        });
    }
    // Статус
    const statusOptions = [
        { ru: 'Все статусы', kz: 'Барлық статус' },
        { ru: 'На модерации', kz: 'Модерацияда' },
        { ru: 'Одобрено', kz: 'Бекітілген' },
        { ru: 'Отклонено', kz: 'Қабылданбаған' }
    ];
    const statusSelect = document.getElementById('statusFilter');
    if (statusSelect) {
        Array.from(statusSelect.options).forEach((opt, i) => {
            if (statusOptions[i]) opt.textContent = lang === 'kz' ? statusOptions[i].kz : statusOptions[i].ru;
        });
    }
    // Тип объявления
    const premiumOptions = [
        { ru: 'Все объявления', kz: 'Барлық хабарландыру' },
        { ru: 'Премиум', kz: 'Премиум' },
        { ru: 'ТОП', kz: 'ТОП' },
        { ru: 'VIP', kz: 'VIP' }
    ];
    const premiumSelect = document.getElementById('premiumFilter');
    if (premiumSelect) {
        Array.from(premiumSelect.options).forEach((opt, i) => {
            if (premiumOptions[i]) opt.textContent = lang === 'kz' ? premiumOptions[i].kz : premiumOptions[i].ru;
        });
    }
    // Сортировка
    const sortOptions = [
        { ru: 'Сначала новые', kz: 'Алдымен жаңалары' },
        { ru: 'Сначала старые', kz: 'Алдымен ескілері' },
        { ru: 'Цена по возрастанию', kz: 'Баға өсуі бойынша' },
        { ru: 'Цена по убыванию', kz: 'Баға кемуі бойынша' },
        { ru: 'Площадь по возрастанию', kz: 'Ауданы өсуі бойынша' },
        { ru: 'Площадь по убыванию', kz: 'Ауданы кемуі бойынша' }
    ];
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        Array.from(sortSelect.options).forEach((opt, i) => {
            if (sortOptions[i]) opt.textContent = lang === 'kz' ? sortOptions[i].kz : sortOptions[i].ru;
        });
    }
    // Кнопка очистки
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) clearBtn.textContent = lang === 'kz' ? 'Тазарту' : 'Очистить';
    // Заголовок фильтров
    const filtersTitle = document.querySelector('.filters-title');
    if (filtersTitle) filtersTitle.textContent = lang === 'kz' ? 'Іздеу сүзгілері' : 'Фильтры поиска';
    // Плейсхолдеры
    const cityInput = document.getElementById('cityFilter');
    if (cityInput) cityInput.placeholder = lang === 'kz' ? 'Қаланы енгізіңіз' : 'Введите город';
    const priceFromInput = document.getElementById('priceFrom');
    if (priceFromInput) priceFromInput.placeholder = lang === 'kz' ? '0' : '0';
    const priceToInput = document.getElementById('priceTo');
    if (priceToInput) priceToInput.placeholder = lang === 'kz' ? '∞' : '∞';
    const areaFromInput = document.getElementById('areaFrom');
    if (areaFromInput) areaFromInput.placeholder = lang === 'kz' ? '0' : '0';
    const areaToInput = document.getElementById('areaTo');
    if (areaToInput) areaToInput.placeholder = lang === 'kz' ? '∞' : '∞';
}

// Функция для перевода интерфейса
function translateInterface(lang) {
    const t = translations[lang];
    
    // Навигация
    document.querySelectorAll('.nav-link').forEach((el, i) => {
        if (t.nav[i]) {
            el.textContent = t.nav[i];
        }
    });
    
    // Кнопки в хедере
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        const registerBtn = authButtons.querySelector('a[href="register.html"]');
        const loginBtn = authButtons.querySelector('a[href="login.html"]');
        if (registerBtn) registerBtn.textContent = t.register;
        if (loginBtn) loginBtn.textContent = t.login;
    }
    
    // Цитата
    const quote = document.querySelector('.quote');
    const quoteAuthor = document.querySelector('.quote-author');
    if (quote) quote.textContent = t.quote;
    if (quoteAuthor) quoteAuthor.textContent = t.author;
    
    // Баннер
    const bannerTitle = document.querySelector('.banner-text h2');
    const bannerSubtitle = document.querySelector('.banner-text p');
    if (bannerTitle) {
        if (lang === 'kz') {
            bannerTitle.textContent = t.bannerTitle;
            bannerSubtitle.textContent = t.bannerSubtitle;
        } else {
            bannerTitle.textContent = t.bannerTitle;
            bannerSubtitle.textContent = t.bannerSubtitle;
        }
    }
    
    // Футер
    const footerLink = document.querySelector('.footer-link');
    if (footerLink) footerLink.textContent = t.privacy;
    
    // Переводы для страниц авторизации
    const backToMainBtn = document.querySelector('a[href="index.html"]');
    if (backToMainBtn) backToMainBtn.textContent = t.backToMain;
    
    // Заголовки и подзаголовки
    const authTitle = document.querySelector('.auth-title');
    const authSubtitle = document.querySelector('.auth-subtitle');
    
    if (authTitle) {
        if (window.location.pathname.includes('register.html')) {
            authTitle.textContent = t.registration;
        } else if (window.location.pathname.includes('login.html')) {
            authTitle.textContent = t.loginTitle;
        }
    }
    
    if (authSubtitle) {
        if (window.location.pathname.includes('register.html')) {
            authSubtitle.textContent = t.registrationSubtitle;
        } else if (window.location.pathname.includes('login.html')) {
            authSubtitle.textContent = t.loginSubtitle;
        }
    }
    
    // Поля формы
    const fullNameLabel = document.querySelector('label[for="fullName"]');
    const phoneLabel = document.querySelector('label[for="phone"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const passwordLabel = document.querySelector('label[for="password"]');
    const confirmPasswordLabel = document.querySelector('label[for="confirmPassword"]');
    
    if (fullNameLabel) fullNameLabel.textContent = t.fullName;
    if (phoneLabel) phoneLabel.textContent = t.phoneNumber;
    if (emailLabel) emailLabel.textContent = t.email;
    if (passwordLabel) passwordLabel.textContent = t.password;
    if (confirmPasswordLabel) confirmPasswordLabel.textContent = t.confirmPassword;
    
    // Кнопки
    const registerBtn = document.querySelector('#registerBtn');
    const loginBtn = document.querySelector('button[type="submit"]');
    
    if (registerBtn) registerBtn.textContent = t.registerBtn;
    if (loginBtn && !registerBtn) loginBtn.textContent = t.loginBtn;
    
    // Ссылки
    const authLinks = document.querySelector('.auth-links');
    if (authLinks) {
        const links = authLinks.querySelectorAll('p');
        links.forEach(link => {
            if (link.textContent.includes('Уже есть аккаунт?')) {
                link.innerHTML = `${t.alreadyHaveAccount} <a href="login.html">${t.loginLink}</a>`;
            } else if (link.textContent.includes('Нет аккаунта?')) {
                link.innerHTML = `${t.noAccount} <a href="register.html">${t.registerLink}</a>`;
            }
        });
    }
}

// Обработчики переключения языка
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            
            // Переводим интерфейс
            translateInterface(lang);
            // Переводим кнопки
            translateButtons(lang);
            // Переводим фильтры поиска
            translateSearchFilters(lang);
        });
    });
});

// Обработчики для основных кнопок действий
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "Снять"
    const rentBtn = document.querySelector('.action-rent');
    if (rentBtn) {
        rentBtn.addEventListener('click', function() {
            showInfo(t.rentDesc);
        });
    }
    
    // Кнопка "Сдать"
    const rentOutBtn = document.querySelector('.action-rent-out');
    if (rentOutBtn) {
        rentOutBtn.addEventListener('click', function() {
            showInfo(t.rentOutDesc);
        });
    }
    
    // Кнопка "Купить"
    const buyBtn = document.querySelector('.action-buy');
    if (buyBtn) {
        buyBtn.addEventListener('click', function() {
            showInfo(t.buyDesc);
        });
    }
    
    // Кнопка "Продать"
    const sellBtn = document.querySelector('.action-sell');
    if (sellBtn) {
        sellBtn.addEventListener('click', function() {
            showInfo(t.sellDesc);
        });
    }
    
    // Кнопка "Кредит"
    const creditBtn = document.querySelector('.action-credit');
    if (creditBtn) {
        creditBtn.addEventListener('click', function() {
            showInfo(t.creditDesc);
        });
    }

    // Кнопка "Поиск"
    const searchBtn = document.querySelector('.action-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showInfo(t.searchDesc);
        });
    }
});

// --- Анимации главного экрана ---
document.addEventListener('DOMContentLoaded', function() {
  // Анимация логотипа
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.classList.add('animated', 'fade-in-up', 'visible');
  }

  // Центральный баннер
  const banner = document.querySelector('.central-banner');
  if (banner) {
    banner.classList.add('animated', 'fade-in-up', 'visible');
    setTimeout(() => banner.classList.add('visible'), 100);
  }

  // Action-кнопки (staggered)
  const actionBtns = document.querySelectorAll('.action-btn');
  actionBtns.forEach((btn, i) => {
    btn.classList.add('animated', 'fade-in-up', `stagger-${i}`);
    setTimeout(() => btn.classList.add('visible'), 300 + i * 120);
  });

  // Цитата
  const quoteSection = document.querySelector('.quote-section');
  if (quoteSection) {
    quoteSection.classList.add('animated', 'fade-in', 'visible');
    setTimeout(() => quoteSection.classList.add('visible'), 1000);
  }

  // Боковые баннеры (если есть)
  const adBanners = document.querySelectorAll('.ad-banner');
  adBanners.forEach((ad, i) => {
    ad.classList.add('animated', 'scale-in');
    setTimeout(() => ad.classList.add('visible'), 700 + i * 200);
  });

  // Анимация появления для всех animated
  document.querySelectorAll('.animated').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
  });
});

// По умолчанию русский
translateInterface('ru');
translateButtons('ru');
document.querySelector('.lang-btn[data-lang="ru"]').classList.add('active'); 