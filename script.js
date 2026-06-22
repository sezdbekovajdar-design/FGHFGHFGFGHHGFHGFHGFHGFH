// Контентная база данных премиум видеороликов
const videosData = [
    { id: 1, title: "Изучаем HTML и CSS за 1 час для начинающих. YouTube 2.0 Edition", channel: "Web Dev Elite", views: "240 тыс. просмотров", date: "2 дня назад", category: "html", thumb: "https://picsum.photos", avatar: "https://picsum.photos" },
    { id: 2, title: "Полный курс по асинхронному JavaScript и Event Loop с нуля", channel: "JS Code Masters", views: "1.8 млн просмотров", date: "1 месяц назад", category: "javascript", thumb: "https://picsum.photos", avatar: "https://picsum.photos" },
    { id: 3, title: "Как спроектировать сложный UI интерфейс без единого плагина", channel: "Frontend Architecture", views: "95 тыс. просмотров", date: "5 дней назад", category: "html", thumb: "https://picsum.photos", avatar: "https://picsum.photos" },
    { id: 4, title: "Продвинутый дизайн и верстка сеток на чистом CSS Grid & Flexbox", channel: "Design Pro Studio", views: "140 тыс. просмотров", date: "3 недели назад", category: "html", thumb: "https://picsum.photos", avatar: "https://picsum.photos" },
    { id: 5, title: "Топ 10 фишек и лайфхаков для Senior JavaScript Разработчика", channel: "Tech Mind Senior", views: "510 тыс. просмотров", date: "6 месяцев назад", category: "javascript", thumb: "https://picsum.photos", avatar: "https://picsum.photos" },
    { id: 6, title: "Разворачиваем собственное масштабное API на Node.js", channel: "Backend Guru", views: "34 тыс. просмотров", date: "12 часов назад", category: "javascript", thumb: "https://picsum.photos", avatar: "https://picsum.photos" }
];

// Глобальные состояния кнопок
let likedVideos = [];
let historyVideos = [];

// DOM-узлы
const videoGrid = document.getElementById('videoGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');
const categoryTitle = document.getElementById('categoryTitle');

const accountBtn = document.getElementById('accountBtn');
const accountModal = document.getElementById('accountModal');
const closeModal = document.getElementById('closeModal');
const homeBtn = document.getElementById('homeBtn');

const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlTag = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

// Функция генерации премиальных видеокарточек
function renderVideos(videos) {
    videoGrid.innerHTML = '';
    if(videos.length === 0) {
        videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 60px; color: var(--text-muted); font-size: 18px;">Ничего не найдено в базе данных YouTube 2.0</p>';
        return;
    }

    videos.forEach(video => {
        const isLiked = likedVideos.includes(video.id);
        const card = document.createElement('div');
        card.classList.add('video-card');
        
        // Клик по карточке отправляет видео в историю
        card.addEventListener('click', () => {
            if(!historyVideos.includes(video.id)) {
                historyVideos.push(video.id);
            }
            alert(`Запуск стриминга YouTube 2.0: "${video.title}"`);
        });

        card.innerHTML = `
            <div class="thumbnail">
                <img src="${video.thumb}" alt="Preview">
            </div>
            <div class="video-details">
                <div class="channel-avatar">
                    <img src="${video.avatar}" alt="Channel">
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="channel-name">${video.channel}</p>
                    <p class="video-stats">${video.views} • ${video.date}</p>
                    
                    <div class="media-buttons">
                        <button class="media-btn like-btn ${isLiked ? 'active' : ''}" onclick="handleLike(${video.id}, this, event)">
                            <i class="material-icons" style="font-size:16px">thumb_up</i> <span>${isLiked ? 'Понравилось' : 'Лайк'}</span>
                        </button>
                        <button class="media-btn share-btn" onclick="handleShare('${video.title}', event)">
                            <i class="material-icons" style="font-size:16px">share</i> <span>Поделиться</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        videoGrid.appendChild(card);
    });
}

// Стартовый рендер
renderVideos(videosData);

/* ================= ЛОГИКА ТЕМЫ (ПО УМОЛЧАНИЮ DARK) ================= */
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
        themeIcon.textContent = 'brightness_4'; // луна
        themeText.textContent = 'Тёмная тема';
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
        themeIcon.textContent = 'brightness_7'; // солнце
        themeText.textContent = 'Светлая тема';
    }
});

/* ================= НАВИГАЦИЯ И ИНТЕРАКТИВ КНОПОК ================= */

homeBtn.addEventListener('click', () => {
    resetSidebarActive();
    document.querySelector('[data-filter="all"]').classList.add('active');
    categoryTitle.textContent = "Главная";
    renderVideos(videosData);
});

document.querySelectorAll('.nav-link[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        resetSidebarActive();
        link.classList.add('active');
        
        const filter = link.getAttribute('data-filter');
        categoryTitle.textContent = link.querySelector('span').textContent;

        if (filter === 'all' || filter === 'explore') {
            renderVideos(videosData);
        } else {
            const filtered = videosData.filter(v => v.category === filter);
            renderVideos(filtered);
        }
    });
});

document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        resetSidebarActive();
        link.classList.add('active');

        const section = link.getAttribute('data-section');
        categoryTitle.textContent = link.querySelector('span').textContent;

        if (section === 'liked') {
            const liked = videosData.filter(v => likedVideos.includes(v.id));
            renderVideos(liked);
        } else if (section === 'history') {
            const history = videosData.filter(v => historyVideos.includes(v.id));
            renderVideos(history);
        } else if (section === 'library') {
            renderVideos(videosData);
        }
    });
});

function resetSidebarActive() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

/* ================= ПОИСК ПО БАЗЕ ДАННЫХ ================= */
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    categoryTitle.textContent = `Результаты поиска: "${searchInput.value}"`;
    const filtered = videosData.filter(video => video.title.toLowerCase().includes(query));
    renderVideos(filtered);
});

/* ================= ИНТЕРАКТИВНЫЕ МЕДИА КНОПКИ ================= */
function handleLike(id, btn, event) {
    event.stopPropagation();
    if (likedVideos.includes(id)) {
        likedVideos = likedVideos.filter(vId => vId !== id);
        btn.classList.remove('active');
        btn.querySelector('span').textContent = 'Лайк';
    } else {
        likedVideos.push(id);
        btn.classList.add('active');
        btn.querySelector('span').textContent = 'Понравилось';
    }
}

function handleShare(title, event) {
    event.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    alert(`Ссылка на видео "${title}" успешно скопирована на YouTube 2.0!`);
}

/* ================= УПРАВЛЕНИЕ ОКНОМ ПРОФИЛЯ ================= */
accountBtn.addEventListener('click', () => accountModal.classList.add('open'));
closeModal.addEventListener('click', () => accountModal.classList.remove('open'));
accountModal.addEventListener('click', (e) => { if(e.target === accountModal) accountModal.classList.remove('open'); });

document.getElementById('myChannelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    accountModal.classList.remove('open');
    categoryTitle.textContent = "Мой премиум-канал (Иван Иванов)";
    videoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">На вашем канале YouTube 2.0 пока нет видео.</p>';
});

document.getElementById('settingsBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Открытие расширенных настроек профиля...");
});

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Вы вышли из системы.");
    location.reload();
});

// Плавный запуск скрытия меню
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('hide');
    content.classList.toggle('full-width');
});