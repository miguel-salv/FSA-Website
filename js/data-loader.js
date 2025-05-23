// Function to load JSON data
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// Function to render executive board members
async function renderExecutiveBoard() {
    const data = await loadJSON('data/leadership.json');
    if (!data) {
        console.error('Failed to load leadership data');
        return;
    }

    const container = document.querySelector('.team-container');
    if (!container) {
        console.error('Team container not found in the DOM');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Add all team member cards at once
    const cardsHTML = data.executiveBoard
        .map(
            member => `
        <div class="team-member">
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="member-position">${member.position}</p>
            </div>
        </div>
    `
        )
        .join('');

    container.innerHTML = cardsHTML;
}

// Function to render faculty advisor
async function renderFacultyAdvisor() {
    const data = await loadJSON('data/leadership.json');
    if (!data) {
        console.error('Failed to load leadership data');
        return;
    }

    const container = document.querySelector('.advisor-container');
    if (!container) {
        console.error('Advisor container not found in the DOM');
        return;
    }

    const advisor = data.facultyAdvisor;
    container.innerHTML = `
        <div class="team-member faculty">
            <div class="member-image">
                <img src="${advisor.image}" alt="${advisor.name}">
            </div>
            <div class="member-details">
                <h3>${advisor.name}</h3>
                <p>${advisor.title}</p>
                <div class="member-contact">
                    <a href="mailto:${advisor.email}"><i class="fas fa-envelope"></i> ${advisor.email}</a>
                </div>
            </div>
        </div>
    `;
}

// Function to render alumni by year
async function renderAlumni() {
    const data = await loadJSON('data/alumni.json');
    if (!data) return;

    const container = document.querySelector('.alumni-by-year-container');
    if (!container) return;

    container.innerHTML = data.alumni
        .map(
            yearGroup => `
        <section class="alumni-year-section">
            <div class="year-header">
                <i class="fas fa-calendar-alt" style="color: var(--secondary-color); margin-right: 10px;"></i>
                <h3>Class of ${yearGroup.year}</h3>
            </div>
            <div class="alumni-grid">
                ${yearGroup.graduates
                    .map(
                        graduate => `
                    <div class="alumni-card">
                        <div class="alumni-card-top">
                            <div class="alumni-image">
                                <img src="${graduate.photo && graduate.photo.trim() !== '' ? graduate.photo : 'images/placeholders/placeholder-profile.png'}" alt="${graduate.name}">
                            </div>
                            <div class="alumni-main-info">
                                <h4 class="alumni-name">${graduate.name}</h4>
                                <div class="alumni-major">${graduate.major}</div>
                            </div>
                        </div>
                        <div class="alumni-job-info">
                            <div class="alumni-job-title">${graduate.jobTitle || ''}</div>
                            <div class="alumni-job-company">${graduate.company || ''}</div>
                            <div class="alumni-job-location">${graduate.location ? `<i class='fas fa-map-marker-alt' style='margin-right:6px;color:var(--secondary-color);'></i>${graduate.location}` : ''}</div>
                        </div>
                        <div class="alumni-fsa-role">
                            ${graduate.fsaRole ? `<span>${graduate.fsaRole}</span>` : ''}
                        </div>
                        <div class="alumni-contact">
                            ${graduate.email ? `<a href="mailto:${graduate.email}" title="Email"><i class="fas fa-envelope"></i></a>` : ''}
                            ${graduate.linkedin ? `<a href="${graduate.linkedin}" target="_blank" rel="noopener" title="LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
                        </div>
                    </div>
                `
                    )
                    .join('')}
            </div>
        </section>
    `
        )
        .join('');
}

// Initialize data loading based on current page
document.addEventListener('componentsLoaded', () => {
    const path = window.location.pathname;
    const currentPage = path.includes('leadership')
        ? 'leadership.html'
        : path.includes('alumni')
          ? 'alumni.html'
          : path.split('/').pop();

    if (currentPage === 'leadership.html') {
        renderExecutiveBoard();
        renderFacultyAdvisor();
    } else if (currentPage === 'alumni.html') {
        renderAlumni();
    }
});
