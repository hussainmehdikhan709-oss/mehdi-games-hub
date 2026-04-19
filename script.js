const RAWG_API_KEY = 'b6f29042e46442fda16d68cefe79d65d';
const RAWG_BASE_URL = 'https://api.rawg.io/api';
const RAWG_PAGE_SIZE = 20;
const genreMap = {
    All: '',
    Action: 'action',
    Adventure: 'adventure',
    RPG: 'role-playing-games-rpg',
    Shooter: 'shooter',
    Sports: 'sports',
    Strategy: 'strategy',
    Racing: 'racing'
};

const state = {
    category: 'All',
    search: ''
};

const gamesContainer = document.getElementById('gamesContainer');
const categoriesContainer = document.getElementById('categories');
const sectionTitle = document.getElementById('sectionTitle');
const searchInput = document.getElementById('searchInput');
const countdownTitle = document.getElementById('countdownTitle');
const countdownTimer = document.getElementById('countdownTimer');

function getUpcomingRelease() {
    const now = new Date();
    const futureGames = window.gameData?.filter(game => new Date(game.releaseDate) > now) || [];
    return futureGames.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))[0];
}

function setupCountdown() {
    if (!countdownTitle || !countdownTimer) return;
    const nextRelease = getUpcomingRelease();

    if (!nextRelease) {
        countdownTitle.textContent = 'Next drop coming soon';
        countdownTimer.textContent = 'Stay tuned';
        return;
    }

    function updateTimer() {
        const now = new Date();
        const target = new Date(nextRelease.releaseDate);
        const diff = target - now;

        if (diff <= 0) {
            countdownTitle.textContent = `${nextRelease.name} is live now!`;
            countdownTimer.textContent = '00d 00h 00m 00s';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownTitle.textContent = `Next release: ${nextRelease.name}`;
        countdownTimer.textContent = `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

function createCategoryButton(category) {
    const button = document.createElement('button');
    button.className = 'category-btn' + (state.category === category ? ' active' : '');
    button.textContent = category;

    button.addEventListener('click', () => {
        state.category = category;
        renderCategories();
        fetchAndRenderRawgGames(state.search, genreMap[category]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return button;
}

function renderCategories() {
    categoriesContainer.innerHTML = '';
    Object.keys(genreMap).forEach(category => {
        categoriesContainer.appendChild(createCategoryButton(category));
    });
}

function renderLoadingState() {
    gamesContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading games from RAWG...</p>
        </div>
    `;
}

function renderErrorState(message) {
    gamesContainer.innerHTML = `<p class="empty-state error-state">${message}</p>`;
}

function renderRawgGames(rawgGames) {
    if (!rawgGames.length) {
        gamesContainer.innerHTML = '<p class="empty-state">No games found. Try a different keyword or category.</p>';
        return;
    }

    gamesContainer.innerHTML = '';
    rawgGames.forEach(game => {
        const card = document.createElement('article');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <div class="game-card-content">
                <h3>${game.name}</h3>
                <p class="game-description">${game.description}</p>
                <div class="game-meta">
                    <span class="badge">${game.category}</span>
                    <span class="badge">${game.platform}</span>
                </div>
                <div class="card-actions">
                    <button class="cta" onclick="window.open('${game.link}', '_blank')">Download Now</button>
                    <a class="btn btn-secondary" href="game.html?id=${game.id}">Details</a>
                </div>
            </div>
        `;
        gamesContainer.appendChild(card);
    });
}

function mapRawgGame(rawgGame) {
    return {
        id: rawgGame.slug,
        name: rawgGame.name,
        description: rawgGame.released
            ? `${rawgGame.released} • Rating ${rawgGame.rating}`
            : `Rating ${rawgGame.rating} • ${rawgGame.genres?.map(g => g.name).slice(0, 2).join(', ') || 'Popular title'}`,
        category: rawgGame.genres?.[0]?.name || 'Action',
        platform: rawgGame.platforms?.map(p => p.platform.name).slice(0, 2).join(', ') || 'PC',
        image: rawgGame.background_image || 'https://via.placeholder.com/640x360/111827/ffffff?text=Game+Image',
        link: rawgGame.website || `https://rawg.io/games/${rawgGame.slug}`
    };
}

async function fetchRawgGames(query = '', genreSlug = '') {
    const searchParam = query ? `&search=${encodeURIComponent(query)}` : '';
    const genreParam = genreSlug ? `&genres=${encodeURIComponent(genreSlug)}` : '';
    const ordering = query || genreSlug ? '&ordering=-rating' : '&ordering=-added';
    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page_size=${RAWG_PAGE_SIZE}${searchParam}${genreParam}${ordering}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`RAWG request failed (${response.status})`);
    }

    const data = await response.json();
    return (data.results || []).map(mapRawgGame);
}

async function fetchAndRenderRawgGames(query = '', genreSlug = '') {
    if (!query && !genreSlug) {
        sectionTitle.textContent = 'Trending games';
    } else if (query) {
        sectionTitle.textContent = `Results for "${query}"`;
    } else {
        sectionTitle.textContent = `${state.category} games`;
    }

    renderLoadingState();

    try {
        const rawgGames = await fetchRawgGames(query, genreSlug);
        renderRawgGames(rawgGames);
    } catch (error) {
        renderErrorState(`Unable to load games from RAWG. ${error.message}`);
    }
}

searchInput.addEventListener('input', event => {
    state.search = event.target.value.trim();
    clearTimeout(window.rawgSearchTimeout);
    window.rawgSearchTimeout = setTimeout(() => {
        fetchAndRenderRawgGames(state.search, genreMap[state.category]);
    }, 350);
});

renderCategories();
fetchAndRenderRawgGames();
setupCountdown();

// Handle new category navigation
document.querySelectorAll('.nav-cat[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        state.category = category.charAt(0).toUpperCase() + category.slice(1);
        document.querySelectorAll('.nav-cat').forEach(el => el.classList.remove('active-cat'));
        link.classList.add('active-cat');
        fetchAndRenderRawgGames('', genreMap[category] || category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
