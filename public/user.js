// Проверка наличия системы уведомлений
if (typeof showError === 'undefined') {
    // Fallback если система уведомлений не загружена
    window.showError = (message) => console.error(message);
    window.showSuccess = (message) => console.log(message);
    window.showWarning = (message) => console.warn(message);
    window.showInfo = (message) => console.log(message);
}

// Функция для проверки авторизации пользователя
async function checkUserAuth() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.success && data.user) {
            return data.user;
        } else {
            // Проверяем localStorage как fallback
            const localUserData = localStorage.getItem('userData');
            if (localUserData) {
                return JSON.parse(localUserData);
            }
        }
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        // Проверяем localStorage как fallback
        const localUserData = localStorage.getItem('userData');
        if (localUserData) {
            return JSON.parse(localUserData);
        }
    }
    return null;
}

// Функция для обновления интерфейса в зависимости от статуса авторизации
async function updateAuthUI() {
    const user = await checkUserAuth();
    const authButtons = document.querySelector('.auth-buttons');
    const userInfo = document.querySelector('.user-info');
    
    if (user && user.isAuthenticated) {
        // Пользователь авторизован - показываем информацию о пользователе
        if (authButtons) {
            authButtons.classList.add('hide');
        }
        
        if (userInfo) {
            userInfo.classList.add('show');
            userInfo.innerHTML = `
                <span class="user-name">${user.fullname}</span>
                <button class="btn btn-outline logout-btn" onclick="logout()">Выйти</button>
            `;
        }
    } else {
        // Пользователь не авторизован - показываем кнопки входа/регистрации
        if (authButtons) {
            authButtons.classList.remove('hide');
        }
        
        if (userInfo) {
            userInfo.classList.remove('show');
        }
    }
}

// Функция для выхода
async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Очищаем localStorage
            localStorage.removeItem('userData');
            localStorage.removeItem('phoneVerificationCode');
            localStorage.removeItem('phoneVerified');
            localStorage.removeItem('verifiedPhoneNumber');
            
            // Обновляем интерфейс
            updateAuthUI();
            
            // Перенаправляем на главную
            window.location.href = 'index.html';
        } else {
            showError('Ошибка при выходе: ' + data.message);
        }
    } catch (error) {
        console.error('Ошибка выхода:', error);
        showError('Ошибка при выходе');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
}); 