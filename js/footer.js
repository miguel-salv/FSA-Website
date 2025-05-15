console.log('Footer script starting...');

document.addEventListener('componentsLoaded', async () => {
    console.log('Components Loaded');
    try {
        const response = await fetch('./data/leadership.json');
        console.log('JSON response:', response);
        const data = await response.json();
        console.log('Leadership data:', data);

        const president = data.executiveBoard.find(member => member.position === 'President');
        console.log('Found president:', president);

        if (president) {
            const contactName = document.getElementById('president-name');
            const contactEmail = document.getElementById('president-email');

            console.log('Contact elements:', { contactName, contactEmail });

            if (contactName && contactEmail) {
                contactName.textContent = president.name;
                contactEmail.innerHTML = `<a href="mailto:${president.email}"><i class="fas fa-envelope"></i> ${president.email}</a>`;
                console.log('Updated contact information');
            } else {
                console.error('Could not find contact elements in the DOM');
            }
        } else {
            console.error('Could not find president in leadership data');
        }
    } catch (error) {
        console.error('Error loading leadership data:', error);
    }
});
