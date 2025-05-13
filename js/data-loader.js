// Function to load JSON data
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// Function to render executive board members
async function renderExecutiveBoard() {
    const data = await loadJSON('data/leadership.json');
    if (!data) return;

    const container = document.querySelector('.team-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';
    
    // Add all team member cards at once
    const cardsHTML = data.executiveBoard.map(member => `
        <div class="team-member">
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="member-position">${member.position}</p>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = cardsHTML;
}

// Function to render faculty advisor
async function renderFacultyAdvisor() {
    const data = await loadJSON('data/leadership.json');
    if (!data) return;

    const container = document.querySelector('.advisor-container');
    if (!container) return;

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

    container.innerHTML = data.alumni.map(yearGroup => `
        <div class="alumni-year-group">
            <div class="year-header">
                <i class="fas fa-calendar-alt" style="color: var(--secondary-color); margin-right: 10px;"></i>
                <h3>Class of ${yearGroup.year}</h3>
            </div>
            <ul class="alumni-list">
                ${yearGroup.graduates.map(graduate => `
                    <li>${graduate.name} - ${graduate.major}</li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Initialize data loading based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'leadership.html') {
        renderExecutiveBoard();
        renderFacultyAdvisor();
    } else if (currentPage === 'alumni.html') {
        renderAlumni();
    }
}); 