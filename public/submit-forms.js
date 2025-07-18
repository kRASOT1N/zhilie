// submit-forms.js

// Система тарифов
const tariffs = {
  free: {
    id: 'free',
    ru: 'Бесплатно',
    kz: 'Тегін',
    price: 0,
    features: [
      { ru: 'Поднятие верх 3 раза', kz: 'Жоғары көтеру 3 рет' }
    ]
  },
  start: {
    id: 'start',
    ru: 'Старт',
    kz: 'Старт',
    price: 377,
    features: [
      { ru: 'В значке в ТОП в течение 5 дней', kz: 'ТОП белгішесінде 5 күн бойы' }
    ]
  },
  turbo: {
    id: 'turbo',
    ru: 'Турбо продажа',
    kz: 'Турбо сату',
    price: 977,
    features: [
      { ru: 'Поднятие верх 5 раз', kz: 'Жоғары көтеру 5 рет' },
      { ru: 'В значке в ТОП в течение 5 дней', kz: 'ТОП белгішесінде 5 күн бойы' }
    ]
  },
  vip: {
    id: 'vip',
    ru: 'VIP-объявление',
    kz: 'VIP-хабарландыру',
    price: 1977,
    features: [
      { ru: 'Отображается постоянно в VIP-объявление в течение 5 дней', kz: 'VIP-хабарландыруда үнемі көрсетіледі 5 күн бойы' },
      { ru: 'В значке в ТОП в течение 5 дней', kz: 'ТОП белгішесінде 5 күн бойы' },
      { ru: 'Выше всех объявлений 5 дней', kz: 'Барлық хабарландырулардан жоғары 5 күн' }
    ]
  }
};

const additionalServices = {
  top: {
    id: 'top',
    ru: 'В значке в ТОП в течение 5 дней',
    kz: 'ТОП белгішесінде 5 күн бойы',
    price: 500
  },
  above: {
    id: 'above',
    ru: 'Выше всех объявлений 5 дней',
    kz: 'Барлық хабарландырулардан жоғары 5 күн',
    price: 1000
  }
};

let userBalance = 0;
let selectedTariff = 'free';
let selectedServices = [];
let isLoadingBalance = true; // Флаг загрузки баланса
let isSubmitting = false; // Флаг отправки формы

const submitCategories = [
  {
    key: 'housing',
    ru: 'Жильё',
    kz: 'Тұрғын үй',
    subcategories: [
      {value: 'apartment', ru: 'Квартира', kz: 'Пәтер'},
      {value: 'house', ru: 'Дом', kz: 'Үй'},
      {value: 'cottage', ru: 'Коттедж', kz: 'Коттедж'},
      {value: 'room', ru: 'Комната', kz: 'Бөлме'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Вид жилья', kz: 'Тұрғын үй түрі', type: 'select', required: true, options: [
        {value: 'apartment', ru: 'Квартира', kz: 'Пәтер'},
        {value: 'house', ru: 'Дом', kz: 'Үй'},
        {value: 'cottage', ru: 'Коттедж', kz: 'Коттедж'},
        {value: 'room', ru: 'Комната', kz: 'Бөлме'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название жилья', kz: 'Тұрғын үй атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес / Местоположение', kz: 'Мекенжай / Орналасуы', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true, placeholder: '+7 (777) 123-45-67'},
      {name: 'price', ru: 'Цена', kz: 'Бағасы', type: 'number', required: true, min: 0},
      {name: 'rooms', ru: 'Количество мест / комнат', kz: 'Бөлмелер / орын саны', type: 'number', required: false, min: 1},
      {name: 'description', ru: 'Описание / Особенности', kz: 'Сипаттама / Ерекшеліктері', type: 'textarea', required: false},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false},
      {name: 'extra', ru: 'Дополнительно (Wi-Fi, парковка и пр.)', kz: 'Қосымша (Wi-Fi, тұрақ және т.б.)', type: 'text', required: false}
    ]
  },
  {
    key: 'bed',
    ru: 'Койко-места',
    kz: 'Койка-орындар',
    subcategories: [
      {value: 'hostel', ru: 'в хостеле', kz: 'хостелде'},
      {value: 'dormitory', ru: 'Койко-места в общежитие', kz: 'Жатақханадағы койка-орындар'},
      {value: 'room-bed', ru: 'Койко-места в комнате', kz: 'Бөлмедегі койка-орындар'},
      {value: 'apartment-bed', ru: 'Койко-места в квартире', kz: 'Пәтердегі койка-орындар'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Вид койко-места', kz: 'Койка-орын түрі', type: 'select', required: true, options: [
        {value: 'hostel', ru: 'в хостеле', kz: 'хостелде'},
        {value: 'dormitory', ru: 'Койко-места в общежитие', kz: 'Жатақханадағы койка-орындар'},
        {value: 'room-bed', ru: 'Койко-места в комнате', kz: 'Бөлмедегі койка-орындар'},
        {value: 'apartment-bed', ru: 'Койко-места в квартире', kz: 'Пәтердегі койка-орындар'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название объекта', kz: 'Нысан атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес', kz: 'Мекенжай', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты (телефон/сайт)', kz: 'Байланыс (телефон/сайт)', type: 'text', required: true},
      {name: 'beds', ru: 'Количество койко-мест', kz: 'Койка-орын саны', type: 'number', required: true, min: 1},
      {name: 'price', ru: 'Цена за койко-место', kz: 'Койка-орын бағасы', type: 'number', required: true, min: 0},
      {name: 'description', ru: 'Описание/условия', kz: 'Сипаттама/шарттар', type: 'textarea', required: false},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false},
      {name: 'extra', ru: 'Дополнительные услуги', kz: 'Қосымша қызметтер', type: 'text', required: false}
    ]
  },
  {
    key: 'realestate',
    ru: 'Недвижимость',
    kz: 'Жылжымайтын мүлік',
    subcategories: [
      {value: 'hotel', ru: 'Гостиница', kz: 'Қонақ үй'},
      {value: 'dormitory', ru: 'Общежитие', kz: 'Жатақхана'},
      {value: 'hostel', ru: 'Хостел', kz: 'Хостел'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип недвижимости', kz: 'Жылжымайтын мүлік түрі', type: 'select', required: true, options: [
        {value: 'hotel', ru: 'Гостиница', kz: 'Қонақ үй'},
        {value: 'dormitory', ru: 'Общежитие', kz: 'Жатақхана'},
        {value: 'hostel', ru: 'Хостел', kz: 'Хостел'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название объекта', kz: 'Нысан атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес/локация', kz: 'Мекенжай/орналасуы', type: 'text', required: true},
      {name: 'area', ru: 'Площадь (кв. м)', kz: 'Ауданы (шаршы м)', type: 'number', required: true, min: 0},
      {name: 'price', ru: 'Цена', kz: 'Бағасы', type: 'number', required: true, min: 0},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'description', ru: 'Описание', kz: 'Сипаттама', type: 'textarea', required: false},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false}
    ]
  },
  {
    key: 'food',
    ru: 'Общепит',
    kz: 'Қоғамдық тамақтану',
    subcategories: [
      {value: 'cafe', ru: 'Кафе', kz: 'Кафе'},
      {value: 'restaurant', ru: 'Ресторан', kz: 'Ресторан'},
      {value: 'banquet', ru: 'Банкетный зал', kz: 'Банкет залы'},
      {value: 'canteen', ru: 'Столовая', kz: 'Асхана'},
      {value: 'beer-bar', ru: 'Пивной бар', kz: 'Сыра бары'},
      {value: 'doner', ru: 'Донерная', kz: 'Донерхана'},
      {value: 'culinary', ru: 'Кулинария', kz: 'Кулинария'},
      {value: 'fastfood', ru: 'Фасфуд', kz: 'Фастфуд'},
      {value: 'shashlyk', ru: 'Шашлычная', kz: 'Шашлықхана'},
      {value: 'beer-shop', ru: 'Пивной магазин', kz: 'Сыра дүкені'},
      {value: 'buffet', ru: 'Буфет', kz: 'Буфет'},
      {value: 'bakery', ru: 'Пекарня', kz: 'Нан зауыты'},
      {value: 'workshop', ru: 'Цеха', kz: 'Цехтар'},
      {value: 'tandyr', ru: 'Тандырная', kz: 'Тандырхана'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип заведения', kz: 'Мекеме түрі', type: 'select', required: true, options: [
        {value: 'cafe', ru: 'Кафе', kz: 'Кафе'},
        {value: 'restaurant', ru: 'Ресторан', kz: 'Ресторан'},
        {value: 'banquet', ru: 'Банкетный зал', kz: 'Банкет залы'},
        {value: 'canteen', ru: 'Столовая', kz: 'Асхана'},
        {value: 'beer-bar', ru: 'Пивной бар', kz: 'Сыра бары'},
        {value: 'doner', ru: 'Донерная', kz: 'Донерхана'},
        {value: 'culinary', ru: 'Кулинария', kz: 'Кулинария'},
        {value: 'fastfood', ru: 'Фасфуд', kz: 'Фастфуд'},
        {value: 'shashlyk', ru: 'Шашлычная', kz: 'Шашлықхана'},
        {value: 'beer-shop', ru: 'Пивной магазин', kz: 'Сыра дүкені'},
        {value: 'buffet', ru: 'Буфет', kz: 'Буфет'},
        {value: 'bakery', ru: 'Пекарня', kz: 'Нан зауыты'},
        {value: 'workshop', ru: 'Цеха', kz: 'Цехтар'},
        {value: 'tandyr', ru: 'Тандырная', kz: 'Тандырхана'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название заведения', kz: 'Мекеме атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес', kz: 'Мекенжай', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'cuisine', ru: 'Тип кухни / специализация', kz: 'Асхана түрі / мамандануы', type: 'text', required: true},
      {name: 'price', ru: 'Цена (средний чек)', kz: 'Бағасы (орташа чек)', type: 'number', required: true, min: 0},
      {name: 'schedule', ru: 'График работы', kz: 'Жұмыс уақыты', type: 'text', required: false},
      {name: 'description', ru: 'Описание / преимущества', kz: 'Сипаттама / артықшылықтар', type: 'textarea', required: false},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false}
    ]
  },
  {
    key: 'service',
    ru: 'Торговля и услуги',
    kz: 'Сауда және қызметтер',
    subcategories: [
      {value: 'shop', ru: 'Магазин', kz: 'Дүкен'},
      {value: 'sauna', ru: 'Сауна', kz: 'Сауна'},
      {value: 'kindergarten', ru: 'Садик', kz: 'Балабақша'},
      {value: 'hairdresser', ru: 'Парикмахерская', kz: 'Шаштараз'},
      {value: 'beauty-salon', ru: 'Салон красоты', kz: 'Сұлулық салоны'},
      {value: 'atelier', ru: 'Ателье', kz: 'Ателье'},
      {value: 'pharmacy', ru: 'Аптека', kz: 'Дәріхана'},
      {value: 'office', ru: 'Офис', kz: 'Кеңсе'},
      {value: 'boutique', ru: 'Бутик', kz: 'Бутик'},
      {value: 'bath', ru: 'Баня', kz: 'Мұңша'},
      {value: 'billiards', ru: 'Бильярдная', kz: 'Бильярд'},
      {value: 'vegetable', ru: 'Овощной', kz: 'Көкөніс'},
      {value: 'cabinet', ru: 'Кабинеты', kz: 'Кабинеттер'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип услуги', kz: 'Қызмет түрі', type: 'select', required: true, options: [
        {value: 'shop', ru: 'Магазин', kz: 'Дүкен'},
        {value: 'sauna', ru: 'Сауна', kz: 'Сауна'},
        {value: 'kindergarten', ru: 'Садик', kz: 'Балабақша'},
        {value: 'hairdresser', ru: 'Парикмахерская', kz: 'Шаштараз'},
        {value: 'beauty-salon', ru: 'Салон красоты', kz: 'Сұлулық салоны'},
        {value: 'atelier', ru: 'Ателье', kz: 'Ателье'},
        {value: 'pharmacy', ru: 'Аптека', kz: 'Дәріхана'},
        {value: 'office', ru: 'Офис', kz: 'Кеңсе'},
        {value: 'boutique', ru: 'Бутик', kz: 'Бутик'},
        {value: 'bath', ru: 'Баня', kz: 'Мұңша'},
        {value: 'billiards', ru: 'Бильярдная', kz: 'Бильярд'},
        {value: 'vegetable', ru: 'Овощной', kz: 'Көкөніс'},
        {value: 'cabinet', ru: 'Кабинеты', kz: 'Кабинеттер'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название предприятия/услуги', kz: 'Кәсіпорын/қызмет атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес', kz: 'Мекенжай', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'service', ru: 'Описание/виды услуг', kz: 'Қызмет түрлері/сипаттамасы', type: 'text', required: true},
      {name: 'price', ru: 'Цена/стоимость', kz: 'Бағасы/құны', type: 'number', required: false, min: 0},
      {name: 'schedule', ru: 'График работы', kz: 'Жұмыс уақыты', type: 'text', required: false},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false}
    ]
  },
  {
    key: 'place',
    ru: 'Место',
    kz: 'Орын',
    subcategories: [
      {value: 'hairdresser-place', ru: 'Место в парикмахерской', kz: 'Шаштараздағы орын'},
      {value: 'beauty-salon-place', ru: 'Место в салоне красоты', kz: 'Сұлулық салонындағы орын'},
      {value: 'atelier-place', ru: 'Место в ателье', kz: 'Ательедегі орын'},
      {value: 'parking-place', ru: 'Место в паркинге', kz: 'Тұрақтағы орын'},
      {value: 'manicure-place', ru: 'Место для маникюра', kz: 'Маникюрге орын'},
      {value: 'pedicure-place', ru: 'Место для педикюра', kz: 'Педикюрге орын'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип места', kz: 'Орын түрі', type: 'select', required: true, options: [
        {value: 'hairdresser-place', ru: 'Место в парикмахерской', kz: 'Шаштараздағы орын'},
        {value: 'beauty-salon-place', ru: 'Место в салоне красоты', kz: 'Сұлулық салонындағы орын'},
        {value: 'atelier-place', ru: 'Место в ателье', kz: 'Ательедегі орын'},
        {value: 'parking-place', ru: 'Место в паркинге', kz: 'Тұрақтағы орын'},
        {value: 'manicure-place', ru: 'Место для маникюра', kz: 'Маникюрге орын'},
        {value: 'pedicure-place', ru: 'Место для педикюра', kz: 'Педикюрге орын'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название места/площадки', kz: 'Орын/алаң атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес', kz: 'Мекенжай', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'capacity', ru: 'Вместимость', kz: 'Сыйымдылығы', type: 'number', required: true, min: 1},
      {name: 'price', ru: 'Цена аренды', kz: 'Жалдау бағасы', type: 'number', required: true, min: 0},
      {name: 'description', ru: 'Описание', kz: 'Сипаттама', type: 'textarea', required: false},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false}
    ]
  },
  {
    key: 'auto',
    ru: 'Авто',
    kz: 'Авто',
    subcategories: [
      {value: 'car-dealer', ru: 'Авто салон', kz: 'Авто салон'},
      {value: 'lift', ru: 'Подъемник', kz: 'Көтергіш'},
      {value: 'car-wash', ru: 'Автомойка', kz: 'Автомойка'},
      {value: 'service-station', ru: 'СТО', kz: 'СТО'},
      {value: 'auto-service', ru: 'Автосервисы', kz: 'Автосервистер'},
      {value: 'parking', ru: 'Паркинг', kz: 'Тұрақ'},
      {value: 'parking-lot', ru: 'Стоянка', kz: 'Тұрақ'},
      {value: 'tire-service', ru: 'Шиномонтаж', kz: 'Дөңгелек жөндеу'},
      {value: 'gas-station', ru: 'АЗС', kz: 'АЗС'},
      {value: 'garage', ru: 'Гараж', kz: 'Гараж'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип авто услуги', kz: 'Авто қызмет түрі', type: 'select', required: true, options: [
        {value: 'car-dealer', ru: 'Авто салон', kz: 'Авто салон'},
        {value: 'lift', ru: 'Подъемник', kz: 'Көтергіш'},
        {value: 'car-wash', ru: 'Автомойка', kz: 'Автомойка'},
        {value: 'service-station', ru: 'СТО', kz: 'СТО'},
        {value: 'auto-service', ru: 'Автосервисы', kz: 'Автосервистер'},
        {value: 'parking', ru: 'Паркинг', kz: 'Тұрақ'},
        {value: 'parking-lot', ru: 'Стоянка', kz: 'Тұрақ'},
        {value: 'tire-service', ru: 'Шиномонтаж', kz: 'Дөңгелек жөндеу'},
        {value: 'gas-station', ru: 'АЗС', kz: 'АЗС'},
        {value: 'garage', ru: 'Гараж', kz: 'Гараж'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название компании/сервиса', kz: 'Компания/сервис атауы', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'address', ru: 'Адрес', kz: 'Мекенжай', type: 'text', required: true},
      {name: 'description', ru: 'Описание (автопарк/условия)', kz: 'Сипаттама (автопарк/шарттар)', type: 'textarea', required: false},
      {name: 'price', ru: 'Цена', kz: 'Бағасы', type: 'number', required: true, min: 0},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false}
    ]
  },
  {
    key: 'other',
    ru: 'Разное',
    kz: 'Басқа',
    subcategories: [
      {value: 'premises', ru: 'Помещение', kz: 'Бөлме'},
      {value: 'fitness', ru: 'Фитнес', kz: 'Фитнес'},
      {value: 'warehouse', ru: 'Склад', kz: 'Қойма'},
      {value: 'conference-hall', ru: 'Конференц-зал', kz: 'Конференция залы'},
      {value: 'education-center', ru: 'Образовательный центр', kz: 'Білім беру орталығы'},
      {value: 'medical-center', ru: 'Медицинский центр', kz: 'Медициналық орталық'},
      {value: 'studio', ru: 'Студии', kz: 'Студиялар'},
      {value: 'building', ru: 'Здания', kz: 'Ғимараттар'},
      {value: 'business-center', ru: 'Бизнес центр', kz: 'Бизнес орталық'},
      {value: 'industrial-zone', ru: 'Промзона', kz: 'Өнеркәсіптік аймақ'},
      {value: 'industrial-base', ru: 'Промбаза', kz: 'Өнеркәсіптік база'},
      {value: 'factory', ru: 'Завод', kz: 'Зауыт'},
      {value: 'farm', ru: 'Крестьянское хозяйство(КХ)', kz: 'Крестьяндық шаруашылық(КХ)'},
      {value: 'mzhs', ru: 'МЖС(многоэтажное жилое строительство)', kz: 'МЖС(көпқабатты тұрғын үй құрылысы)'},
      {value: 'maf', ru: 'МАФ(малая архитектурная форма)', kz: 'МАФ(кіші сәулет формасы)'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип объекта', kz: 'Нысан түрі', type: 'select', required: true, options: [
        {value: 'premises', ru: 'Помещение', kz: 'Бөлме'},
        {value: 'fitness', ru: 'Фитнес', kz: 'Фитнес'},
        {value: 'warehouse', ru: 'Склад', kz: 'Қойма'},
        {value: 'conference-hall', ru: 'Конференц-зал', kz: 'Конференция залы'},
        {value: 'education-center', ru: 'Образовательный центр', kz: 'Білім беру орталығы'},
        {value: 'medical-center', ru: 'Медицинский центр', kz: 'Медициналық орталық'},
        {value: 'studio', ru: 'Студии', kz: 'Студиялар'},
        {value: 'building', ru: 'Здания', kz: 'Ғимараттар'},
        {value: 'business-center', ru: 'Бизнес центр', kz: 'Бизнес орталық'},
        {value: 'industrial-zone', ru: 'Промзона', kz: 'Өнеркәсіптік аймақ'},
        {value: 'industrial-base', ru: 'Промбаза', kz: 'Өнеркәсіптік база'},
        {value: 'factory', ru: 'Завод', kz: 'Зауыт'},
        {value: 'farm', ru: 'Крестьянское хозяйство(КХ)', kz: 'Крестьяндық шаруашылық(КХ)'},
        {value: 'mzhs', ru: 'МЖС(многоэтажное жилое строительство)', kz: 'МЖС(көпқабатты тұрғын үй құрылысы)'},
        {value: 'maf', ru: 'МАФ(малая архитектурная форма)', kz: 'МАФ(кіші сәулет формасы)'}
      ]},
      {name: 'title', ru: 'Название/вид услуги/товара', kz: 'Қызмет/тауар атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес/местоположение', kz: 'Мекенжай/орналасуы', type: 'text', required: false},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'description', ru: 'Описание', kz: 'Сипаттама', type: 'textarea', required: false},
      {name: 'price', ru: 'Цена', kz: 'Бағасы', type: 'number', required: false, min: 0}
    ]
  },
  {
    key: 'land',
    ru: 'Участки',
    kz: 'Жер телімдері',
    subcategories: [
      {value: 'dacha', ru: 'Дача', kz: 'Дача'},
      {value: 'izhs', ru: 'Участок под ИЖС', kz: 'ИЖС үшін учаск'},
      {value: 'lph', ru: 'Участок под ЛПХ', kz: 'ЛПХ үшін учаск'},
      {value: 'dacha-plot', ru: 'Дачный участок', kz: 'Дача учаскі'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип участка', kz: 'Участок түрі', type: 'select', required: true, options: [
        {value: 'dacha', ru: 'Дача', kz: 'Дача'},
        {value: 'izhs', ru: 'Участок под ИЖС', kz: 'ИЖС үшін учаск'},
        {value: 'lph', ru: 'Участок под ЛПХ', kz: 'ЛПХ үшін учаск'},
        {value: 'dacha-plot', ru: 'Дачный участок', kz: 'Дача учаскі'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название участка', kz: 'Участок атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес/локация', kz: 'Мекенжай/орналасуы', type: 'text', required: true},
      {name: 'area', ru: 'Площадь', kz: 'Ауданы', type: 'number', required: true, min: 0},
      {name: 'price', ru: 'Цена', kz: 'Бағасы', type: 'number', required: true, min: 0},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'description', ru: 'Описание', kz: 'Сипаттама', type: 'textarea', required: false}
    ]
  },
  {
    key: 'leisure',
    ru: 'Отдых — лечение',
    kz: 'Демалыс — емдеу',
    subcategories: [
      {value: 'recreation-zone', ru: 'Зоны отдыха', kz: 'Демалыс аймақтары'},
      {value: 'recreation-base', ru: 'База отдыха', kz: 'Демалыс базасы'},
      {value: 'sanatorium', ru: 'Санаторий', kz: 'Санаторий'},
      {value: 'other', ru: 'Другие', kz: 'Басқа'}
    ],
    fields: [
      {name: 'action', ru: 'Действие', kz: 'Әрекет', type: 'select', required: true, options: [
        {value: 'rent', ru: 'Снять', kz: 'Жалға алу'},
        {value: 'rent-out', ru: 'Сдать', kz: 'Жалға беру'},
        {value: 'buy', ru: 'Купить', kz: 'Сатып алу'},
        {value: 'sell', ru: 'Продать', kz: 'Сату'}
      ]},
      {name: 'subcategory', ru: 'Тип объекта', kz: 'Нысан түрі', type: 'select', required: true, options: [
        {value: 'recreation-zone', ru: 'Зоны отдыха', kz: 'Демалыс аймақтары'},
        {value: 'recreation-base', ru: 'База отдыха', kz: 'Демалыс базасы'},
        {value: 'sanatorium', ru: 'Санаторий', kz: 'Санаторий'},
        {value: 'other', ru: 'Другие', kz: 'Басқа'}
      ]},
      {name: 'title', ru: 'Название объекта', kz: 'Нысан атауы', type: 'text', required: true},
      {name: 'address', ru: 'Адрес/местоположение', kz: 'Мекенжай/орналасуы', type: 'text', required: true},
      {name: 'contacts', ru: 'Контакты', kz: 'Байланыс', type: 'text', required: true},
      {name: 'service', ru: 'Описание/виды услуг', kz: 'Қызмет түрлері/сипаттамасы', type: 'text', required: true},
      {name: 'price', ru: 'Цена', kz: 'Бағасы', type: 'number', required: true, min: 0},
      {name: 'photo', ru: 'Фото', kz: 'Фото', type: 'photo', required: false},
      {name: 'extra', ru: 'Особенности/условия', kz: 'Ерекшеліктері/шарттары', type: 'text', required: false}
    ]
  }
];

let currentLang = 'ru';

function renderTabs() {
  const tabs = document.getElementById('submitTabs');
  tabs.innerHTML = '';
  submitCategories.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className = 'submit-tab' + (idx === 0 ? ' active' : '');
    btn.textContent = cat[currentLang];
    btn.onclick = () => selectTab(idx);
    tabs.appendChild(btn);
  });
}

function selectTab(idx) {
  document.querySelectorAll('.submit-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.submit-form').forEach((form, i) => {
    form.classList.toggle('active', i === idx);
  });
}

function renderForms() {
  submitCategories.forEach((cat, idx) => {
    const form = document.getElementById('form-' + cat.key);
    form.innerHTML = '';
    cat.fields.forEach(field => {
      if (field.type === 'photo') {
        form.appendChild(createPhotoField(field));
      } else if (field.type === 'textarea') {
        form.appendChild(createTextareaField(field));
      } else if (field.type === 'select') {
        form.appendChild(createSelectField(field));
      } else {
        form.appendChild(createInputField(field));
      }
    });
    // Кнопка отправки (визуал)
    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'btn';
    submitBtn.style.marginTop = '18px';
    submitBtn.textContent = currentLang === 'kz' ? 'Жариялау' : 'Опубликовать';
    submitBtn.onclick = () => submitForm('form-' + cat.key);
    form.appendChild(submitBtn);
  });
  
  // Проверяем параметры URL и устанавливаем действие
  const params = getUrlParams();
  if (params.action) {
    setActionInTitle(params.action);
  }
}

function calculateTotal() {
  const tariffPrice = tariffs[selectedTariff].price;
  const servicesPrice = selectedServices.reduce((sum, serviceId) => {
    return sum + additionalServices[serviceId].price;
  }, 0);
  return tariffPrice + servicesPrice;
}

function checkBalance() {
  const total = calculateTotal();
  return userBalance >= total;
}

function renderTariffSection() {
  const tariffSection = document.getElementById('tariffSection');
  if (!tariffSection) return;
  
  tariffSection.innerHTML = '';
  
  // Баланс пользователя
  const balanceDiv = document.createElement('div');
  balanceDiv.className = 'balance-info';
  
  if (isLoadingBalance) {
    balanceDiv.innerHTML = `
      <div class="balance-item">
        <span class="balance-label">${currentLang === 'kz' ? 'Баланс:' : 'Баланс:'}</span>
        <span class="balance-loading">
          <span class="loading-spinner"></span>
          ${currentLang === 'kz' ? 'Жүктелуде...' : 'Загрузка...'}
        </span>
      </div>
    `;
  } else {
    balanceDiv.innerHTML = `
      <div class="balance-item">
        <span class="balance-label">${currentLang === 'kz' ? 'Баланс:' : 'Баланс:'}</span>
        <span class="balance-amount">${userBalance} тг</span>
      </div>
    `;
  }
  tariffSection.appendChild(balanceDiv);
  
  // Если баланс загружается, показываем только заголовок тарифов
  if (isLoadingBalance) {
    const loadingTariffsDiv = document.createElement('div');
    loadingTariffsDiv.className = 'tariffs-container';
    loadingTariffsDiv.innerHTML = `
      <div class="tariff-loading">
        <span class="loading-spinner"></span>
        ${currentLang === 'kz' ? 'Тарифтар жүктелуде...' : 'Тарифы загружаются...'}
      </div>
    `;
    tariffSection.appendChild(loadingTariffsDiv);
    return;
  }
  
  // Тарифы
  const tariffsDiv = document.createElement('div');
  tariffsDiv.className = 'tariffs-container';
  
  Object.values(tariffs).forEach(tariff => {
    const tariffCard = document.createElement('div');
    tariffCard.className = `tariff-card ${selectedTariff === tariff.id ? 'selected' : ''}`;
    tariffCard.onclick = () => selectTariff(tariff.id);
    
    const isAffordable = userBalance >= tariff.price;
    if (!isAffordable) tariffCard.classList.add('disabled');
    
    tariffCard.innerHTML = `
      <div class="tariff-header">
        <h3>${tariff[currentLang]}</h3>
        <div class="tariff-price">${tariff.price} тг</div>
      </div>
      <div class="tariff-features">
        ${tariff.features.map(feature => `<div class="feature">• ${feature[currentLang]}</div>`).join('')}
      </div>
      ${!isAffordable ? '<div class="insufficient-funds">Недостаточно средств</div>' : ''}
    `;
    
    tariffsDiv.appendChild(tariffCard);
  });
  
  tariffSection.appendChild(tariffsDiv);
  
  // Дополнительные услуги
  const servicesDiv = document.createElement('div');
  servicesDiv.className = 'services-container';
  servicesDiv.innerHTML = `<h3>${currentLang === 'kz' ? 'Қосымша қызметтер' : 'Дополнительные услуги'}</h3>`;
  
  Object.values(additionalServices).forEach(service => {
    const serviceItem = document.createElement('div');
    serviceItem.className = `service-item ${selectedServices.includes(service.id) ? 'selected' : ''}`;
    
    const isAffordable = userBalance >= (calculateTotal() - (selectedServices.includes(service.id) ? service.price : 0) + service.price);
    if (!isAffordable) serviceItem.classList.add('disabled');
    
    serviceItem.innerHTML = `
      <label class="service-checkbox">
        <input type="checkbox" ${selectedServices.includes(service.id) ? 'checked' : ''} 
               ${!isAffordable ? 'disabled' : ''} 
               onchange="toggleService('${service.id}', this.checked)">
        <span class="service-text">${service[currentLang]}</span>
        <span class="service-price">${service.price} тг</span>
      </label>
    `;
    
    servicesDiv.appendChild(serviceItem);
  });
  
  tariffSection.appendChild(servicesDiv);
  
  // Итого
  const totalDiv = document.createElement('div');
  totalDiv.className = 'total-section';
  const total = calculateTotal();
  const canAfford = checkBalance();
  
  totalDiv.innerHTML = `
    <div class="total-info">
      <span class="total-label">${currentLang === 'kz' ? 'Барлығы:' : 'Итого:'}</span>
      <span class="total-amount">${total} тг</span>
    </div>
    ${!canAfford ? `<div class="insufficient-total">${currentLang === 'kz' ? 'Жеткіліксіз қаражат' : 'Недостаточно средств'}</div>` : ''}
  `;
  
  tariffSection.appendChild(totalDiv);
}

function selectTariff(tariffId) {
  if (userBalance >= tariffs[tariffId].price) {
    selectedTariff = tariffId;
    renderTariffSection();
  }
}

function toggleService(serviceId, checked) {
  if (checked) {
    if (!selectedServices.includes(serviceId)) {
      selectedServices.push(serviceId);
    }
  } else {
    selectedServices = selectedServices.filter(id => id !== serviceId);
  }
  renderTariffSection();
}

function getUserBalance() {
  return new Promise((resolve, reject) => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        if (user && user.phone) {
          // Отправляем запрос на получение баланса
          fetch('https://hook.us2.make.com/w9ka0t8rqjfwk8sf3uejzsrmqpkry72y', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
              phone: formatPhoneNumber(user.phone),
              action: 'get_balance'
            })
          })
          .then(response => response.json())
          .then(data => {
            if (data && data.balances) {
              resolve(parseInt(data.balances) || 0);
            } else {
              resolve(0);
            }
          })
          .catch(error => {
            console.error('Ошибка получения баланса:', error);
            resolve(0);
          });
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    } catch (e) {
      console.error('Ошибка получения баланса:', e);
      resolve(0);
    }
  });
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  const errors = [];
  
  // Проверяем все обязательные поля
  const requiredFields = form.querySelectorAll('.form-input[required], .form-textarea[required], select[required]');
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      const label = form.querySelector(`label[for="${field.id}"]`);
      const fieldName = label ? label.textContent : field.name;
      errors.push(fieldName);
      field.style.borderColor = '#dc3545';
    } else {
      field.style.borderColor = '#e0e0e0';
    }
  });
  
  // Проверяем тариф
  if (selectedTariff === 'free' && selectedServices.length === 0) {
    errors.push(currentLang === 'kz' ? 'Тариф таңдаңыз' : 'Выберите тариф');
  }
  
  return errors;
}

function showErrors(errors) {
  // Удаляем предыдущие ошибки
  const existingErrors = document.querySelectorAll('.form-errors');
  existingErrors.forEach(error => error.remove());
  
  if (errors.length > 0) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-errors';
    errorDiv.innerHTML = `
      <div class="error-message">
        <strong>${currentLang === 'kz' ? 'Қателер:' : 'Ошибки:'}</strong>
        <ul>
          ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
      </div>
    `;
    
    // Вставляем ошибки перед формой
    const activeForm = document.querySelector('.submit-form.active');
    if (activeForm) {
      activeForm.parentNode.insertBefore(errorDiv, activeForm);
    }
  }
}

function collectFormData(formId) {
  const form = document.getElementById(formId);
  const formData = {};
  
  // Базовые поля из формы
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (input.name && input.value) {
      // Форматируем номер телефона если это поле contacts
      if (input.name === 'contacts') {
        formData.contacts = formatPhoneNumber(input.value);
      } else {
        formData[input.name] = input.value;
      }
    }
  });
  
  // Определяем категорию и подкатегорию
  const categoryKey = formId.replace('form-', '');
  const category = submitCategories.find(cat => cat.key === categoryKey);
  
  // Основные поля
  formData.title = formData.title || '';
  formData.description = formData.description || '';
  formData.price = parseInt(formData.price) || 0;
  formData.currency = 'KZT';
  formData.category = category ? category[currentLang] : '';
  formData.subcategory = formData.subcategory || '';
  formData.action = formData.action || '';
  formData.address = formData.address || '';
  formData.area = parseInt(formData.area) || 0;
  formData.rooms = parseInt(formData.rooms) || 0;
  formData.beds = parseInt(formData.beds) || 0;
  formData.capacity = parseInt(formData.capacity) || 0;
  formData.cuisine = formData.cuisine || '';
  formData.schedule = formData.schedule || '';
  formData.service_type = formData.service || '';
  
  // Тариф и услуги
  formData.tariff = selectedTariff;
  formData.additional_services = selectedServices;
  formData.total_price = calculateTotal();
  
  // Информация о пользователе
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      formData.user_id = user.userid || '';
      formData.user_phone = formatPhoneNumber(user.phone || '');
      formData.user_email = user.email || '';
      formData.user_fullname = user.fullname || '';
    }
  } catch (e) {
    formData.user_id = '';
    formData.user_phone = '';
    formData.user_email = '';
    formData.user_fullname = '';
  }
  
  // Статус и модерация
  formData.status = 'pending';
  formData.moderation_comment = '';
  formData.is_active = true;
  
  // Премиум статусы на основе тарифа
  formData.is_premium = selectedTariff === 'vip' || selectedServices.includes('above');
  formData.is_top = selectedTariff === 'start' || selectedTariff === 'turbo' || selectedTariff === 'vip' || selectedServices.includes('top');
  formData.is_vip = selectedTariff === 'vip';
  
  // Даты
  const now = new Date();
  formData.created_at = now.toISOString();
  formData.updated_at = now.toISOString();
  formData.expires_at = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 дней
  formData.published_at = now.toISOString();
  formData.moderated_at = null;
  
  // Статистика
  formData.views_count = 0;
  formData.favorites_count = 0;
  formData.contact_clicks = 0;
  
  // Поиск и локация
  formData.search_keywords = '';
  formData.location_lat = null;
  formData.location_lng = null;
  formData.city = '';
  formData.district = '';
  
  // Медиа
  formData.photos = []; // Будет заполняться при загрузке фото
  formData.video_url = '';
  
  // Автопродление и выделение
  formData.auto_renew = false;
  formData.highlight_until = null;
  formData.top_until = null;
  formData.vip_until = null;
  
  // Устанавливаем даты окончания премиум статусов
  if (formData.is_top) {
    formData.top_until = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 дней
  }
  if (formData.is_vip) {
    formData.vip_until = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 дней
  }
  if (formData.is_premium) {
    formData.highlight_until = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(); // 5 дней
  }
  
  return formData;
}

async function submitForm(formId) {
  if (isSubmitting) return; // Предотвращаем повторную отправку
  
  const errors = validateForm(formId);
  if (errors.length > 0) {
    showErrors(errors);
    return;
  }
  
  isSubmitting = true;
  
  // Показываем индикатор загрузки
  const submitBtn = document.querySelector(`#${formId} button[type="button"]`);
  const originalText = submitBtn.textContent;
  submitBtn.textContent = currentLang === 'kz' ? 'Жіберілуде...' : 'Отправляется...';
  submitBtn.disabled = true;
  
  try {
    const formData = collectFormData(formId);
    
    const response = await fetch('https://hook.us2.make.com/t4mh1klj8ip56rmoknv14nn93bvjq9jy', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const responseData = await response.json();
      
      // Проверяем response на "AdCreated"
      if (responseData && responseData.action === "AdCreated") {
        // Успешная отправка - объявление создано
        showSuccessMessage();
        // Очищаем форму
        document.getElementById(formId).reset();
        selectedServices = [];
        selectedTariff = 'free';
        renderTariffSection();
      } else {
        // Неожиданный response
        throw new Error('Неожиданный ответ от сервера');
      }
    } else {
      throw new Error('Ошибка отправки');
    }
  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    showErrorMessage();
  } finally {
    isSubmitting = false;
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

function showSuccessMessage() {
  const message = currentLang === 'kz' 
    ? 'Хабарландыру сәтті жіберілді!' 
    : 'Объявление успешно отправлено!';
  
  // Создаем уведомление об успехе
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function showErrorMessage() {
  const message = currentLang === 'kz' 
    ? 'Қате орын алды. Қайталап көріңіз.' 
    : 'Произошла ошибка. Попробуйте еще раз.';
  
  // Создаем уведомление об ошибке
  const notification = document.createElement('div');
  notification.className = 'error-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function formatPhoneNumber(phone) {
  // Убираем все символы кроме цифр
  const cleaned = phone.replace(/\D/g, '');
  
  // Если номер начинается с 8, заменяем на 7
  if (cleaned.startsWith('8')) {
    return '7' + cleaned.substring(1);
  }
  
  // Если номер начинается с +7, убираем +
  if (cleaned.startsWith('7')) {
    return cleaned;
  }
  
  // Если номер 11 цифр и начинается с 7, возвращаем как есть
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return cleaned;
  }
  
  // Если номер 10 цифр, добавляем 7 в начало
  if (cleaned.length === 10) {
    return '7' + cleaned;
  }
  
  return cleaned;
}

function getUserPhone() {
  // Пытаемся получить из localStorage
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.phone) {
        return formatPhoneNumber(user.phone);
      }
    }
  } catch (e) {}
  return '';
}

function createInputField(field) {
  const group = document.createElement('div');
  group.className = 'form-group';
  const label = document.createElement('label');
  label.className = 'form-label' + (field.required ? ' required' : '');
  label.textContent = field[currentLang];
  label.htmlFor = field.name;
  const input = document.createElement('input');
  input.className = 'form-input';
  input.type = field.type;
  input.id = field.name;
  input.name = field.name;

  // Автозаполнение для поля контактов
  if (field.name === 'contacts') {
    const phone = getUserPhone();
    if (phone) input.value = phone;
  }

  // Проверяем, нужно ли установить placeholder для поля title
  if (field.name === 'title') {
    const params = getUrlParams();
    if (params.action) {
      const actionTitles = {
        'rent': { ru: 'Снять', kz: 'Жалға алу' },
        'rent-out': { ru: 'Сдать', kz: 'Жалға беру' },
        'buy': { ru: 'Купить', kz: 'Сатып алу' },
        'sell': { ru: 'Продать', kz: 'Сату' }
      };
      if (actionTitles[params.action]) {
        const title = actionTitles[params.action][currentLang];
        input.placeholder = `${title} - `;
      } else {
        input.placeholder = field.placeholder || '';
      }
    } else {
      input.placeholder = field.placeholder || '';
    }
  } else {
    if (field.placeholder) input.placeholder = field.placeholder;
  }

  if (field.required) input.required = true;
  if (field.min !== undefined) input.min = field.min;
  group.appendChild(label);
  group.appendChild(input);
  return group;
}

function createTextareaField(field) {
  const group = document.createElement('div');
  group.className = 'form-group';
  const label = document.createElement('label');
  label.className = 'form-label' + (field.required ? ' required' : '');
  label.textContent = field[currentLang];
  label.htmlFor = field.name;
  const textarea = document.createElement('textarea');
  textarea.className = 'form-textarea';
  textarea.id = field.name;
  textarea.name = field.name;
  if (field.placeholder) textarea.placeholder = field.placeholder;
  if (field.required) textarea.required = true;
  group.appendChild(label);
  group.appendChild(textarea);
  return group;
}

function createSelectField(field) {
  const group = document.createElement('div');
  group.className = 'form-group';
  const label = document.createElement('label');
  label.className = 'form-label' + (field.required ? ' required' : '');
  label.textContent = field[currentLang];
  label.htmlFor = field.name;
  const select = document.createElement('select');
  select.className = 'form-input';
  select.id = field.name;
  select.name = field.name;
  if (field.required) select.required = true;
  
  // Добавляем пустую опцию по умолчанию
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = currentLang === 'kz' ? 'Таңдаңыз' : 'Выберите';
  select.appendChild(defaultOption);
  
  // Добавляем опции
  field.options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option[currentLang];
    select.appendChild(optionElement);
  });
  
  // Если есть параметр action в URL, устанавливаем его
  if (field.name === 'action') {
    const params = getUrlParams();
    if (params.action) {
      select.value = params.action;
    }
  }
  
  // Обработчик изменения для поля action
  if (field.name === 'action') {
    select.onchange = function() {
      updateTitlePlaceholder(this.value);
    };
  }
  
  group.appendChild(label);
  group.appendChild(select);
  return group;
}

function createPhotoField(field) {
  const group = document.createElement('div');
  group.className = 'form-group';
  const label = document.createElement('label');
  label.className = 'form-label' + (field.required ? ' required' : '');
  label.textContent = field[currentLang];
  label.htmlFor = field.name;
  const upload = document.createElement('div');
  upload.className = 'photo-upload';
  upload.textContent = currentLang === 'kz' ? 'Суреттерді сүйреп әкеліңіз немесе таңдаңыз' : 'Перетащите или выберите фото';
  upload.ondragover = e => { e.preventDefault(); upload.classList.add('dragover'); };
  upload.ondragleave = e => { e.preventDefault(); upload.classList.remove('dragover'); };
  upload.onclick = () => fileInput.click();
  upload.ondrop = e => {
    e.preventDefault();
    upload.classList.remove('dragover');
    handleFiles(e.dataTransfer.files, preview, upload);
  };
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  fileInput.onchange = () => handleFiles(fileInput.files, preview, upload);
  const preview = document.createElement('div');
  preview.className = 'photo-preview';
  group.appendChild(label);
  group.appendChild(upload);
  group.appendChild(fileInput);
  group.appendChild(preview);
  return group;
}

function handleFiles(files, preview, upload) {
  preview.innerHTML = '';
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'photo-thumb';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
  upload.textContent = currentLang === 'kz' ? 'Суреттерді сүйреп әкеліңіз немесе таңдаңыз' : 'Перетащите или выберите фото';
}

// Функция для получения параметров из URL
function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    category: urlParams.get('category'),
    action: urlParams.get('action')
  };
}

// Функция для определения индекса категории по ключу
function getCategoryIndex(categoryKey) {
  return submitCategories.findIndex(cat => cat.key === categoryKey);
}

// Функция для установки действия в заголовок формы
function setActionInTitle(action) {
  const actionTitles = {
    'rent': { ru: 'Снять', kz: 'Жалға алу' },
    'rent-out': { ru: 'Сдать', kz: 'Жалға беру' },
    'buy': { ru: 'Купить', kz: 'Сатып алу' },
    'sell': { ru: 'Продать', kz: 'Сату' }
  };
  
  if (actionTitles[action]) {
    const title = actionTitles[action][currentLang];
    // Добавляем префикс к первому полю (название)
    const titleField = document.querySelector('#title');
    if (titleField) {
      titleField.placeholder = `${title} - `;
    }
  }
}

function updateTitlePlaceholder(action) {
  const actionTitles = {
    'rent': { ru: 'Снять', kz: 'Жалға алу' },
    'rent-out': { ru: 'Сдать', kz: 'Жалға беру' },
    'buy': { ru: 'Купить', kz: 'Сатып алу' },
    'sell': { ru: 'Продать', kz: 'Сату' }
  };
  
  if (actionTitles[action]) {
    const title = actionTitles[action][currentLang];
    const titleField = document.querySelector('#title');
    if (titleField) {
      titleField.placeholder = `${title} - `;
    }
  }
}

function setLang(lang) {
  currentLang = lang;
  renderTabs();
  renderForms();
  renderTariffSection();
  
  // Проверяем параметры URL и восстанавливаем состояние
  const params = getUrlParams();
  if (params.category) {
    const categoryIndex = getCategoryIndex(params.category);
    if (categoryIndex !== -1) {
      selectTab(categoryIndex);
      if (params.action) {
        setActionInTitle(params.action);
      }
    } else {
      selectTab(0);
    }
  } else {
    selectTab(0);
  }
  
  // Обновляем placeholder для поля title при смене языка
  const actionSelect = document.querySelector('#action');
  if (actionSelect && actionSelect.value) {
    updateTitlePlaceholder(actionSelect.value);
  }
}

// Языковой переключатель
window.addEventListener('DOMContentLoaded', async () => {
  renderTabs();
  renderForms();
  
  // Проверяем параметры URL сразу
  const params = getUrlParams();
  if (params.category) {
    const categoryIndex = getCategoryIndex(params.category);
    if (categoryIndex !== -1) {
      selectTab(categoryIndex);
      if (params.action) {
        setActionInTitle(params.action);
      }
    } else {
      selectTab(0);
    }
  } else {
    selectTab(0);
  }
  
  // Рендерим секцию тарифов с загрузкой (не блокируя формы)
  renderTariffSection();
  
  // Отправка номера пользователя на вебхук при заходе на страницу
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.phone) {
        fetch('https://hook.us2.make.com/w9ka0t8rqjfwk8sf3uejzsrmqpkry72y', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ phone: formatPhoneNumber(user.phone) })
        });
      }
    }
  } catch (e) {}
  
  // Получаем баланс пользователя асинхронно (не блокируя интерфейс)
  setTimeout(async () => {
    try {
      userBalance = await getUserBalance();
    } catch (e) {
      userBalance = 0;
    } finally {
      isLoadingBalance = false;
      renderTariffSection(); // Перерендериваем только секцию тарифов
    }
  }, 100); // Небольшая задержка для плавности
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      setLang(this.getAttribute('data-lang'));
      
      // Обновляем заголовок при смене языка
      const params = getUrlParams();
      if (params.action) {
        setActionInTitle(params.action);
      }
    };
  });
  // По умолчанию русский
  document.querySelector('.lang-btn[data-lang="ru"]').classList.add('active');
}); 