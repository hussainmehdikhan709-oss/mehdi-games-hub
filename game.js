const detailContainer = document.getElementById('detailContainer');
const params = new URLSearchParams(window.location.search);
const selectedSlug = params.get('id');
const RAWG_API_KEY = 'b6f29042e46442fda16d68cefe79d65d';
const RAWG_BASE_URL = 'https://api.rawg.io/api';
const fallbackImage = 'https://via.placeholder.com/1280x720/0b0e14/ffffff?text=Featured+Game';

function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function renderStars(rating) {
    const full = Math.round(rating || 0);
    const maxStars = 5;
    return '★'.repeat(full) + '☆'.repeat(maxStars - full);
}

function getShareLinks(gameName) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${gameName} on Mehdi Games Hub`);
    return {
        whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    };
}

function renderLoadingState() {
    detailContainer.innerHTML = `
        <div class="detail-card loading-card">
            <div class="spinner"></div>
            <p>Loading game details...</p>
        </div>
    `;
}

function renderErrorView(message) {
    detailContainer.innerHTML = `
        <div class="detail-card not-found">
            <h2>Oops!</h2>
            <p>${message}</p>
            <a class="btn btn-primary" href="index.html">Back to home</a>
        </div>
    `;
}

function mapRequirements(platforms) {
    const platformWithReq = platforms?.find(p => p.requirements) || platforms?.[0];
    const minItems = platformWithReq?.requirements?.minimum ? [platformWithReq.requirements.minimum] : ['Minimum system requirements not available yet.'];
    const recItems = platformWithReq?.requirements?.recommended ? [platformWithReq.requirements.recommended] : ['Recommended system requirements not available yet.'];

    return {
        min: minItems,
        recommended: recItems
    };
}

function extractScreenshotUrls(gameData, screenshotData) {
    const available = gameData.short_screenshots?.map(item => item.image) || [];
    if (available.length) return available.slice(0, 6);
    return screenshotData.map(item => item.image).slice(0, 6);
}

async function fetchRawgGameDetails(slug) {
    const url = `${RAWG_BASE_URL}/games/${slug}?key=${RAWG_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Unable to load details (${response.status})`);
    }
    return await response.json();
}

async function fetchRawgScreenshots(slug) {
    const url = `${RAWG_BASE_URL}/games/${slug}/screenshots?key=${RAWG_API_KEY}&page_size=8`;
    const response = await fetch(url);
    if (!response.ok) {
        return [];
    }
    const data = await response.json();
    return data.results || [];
}

async function fetchTrendingGames(limit = 4) {
    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page_size=${limit}&ordering=-added`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || []).map(game => ({
        id: game.slug,
        name: game.name,
        image: game.background_image || fallbackImage,
        score: game.rating
    }));
}

async function fetchRelatedGames(genreSlug, excludeSlug) {
    if (!genreSlug) return [];
    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page_size=4&genres=${genreSlug}&ordering=-added`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || [])
        .filter(game => game.slug !== excludeSlug)
        .slice(0, 4)
        .map(game => ({
            id: game.slug,
            name: game.name,
            image: game.background_image || fallbackImage,
            category: game.genres?.[0]?.name || 'Top Pick'
        }));
}

function renderDetailPage(gameData, screenshots, trendingGames, relatedGames) {
    const categoryName = gameData.genres?.[0]?.name || 'Featured';
    const categoryPills = gameData.genres?.map(genre => genre.name) || [];
    const platforms = gameData.platforms?.map(item => item.platform.name).slice(0, 3).join(', ') || 'PC';
    const developer = gameData.developers?.[0]?.name || 'Unknown Studio';
    const requirements = mapRequirements(gameData.platforms);
    const gameLink = gameData.website || `https://rawg.io/games/${gameData.slug}`;
    const screenshotUrls = extractScreenshotUrls(gameData, screenshots);
    const shareLinks = getShareLinks(gameData.name);

    detailContainer.innerHTML = `
        <article class="detail-layout">
            <div class="detail-main">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                    <a href="index.html">Home</a>
                    <span>›</span>
                    <a href="games.html">${categoryName}</a>
                    <span>›</span>
                    <span aria-current="page">${gameData.name}</span>
                </nav>

                <section class="hero-detail">
                    <div class="hero-media">
                        <img src="${gameData.background_image || fallbackImage}" alt="${gameData.name} featured image">
                    </div>
                    <div class="hero-copy">
                        <div class="hero-headline">
                            <span class="badge">${categoryName}</span>
                            <h1>${gameData.name}</h1>
                        </div>
                        <p class="detail-description">${gameData.description_raw || gameData.description || 'No description available yet.'}</p>
                        <div class="quick-info-bar">
                            <div><span>Platform</span><strong>${platforms}</strong></div>
                            <div><span>Release Date</span><strong>${formatDate(gameData.released)}</strong></div>
                            <div><span>Developer</span><strong>${developer}</strong></div>
                            <div><span>Score</span><strong>${gameData.rating || 'N/A'}/5</strong></div>
                        </div>
                        <div class="detail-hero-actions">
                            <button class="cta neon-blue" onclick="window.open('${gameLink}','_blank')">Download Now</button>
                            <a class="btn btn-primary neon-green" href="${gameLink}" target="_blank" rel="noopener">Official Purchase</a>
                        </div>
                        <div class="share-actions">
                            <span>Share:</span>
                            <a href="${shareLinks.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
                            <a href="${shareLinks.facebook}" target="_blank" rel="noopener">Facebook</a>
                            <a href="${shareLinks.x}" target="_blank" rel="noopener">X</a>
                        </div>
                    </div>
                </section>

                <section class="screenshot-section detail-section">
                    <h3>Screenshot Gallery</h3>
                    <div class="screenshot-grid">
                        ${screenshotUrls.length
                            ? screenshotUrls.map(src => `
                                <button class="screenshot-card" onclick="window.open('${src}', '_blank')">
                                    <img src="${src}" alt="${gameData.name} screenshot">
                                </button>
                            `).join('')
                            : '<p class="empty-state">No screenshots available yet.</p>'
                        }
                    </div>
                </section>

                <section class="detail-section spec-section">
                    <h3>System Requirements</h3>
                    <div class="spec-table">
                        <div>
                            <h4>Minimum</h4>
                            <table>
                                <tbody>
                                    ${requirements.min.map(item => `<tr><td>${item}</td></tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h4>Recommended</h4>
                            <table>
                                <tbody>
                                    ${requirements.recommended.map(item => `<tr><td>${item}</td></tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section class="detail-section review-box">
                    <div class="review-header">
                        <div>
                            <span class="small-label">Editor Score</span>
                            <div class="rating-pill">
                                <strong>${gameData.rating || 'N/A'}</strong>
                                <span>${renderStars(gameData.rating)}</span>
                            </div>
                        </div>
                        <p>${gameData.reviews_count ? `${gameData.reviews_count} community reviews • High quality gameplay score.` : 'Detailed player feedback and rating information powered by RAWG.'}</p>
                    </div>
                    <div class="pros-cons">
                        <div>
                            <h4>Pros</h4>
                            <ul>
                                <li>High rating among players</li>
                                <li>Rich visuals and updated content</li>
                                <li>Cross-platform support</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Cons</h4>
                            <ul>
                                <li>May require larger downloads for full experience</li>
                                <li>Optimal settings depend on hardware</li>
                                <li>Some systems may need updates</li>
                            </ul>
                        </div>
                    </div>
                    <p class="review-highlight">Experience the latest gameplay, reviews and system benchmarks in one premium hub.</p>
                </section>

                <section class="detail-section related-games">
                    <h3>You May Also Like</h3>
                    <div class="related-grid">
                        ${relatedGames.map(item => `
                            <article class="related-card">
                                <img src="${item.image}" alt="${item.name}">
                                <div>
                                    <span class="badge">${item.category}</span>
                                    <h4>${item.name}</h4>
                                    <a class="btn btn-secondary" href="game.html?id=${item.id}">View details</a>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>
            </div>

            <aside class="detail-sidebar">
                <div class="sidebar-card">
                    <h3>Trending Games</h3>
                    <ul class="trending-list">
                        ${trendingGames.map(item => `
                            <li>
                                <a href="game.html?id=${item.id}">${item.name}</a>
                                <span>${item.score}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="sidebar-card">
                    <h3>Popular Categories</h3>
                    <div class="category-pill-list">
                        ${categoryPills.map(name => `<span class="category-pill">${name}</span>`).join('')}
                    </div>
                </div>

                <div class="sidebar-card ad-card">
                    <h3>Advertisement</h3>
                    <div class="ad-spot">
                        <p>Promote your next launcher, tournament, or gaming gear here.</p>
                        <a class="btn btn-primary" href="https://example.com" target="_blank" rel="noopener">Lease ad space</a>
                    </div>
                </div>
            </aside>
        </article>
    `;
}

async function initDetailPage() {
    if (!selectedSlug) {
        renderErrorView('No game was selected. Please choose a title from the homepage.');
        return;
    }

    renderLoadingState();

    try {
        const [gameData, screenshots, trendingGames] = await Promise.all([
            fetchRawgGameDetails(selectedSlug),
            fetchRawgScreenshots(selectedSlug),
            fetchTrendingGames(4)
        ]);

        const relatedGenreSlug = gameData.genres?.[0]?.slug || '';
        const relatedGames = await fetchRelatedGames(relatedGenreSlug, selectedSlug);
        renderDetailPage(gameData, screenshots, trendingGames, relatedGames);
    } catch (error) {
        renderErrorView(error.message);
    }
}

const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => document.body.classList.toggle('menu-open'));
}

initDetailPage();
