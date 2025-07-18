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

// По умолчанию русский
translateInterface('ru');
translateButtons('ru');
document.querySelector('.lang-btn[data-lang="ru"]').classList.add('active'); 