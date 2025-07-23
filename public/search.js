// search.js

let allAds = []; // ВСЕ объявления, загруженные один раз
let filteredAds = [];
let currentPage = 1;
const adsPerPage = 10;

// Инициализация при загрузке страницы
// Только один запрос к вебхуку
// Фильтрация только на клиенте

document.addEventListener('DOMContentLoaded', function() {
    loadAds();
    setupEventListeners();
});

function setupEventListeners() {
    const filterElements = [
        'categoryFilter', 'actionFilter', 'priceFrom', 'priceTo', 
        'areaFrom', 'areaTo', 'roomsFilter', 'cityFilter', 
        'statusFilter', 'premiumFilter'
    ];
    filterElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', applyFilters);
            element.addEventListener('input', applyFilters);
        }
    });
    document.getElementById('sortSelect').addEventListener('change', applyFilters);
}

// Загрузка объявлений только при загрузке страницы
async function loadAds() {
    showLoading();
    try {
        const response = await fetch('https://hook.us2.make.com/398i0cvsue9lg9kutqtc1phjlmbtnvfh', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sort: 'newest',
                page: 1,
                limit: 10
            }) // Передаем параметры sort, page, limit
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Ответ от вебхука:', data);
            allAds = Array.isArray(data) ? data : [];
            applyFilters();
        } else {
            throw new Error('Ошибка загрузки объявлений');
        }
    } catch (error) {
        console.error('Ошибка загрузки объявлений:', error);
        showError('Ошибка загрузки объявлений');
    }
}

// Применение фильтров только на клиенте зап
function applyFilters() {
    filteredAds = allAds.filter(ad => {
        // Категория
        if (getFilterValue('categoryFilter') && ad.category !== getFilterValue('categoryFilter')) {
            return false;
        }
        // Действие
        if (getFilterValue('actionFilter') && ad.action !== getFilterValue('actionFilter')) {
            return false;
        }
        // Цена
        const price = parseInt(ad.price) || 0;
        const priceFrom = parseInt(getFilterValue('priceFrom')) || 0;
        const priceTo = parseInt(getFilterValue('priceTo')) || Infinity;
        if (price < priceFrom || price > priceTo) {
            return false;
        }
        // Площадь
        const area = parseInt(ad.area) || 0;
        const areaFrom = parseInt(getFilterValue('areaFrom')) || 0;
        const areaTo = parseInt(getFilterValue('areaTo')) || Infinity;
        if (area < areaFrom || area > areaTo) {
            return false;
        }
        // Комнаты
        if (getFilterValue('roomsFilter')) {
            const rooms = parseInt(ad.rooms) || 0;
            const filterRooms = parseInt(getFilterValue('roomsFilter'));
            if (filterRooms === 4 && rooms < 4) return false;
            if (filterRooms !== 4 && rooms !== filterRooms) return false;
        }
        // Город
        if (getFilterValue('cityFilter') && !ad.city?.toLowerCase().includes(getFilterValue('cityFilter').toLowerCase())) {
            return false;
        }
        // Статус
        if (getFilterValue('statusFilter') && ad.status !== getFilterValue('statusFilter')) {
            return false;
        }
        // Премиум статус
        const premiumFilter = getFilterValue('premiumFilter');
        if (premiumFilter) {
            if (premiumFilter === 'premium' && !ad.is_premium) return false;
            if (premiumFilter === 'top' && !ad.is_top) return false;
            if (premiumFilter === 'vip' && !ad.is_vip) return false;
        }
        return true;
    });
    // Сортировка
    const sortBy = getFilterValue('sortSelect');
    filteredAds.sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.created_at) - new Date(a.created_at);
            case 'oldest':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'price_asc':
                return (parseInt(a.price) || 0) - (parseInt(b.price) || 0);
            case 'price_desc':
                return (parseInt(b.price) || 0) - (parseInt(a.price) || 0);
            case 'area_asc':
                return (parseInt(a.area) || 0) - (parseInt(b.area) || 0);
            case 'area_desc':
                return (parseInt(b.area) || 0) - (parseInt(a.area) || 0);
            default:
                return 0;
        }
    });
    currentPage = 1;
    renderAds();
}

function getFilterValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function clearFilters() {
    const filterElements = [
        'categoryFilter', 'actionFilter', 'priceFrom', 'priceTo', 
        'areaFrom', 'areaTo', 'roomsFilter', 'cityFilter', 
        'statusFilter', 'premiumFilter'
    ];
    filterElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    document.getElementById('sortSelect').value = 'newest';
    applyFilters();
}

// --- Избранное ---
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch { return []; }
}
function setFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}
function toggleFavorite(adId) {
    let favs = getFavorites();
    if (favs.includes(adId)) {
        favs = favs.filter(id => id !== adId);
    } else {
        favs.push(adId);
    }
    setFavorites(favs);
    renderAds();
}
function isFavorite(adId) {
    return getFavorites().includes(adId);
}
// --- Избранное ---

// Рендеринг объявлений
function renderAds() {
    const adsGrid = document.getElementById('adsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    // Обновляем счетчик
    resultsCount.textContent = `Найдено ${filteredAds.length} объявлений`;
    
    // Пагинация
    const startIndex = (currentPage - 1) * adsPerPage;
    const endIndex = startIndex + adsPerPage;
    const pageAds = filteredAds.slice(startIndex, endIndex);
    
    // Очищаем сетку
    adsGrid.innerHTML = '';
    
    if (pageAds.length === 0) {
        adsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                <div style="font-size: 18px; margin-bottom: 8px;">Объявления не найдены</div>
                <div style="font-size: 14px;">Попробуйте изменить параметры поиска</div>
            </div>
        `;
    } else {
        // Рендерим карточки
        pageAds.forEach(ad => {
            adsGrid.appendChild(createAdCard(ad));
        });
    }
    
    renderPagination();
}

// Создание карточки объявления
function createAdCard(ad) {
    const card = document.createElement('div');
    card.className = 'ad-card';
    card.onclick = () => openAdDetails(ad);

    // Сердечко избранного (в правом верхнем углу изображения)
    const favBtn = document.createElement('button');
    favBtn.className = 'fav-btn';
    favBtn.innerHTML = isFavorite(ad.id) ? '❤️' : '🤍';
    favBtn.title = isFavorite(ad.id) ? 'Убрать из избранного' : 'В избранное';
    favBtn.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(ad.id);
    };

    // Фото или эмодзи
    let imageBlock = '';
    if (ad.photos && Array.isArray(ad.photos) && ad.photos.length > 0) {
        imageBlock = `<img src="${ad.photos[0]}" alt="${ad.title}">`;
    } else {
        imageBlock = `
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#e8f5e8 0%,#f0f8f0 100%);font-size:64px;color:#b2b2b2;">🏠</div>
        `;
    }

    // Премиум бейдж
    let premiumBadge = '';
    if (ad.is_vip) {
        premiumBadge = '<div class="ad-premium-badge">VIP</div>';
    } else if (ad.is_top) {
        premiumBadge = '<div class="ad-premium-badge">ТОП</div>';
    } else if (ad.is_premium) {
        premiumBadge = '<div class="ad-premium-badge">ПРЕМИУМ</div>';
    }

    // Дата
    const date = ad.created_at ? new Date(ad.created_at).toLocaleDateString('ru-RU') : '';

    // Детали
    let details = '';
    if (ad.rooms) {
        details += `<div class="ad-detail">
            <div class="ad-detail-label">Комнат</div>
            <div class="ad-detail-value">${ad.rooms}</div>
        </div>`;
    }
    if (ad.area) {
        details += `<div class="ad-detail">
            <div class="ad-detail-label">Площадь</div>
            <div class="ad-detail-value">${ad.area} м²</div>
        </div>`;
    }
    if (ad.beds) {
        details += `<div class="ad-detail">
            <div class="ad-detail-label">Мест</div>
            <div class="ad-detail-value">${ad.beds}</div>
        </div>`;
    }

    // Цена
    const price = parseInt(ad.price) || 0;
    const formattedPrice = price.toLocaleString('ru-RU') + ' ₸';

    card.innerHTML = `
        <div class="ad-image" style="min-height:200px;max-height:200px;position:relative;">
            ${imageBlock}
            ${premiumBadge}
            <div class="fav-btn-container" style="position:absolute;top:10px;right:10px;z-index:2;"> </div>
        </div>
        <div class="ad-content">
            <div class="ad-title" title="${ad.title || ''}">${ad.title || 'Без названия'}</div>
            <div class="ad-details">${details}</div>
            <div class="ad-price">${formattedPrice}</div>
            <div class="ad-location">
                ${ad.city ? ad.city : ''} ${ad.district ? `• ${ad.district}` : ''}
            </div>
            <div class="ad-footer">
                <div class="ad-owner">${ad.user_fullname || 'Аноним'}</div>
                <div class="ad-stats">
                    <div class="ad-stat">👁 ${ad.views_count || 0}</div>
                    <div class="ad-stat">★ ${ad.favorites_count || 0}</div>
                    <div class="ad-stat">📅 ${date}</div>
                </div>
            </div>
        </div>
    `;
    card.querySelector('.fav-btn-container').appendChild(favBtn);
    return card;
}

// Рендеринг пагинации
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredAds.length / adsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Кнопка "Назад"
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} 
                onclick="changePage(${currentPage - 1})">
            ←
        </button>
    `;
    
    // Номера страниц
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    // Кнопка "Вперед"
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} 
                onclick="changePage(${currentPage + 1})">
            →
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Смена страницы
function changePage(page) {
    const totalPages = Math.ceil(filteredAds.length / adsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderAds();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// --- Модальное окно для деталей объявления ---
function showAdModal(ad) {
    // Удаляем старую модалку если есть
    const oldModal = document.getElementById('adModal');
    if (oldModal) oldModal.remove();

    // Справочники для человекочитаемых значений
    const categoryMap = {
        'housing': 'Жильё',
        'bed': 'Койко-места',
        'realestate': 'Недвижимость',
        'food': 'Общепит',
        'service': 'Торговля и услуги',
        'place': 'Место',
        'auto': 'Авто',
        'other': 'Разное',
        'land': 'Участки',
        'leisure': 'Отдых — лечение'
    };
    const actionMap = {
        'rent': 'Снять',
        'rent-out': 'Сдать',
        'buy': 'Купить',
        'sell': 'Продать'
    };

    // Создаём модалку
    const modal = document.createElement('div');
    modal.id = 'adModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.45)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.overflowY = 'auto';

    // Контент модалки
    const content = document.createElement('div');
    content.style.background = '#fff';
    content.style.borderRadius = '18px';
    content.style.maxWidth = '600px';
    content.style.width = '100%';
    content.style.padding = '32px 28px 24px 28px';
    content.style.position = 'relative';
    content.style.boxShadow = '0 8px 32px rgba(76,175,80,0.13)';
    content.style.margin = '40px 0';

    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '18px';
    closeBtn.style.right = '18px';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => modal.remove();
    content.appendChild(closeBtn);

    // Фото (баннер или эмодзи)
    if (ad.photos && ad.photos.length > 0) {
        const banner = document.createElement('div');
        banner.style.width = '100%';
        banner.style.height = '220px';
        banner.style.overflow = 'hidden';
        banner.style.borderRadius = '18px 18px 0 0';
        banner.style.margin = '0 0 18px 0';
        banner.style.display = 'flex';
        banner.style.alignItems = 'center';
        banner.style.justifyContent = 'center';
        const img = document.createElement('img');
        img.src = ad.photos[0];
        img.alt = ad.title || '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '18px 18px 0 0';
        banner.appendChild(img);
        content.appendChild(banner);
    } else {
        // Эмодзи-домик как баннер
        const banner = document.createElement('div');
        banner.style.width = '100%';
        banner.style.height = '220px';
        banner.style.display = 'flex';
        banner.style.alignItems = 'center';
        banner.style.justifyContent = 'center';
        banner.style.background = 'linear-gradient(135deg,#e8f5e8 0%,#f0f8f0 100%)';
        banner.style.borderRadius = '18px 18px 0 0';
        banner.style.margin = '0 0 18px 0';
        const emoji = document.createElement('div');
        emoji.style.fontSize = '120px';
        emoji.style.color = '#b2b2b2';
        emoji.textContent = '🏠';
        banner.appendChild(emoji);
        content.appendChild(banner);
    }

    // Заголовок
    const title = document.createElement('h2');
    title.textContent = ad.title || 'Без названия';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '8px';
    content.appendChild(title);

    // Цена
    if (ad.price) {
        const price = document.createElement('div');
        price.textContent = `${parseInt(ad.price).toLocaleString('ru-RU')} ₸`;
        price.style.fontSize = '20px';
        price.style.color = '#388e3c';
        price.style.fontWeight = '700';
        price.style.marginBottom = '10px';
        content.appendChild(price);
    }

    // Категория, действие, город, район
    const meta = document.createElement('div');
    meta.style.fontSize = '15px';
    meta.style.color = '#256029';
    meta.style.marginBottom = '10px';
    meta.innerHTML =
        (ad.category ? `<b>Категория:</b> ${categoryMap[ad.category] || ad.category}<br>` : '') +
        (ad.action ? `<b>Действие:</b> ${actionMap[ad.action] || ad.action}<br>` : '') +
        (ad.city ? `<b>Город:</b> ${ad.city}<br>` : '') +
        (ad.district ? `<b>Район:</b> ${ad.district}<br>` : '');
    content.appendChild(meta);

    // Площадь, комнаты, кровати, вместимость
    const details = document.createElement('div');
    details.style.fontSize = '15px';
    details.style.color = '#444';
    details.style.marginBottom = '10px';
    details.innerHTML =
        (ad.area ? `<b>Площадь:</b> ${ad.area} м²<br>` : '') +
        (ad.rooms ? `<b>Комнат:</b> ${ad.rooms}<br>` : '') +
        (ad.beds ? `<b>Мест:</b> ${ad.beds}<br>` : '') +
        (ad.capacity ? `<b>Вместимость:</b> ${ad.capacity}<br>` : '');
    if (details.innerHTML.trim()) content.appendChild(details);

    // Описание
    if (ad.description) {
        const desc = document.createElement('div');
        desc.textContent = ad.description;
        desc.style.margin = '14px 0 10px 0';
        desc.style.fontSize = '15px';
        desc.style.color = '#222';
        content.appendChild(desc);
    }

    // Контакты
    if (ad.contacts) {
        const contacts = document.createElement('div');
        contacts.innerHTML = `<b>Контакты:</b> ${ad.contacts}`;
        contacts.style.margin = '10px 0 0 0';
        contacts.style.fontSize = '15px';
        contacts.style.color = '#256029';
        content.appendChild(contacts);
    }

    // Дата создания
    if (ad.created_at) {
        const date = document.createElement('div');
        const d = new Date(ad.created_at);
        const dateStr = d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        date.innerHTML = `<b>Дата публикации:</b> ${dateStr}`;
        date.style.fontSize = '13px';
        date.style.color = '#888';
        date.style.marginTop = '10px';
        content.appendChild(date);
    }

    // Статистика
    const stats = document.createElement('div');
    stats.style.fontSize = '13px';
    stats.style.color = '#888';
    stats.style.marginTop = '10px';
    stats.innerHTML =
        (ad.views_count !== undefined ? `👁 Просмотров: ${ad.views_count} ` : '') +
        (ad.favorites_count !== undefined ? `★ В избранном: ${ad.favorites_count}` : '');
    if (stats.innerHTML.trim()) content.appendChild(stats);

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Закрытие по клику вне окна
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Открытие деталей объявления
function openAdDetails(ad) {
    showAdModal(ad);
}

// Показать загрузку
function showLoading() {
    const adsGrid = document.getElementById('adsGrid');
    adsGrid.innerHTML = `
        <div class="loading" style="grid-column: 1 / -1;">
            <div class="loading-spinner"></div>
            <div>Загрузка объявлений...</div>
        </div>
    `;
}

// Показать ошибку
function showError(message) {
    const adsGrid = document.getElementById('adsGrid');
    adsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #dc3545;">
            <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
            <div style="font-size: 18px; margin-bottom: 8px;">Ошибка</div>
            <div style="font-size: 14px;">${message}</div>
        </div>
    `;
} 

// --- Страница избранного ---
function renderFavoritesPage() {
    const favIds = getFavorites();
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск по названию...';
    searchInput.className = 'search-input';
    const favGrid = document.createElement('div');
    favGrid.className = 'adsGrid';
    function renderFavCards() {
        favGrid.innerHTML = '';
        const filtered = allAds.filter(ad => favIds.includes(ad.id) && ad.title.toLowerCase().includes(searchInput.value.toLowerCase()));
        if (filtered.length === 0) {
            favGrid.innerHTML = '<div style="padding:40px;text-align:center;color:#888;">Нет избранных объявлений</div>';
        } else {
            filtered.forEach(ad => favGrid.appendChild(createAdCard(ad)));
        }
    }
    searchInput.addEventListener('input', renderFavCards);
    renderFavCards();
    const container = document.getElementById('adsGrid') || document.body;
    container.innerHTML = '';
    container.appendChild(searchInput);
    container.appendChild(favGrid);
} 