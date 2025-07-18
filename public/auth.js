// Make.com webhook URL
const WEBHOOK_URL = 'https://hook.us2.make.com/prbgnp6b7nmfprlyvtle8wjr5on5katd';

// Генерация 6-значного кода
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Очистка номера телефона от форматирования
function cleanPhoneNumber(phone) {
    return phone.replace(/\D/g, '');
}

// Отправка данных на webhook
async function sendToWebhook(data) {
    try {
        console.log('Отправка на webhook:', WEBHOOK_URL);
        console.log('Данные:', data);
        
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Статус ответа:', response.status);
        console.log('Заголовки ответа:', response.headers);
        
        const responseText = await response.text();
        console.log('Текст ответа:', responseText);
        
        if (response.ok) {
            return { 
                success: true, 
                message: 'Код отправлен на ваш номер',
                responseText: responseText
            };
        } else {
            return { 
                success: false, 
                message: `Ошибка отправки кода: ${response.status} ${responseText}`,
                responseText: responseText
            };
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        return { 
            success: false, 
            message: 'Ошибка сети: ' + error.message,
            responseText: ''
        };
    }
}

// Проверка полного номера телефона
function isPhoneComplete(phone) {
    return phone.replace(/\D/g, '').length === 11;
}

// Замена поля телефона на поле SMS-кода
function showSmsInput(phone) {
    const phoneInput = document.getElementById('phone');
    const phoneContainer = phoneInput.parentElement;
    
    phoneContainer.innerHTML = `
        <input type="text" id="smsCode" class="form-input sms-input" placeholder="000000" maxlength="6" pattern="[0-9]{6}">
        <div class="phone-display">
            <span class="phone-number">${phone}</span>
            <button type="button" class="change-phone-btn">Изменить</button>
        </div>
        <div id="phoneStatus" class="phone-status"></div>
    `;
    
    // Добавляем обработчики для SMS-кода
    const smsInput = document.getElementById('smsCode');
    const changeBtn = document.querySelector('.change-phone-btn');
    
    // Ограничиваем ввод только цифрами
    smsInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 6);
        
        // Автоматическая проверка при вводе 6 цифр
        if (this.value.length === 6) {
            checkSmsCode();
        }
    });
    
    // Кнопка "Изменить"
    changeBtn.addEventListener('click', function() {
        // Восстанавливаем поле телефона
        phoneContainer.innerHTML = `
            <input type="tel" id="phone" name="phone" placeholder="+7 (777) 123-45-67" required class="form-input">
            <div id="phoneStatus" class="phone-status"></div>
        `;
        
        // Восстанавливаем обработчики для телефона
        setupPhoneHandlers();
        
        // Очищаем данные подтверждения
        localStorage.removeItem('phoneVerificationCode');
        localStorage.removeItem('phoneVerified');
        localStorage.removeItem('verifiedPhoneNumber');
        
        // Блокируем кнопку регистрации
        document.getElementById('registerBtn').disabled = true;
    });
    
    // Фокус на поле SMS
    smsInput.focus();
}

// Проверка SMS-кода
function checkSmsCode() {
    const smsInput = document.getElementById('smsCode');
    const phoneStatus = document.getElementById('phoneStatus');
    const enteredCode = smsInput.value;
    const expectedCode = localStorage.getItem('phoneVerificationCode');
    
    if (enteredCode === expectedCode) {
        // Код правильный
        smsInput.classList.remove('error');
        smsInput.classList.add('success');
        phoneStatus.textContent = 'Номер подтвержден';
        phoneStatus.className = 'phone-status success';
        
        // Делаем поле неактивным
        smsInput.disabled = true;
        
        // Сохраняем статус подтверждения
        localStorage.setItem('phoneVerified', 'true');
        
        // Активируем кнопку регистрации
        document.getElementById('registerBtn').disabled = false;
    } else {
        // Код неправильный
        smsInput.classList.remove('success');
        smsInput.classList.add('error');
        phoneStatus.textContent = 'Код неверный';
        phoneStatus.className = 'phone-status error';
        
        // Очищаем поле для повторного ввода
        setTimeout(() => {
            smsInput.value = '';
            smsInput.classList.remove('error');
            phoneStatus.textContent = '';
            phoneStatus.className = 'phone-status';
        }, 2000);
    }
}

// Обработка подтверждения телефона
async function handlePhoneVerification(phone) {
    const code = generateCode();
    const smsText = `Ваш код подтверждения (регистрация) на сайте zhilie.kz: ${code}`;
    const cleanPhone = cleanPhoneNumber(phone);
    
    console.log('Отправка SMS на номер:', cleanPhone);
    console.log('Код:', code);
    
    const webhookData = {
        action: 'phone',
        phone: cleanPhone,
        code: code,
        smsText: smsText
    };
    
    console.log('Данные для webhook:', webhookData);
    
    const result = await sendToWebhook(webhookData);
    
    if (result.success) {
        // Сохраняем код и номер телефона для проверки
        localStorage.setItem('phoneVerificationCode', code);
        localStorage.setItem('verifiedPhoneNumber', cleanPhone);
        
        // Показываем поле для ввода SMS
        showSmsInput(phone);
        
        // Обновляем статус
        const phoneStatus = document.getElementById('phoneStatus');
        phoneStatus.textContent = 'Код отправлен на ваш номер';
        phoneStatus.className = 'phone-status verifying';
        
        console.log('SMS отправлен успешно');
    } else {
        console.error('Ошибка отправки SMS:', result.message);
        showError('Ошибка отправки кода: ' + result.message);
    }
}

// Настройка обработчиков для поля телефона
function setupPhoneHandlers() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7 (' + value;
                } else if (value.length <= 4) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
                } else if (value.length <= 7) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
                } else if (value.length <= 9) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
                } else {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
            }
            
            e.target.value = value;
            
            // Автоматически отправляем SMS при полном номере
            if (isPhoneComplete(value)) {
                handlePhoneVerification(value);
            }
        });
    }
}

// Обработка регистрации
async function handleRegister(formData) {
    // Проверяем, подтвержден ли телефон
    if (localStorage.getItem('phoneVerified') !== 'true') {
        showError('Необходимо подтвердить номер телефона!');
        return;
    }
    
    // Получаем номер телефона из localStorage
    const cleanPhone = localStorage.getItem('verifiedPhoneNumber');
    if (!cleanPhone) {
        showError('Ошибка: номер телефона не найден!');
        return;
    }
    
    console.log('=== РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ ===');
    console.log('Данные для регистрации:', {
        fullName: formData.get('fullName'),
        phone: cleanPhone,
        email: formData.get('email')
    });
    
    const webhookData = {
        action: 'register',
        fullName: formData.get('fullName'),
        phone: cleanPhone,
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    console.log('Данные для отправки на webhook:', webhookData);
    
    const result = await sendToWebhook(webhookData);
    
    if (result.success) {
        console.log('=== Запрос на регистрацию отправлен успешно ===');
        
        // Пытаемся распарсить ответ от webhook
        try {
            const responseData = JSON.parse(result.responseText || '{}');
            console.log('Ответ от webhook при регистрации:', responseData);
            
            if (responseData.Action === 'Registered') {
                console.log('=== Регистрация выполнена успешно ===');
                
                // Сохраняем данные пользователя в куки
                const userData = {
                    fullname: responseData.fullname || formData.get('fullName'),
                    phone: responseData.phone || cleanPhone,
                    email: responseData.email || formData.get('email'),
                    isAuthenticated: true
                };
                
                console.log('Данные пользователя для сохранения:', userData);
                
                // Сохраняем в localStorage (куки через сервер)
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Отправляем данные на сервер для установки куки
                await fetch('/api/set-user-cookie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
                
                showSuccess('Регистрация успешно завершена!');
                // Очищаем данные подтверждения
                localStorage.removeItem('phoneVerificationCode');
                localStorage.removeItem('phoneVerified');
                localStorage.removeItem('verifiedPhoneNumber');
                // Перенаправляем на главную
                window.location.href = 'index.html';
            } else if (responseData.Action === 'UserHave') {
                console.log('=== Пользователь уже существует ===');
                
                // Пользователь уже существует - предлагаем войти
                showWarning('Пользователь с таким номером телефона уже зарегистрирован. Пожалуйста, войдите в систему.');
                
                // Очищаем данные подтверждения
                localStorage.removeItem('phoneVerificationCode');
                localStorage.removeItem('phoneVerified');
                localStorage.removeItem('verifiedPhoneNumber');
                
                // Перенаправляем на страницу входа
                window.location.href = 'login.html';
            } else {
                console.log('=== Неожиданный ответ от сервера ===');
                showError('Ошибка регистрации: неожиданный ответ от сервера');
            }
        } catch (error) {
            console.error('Ошибка парсинга ответа:', error);
            showWarning('Регистрация завершена, но произошла ошибка обработки ответа');
            window.location.href = 'index.html';
        }
    } else {
        console.error('Ошибка регистрации:', result.message);
        showError('Ошибка регистрации: ' + result.message);
    }
}

// Обработка авторизации
async function handleLogin(formData) {
    const cleanPhone = cleanPhoneNumber(formData.get('phone'));
    const password = formData.get('password');
    
    console.log('=== ВХОД ПО ЛОГИНУ И ПАРОЛЮ ===');
    console.log('Номер телефона:', cleanPhone);
    console.log('Пароль:', password ? '***' : 'не указан');
    
    const webhookData = {
        action: 'login',
        phone: cleanPhone,
        password: password
    };
    
    console.log('Данные для входа:', webhookData);
    
    const result = await sendToWebhook(webhookData);
    
    if (result.success) {
        console.log('=== Запрос на вход отправлен успешно ===');
        
        // Пытаемся распарсить ответ от webhook
        try {
            const responseData = JSON.parse(result.responseText || '{}');
            console.log('Ответ от webhook при входе:', responseData);
            
            if (responseData.Action === 'AcceptLogin') {
                console.log('=== Вход выполнен успешно ===');
                
                // Сохраняем данные пользователя в куки
                const userData = {
                    fullname: responseData.fullname || 'Пользователь',
                    phone: responseData.phone || cleanPhone,
                    email: responseData.email || '',
                    isAuthenticated: true
                };
                
                console.log('Данные пользователя для сохранения:', userData);
                
                // Сохраняем в localStorage
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Отправляем данные на сервер для установки куки
                await fetch('/api/set-user-cookie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
                
                showSuccess('Вход выполнен успешно!');
                // Перенаправляем на главную
                window.location.href = 'index.html';
            } else if (responseData.Action === 'IncorrectData') {
                console.log('=== Неверные данные для входа ===');
                showError('Неверный номер телефона или пароль. Пожалуйста, проверьте введенные данные.');
            } else {
                console.log('=== Неожиданный ответ от сервера ===');
                showError('Ошибка входа: неожиданный ответ от сервера');
            }
        } catch (error) {
            console.error('Ошибка парсинга ответа при входе:', error);
            showWarning('Вход выполнен, но произошла ошибка обработки ответа');
            window.location.href = 'index.html';
        }
    } else {
        console.error('Ошибка входа:', result.message);
        showError('Ошибка входа: ' + result.message);
    }
}

// Обработчики форм
document.addEventListener('DOMContentLoaded', function() {
    // Регистрация
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Настраиваем обработчики для поля телефона
        setupPhoneHandlers();
        
        // Обработчик отправки формы регистрации
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Проверка паролей
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
                showError('Пароли не совпадают!');
                return;
            }
            
            // Проверка длины пароля
            if (password.length < 6) {
                showError('Пароль должен содержать минимум 6 символов!');
                return;
            }
            
            // Проверяем, что телефон подтвержден
            if (localStorage.getItem('phoneVerified') !== 'true') {
                showError('Необходимо подтвердить номер телефона!');
                return;
            }
            
            await handleRegister(formData);
        });
    }
    
    // Авторизация
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Проверка номера телефона
            const phone = formData.get('phone');
            if (!phone.match(/^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/)) {
                showError('Введите корректный номер телефона в формате +7 (777) 123-45-67');
                return;
            }
            
            // Проверка пароля
            const password = formData.get('password');
            if (!password || password.length < 6) {
                showError('Пароль должен содержать минимум 6 символов');
                return;
            }
            
            await handleLogin(formData);
        });
        
        // Маска для номера телефона в форме авторизации
        const phoneInput = loginForm.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.length <= 1) {
                        value = '+7 (' + value;
                    } else if (value.length <= 4) {
                        value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
                    } else if (value.length <= 7) {
                        value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
                    } else if (value.length <= 9) {
                        value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
                    } else {
                        value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                    }
                }
                
                e.target.value = value;
            });
        }
    }
}); 