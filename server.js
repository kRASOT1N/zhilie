const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON и куки
app.use(express.json());
app.use(cookieParser());

// Статические файлы
app.use(express.static('public'));

// API endpoint для установки куки пользователя
app.post('/api/set-user-cookie', (req, res) => {
    try {
        const userData = req.body;
        
        // Устанавливаем куки с данными пользователя
        res.cookie('userData', JSON.stringify(userData), {
            httpOnly: true,
            secure: false, // false для localhost
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 дней
        });
        
        res.json({ success: true, message: 'Куки установлены' });
    } catch (error) {
        console.error('Ошибка установки куки:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// API endpoint для получения данных пользователя
app.get('/api/user', (req, res) => {
    try {
        const userDataCookie = req.cookies?.userData;
        if (userDataCookie) {
            const userData = JSON.parse(userDataCookie);
            res.json({ success: true, user: userData });
        } else {
            res.json({ success: false, user: null });
        }
    } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        res.json({ success: false, user: null });
    }
});

// API endpoint для выхода
app.post('/api/logout', (req, res) => {
    try {
        // Удаляем куки
        res.clearCookie('userData');
        res.json({ success: true, message: 'Выход выполнен' });
    } catch (error) {
        console.error('Ошибка выхода:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Страница регистрации
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Страница авторизации
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
}); 