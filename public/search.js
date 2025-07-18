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

// Применение фильтров только на клиенте
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

    // Премиум бейдж
    let premiumBadge = '';
    if (ad.is_vip) {
        premiumBadge = '<div class="ad-premium-badge">VIP</div>';
    } else if (ad.is_top) {
        premiumBadge = '<div class="ad-premium-badge">ТОП</div>';
    } else if (ad.is_premium) {
        premiumBadge = '<div class="ad-premium-badge">ПРЕМИУМ</div>';
    }

    // Фото или эмодзи
    let imageBlock = '';
    if (ad.photos && Array.isArray(ad.photos) && ad.photos.length > 0) {
        imageBlock = `<img src="${ad.photos[0]}" alt="${ad.title}">`;
    } else {
        imageBlock = `
            <div style="
                width:100%;height:100%;display:flex;align-items:center;justify-content:center;
                background:linear-gradient(135deg,#e8f5e8 0%,#f0f8f0 100%);
                font-size:64px;color:#b2b2b2;">
                🏠
            </div>
        `;
    }

    // Цена
    const price = parseInt(ad.price) || 0;
    const formattedPrice = price.toLocaleString('ru-RU') + ' ₸';

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

    card.innerHTML = `
        <div class="ad-image" style="min-height:200px;max-height:200px;position:relative;">
            ${imageBlock}
            ${premiumBadge}
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

// Открытие деталей объявления
function openAdDetails(ad) {
    // Здесь можно добавить модальное окно или переход на страницу деталей
    console.log('Открыть детали объявления:', ad);
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