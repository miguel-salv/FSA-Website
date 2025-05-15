console.log('Footer script starting...');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    try {
        const response = await fetch('./data/leadership.json');
        console.log('JSON response:', response);
        const data = await response.json();
        console.log('Leadership data:', data);
        
        const president = data.executiveBoard.find(member => member.position === 'President');
        console.log('Found president:', president);
        
        if (president) {
            const contactName = document.querySelector('.footer-section:nth-child(3) p:first-child');
            const contactEmail = document.querySelector('.footer-section:nth-child(3) p:nth-child(2)');
            
            console.log('Contact elements:', { contactName, contactEmail });
            
            if (contactName && contactEmail) {
                contactName.textContent = president.name;
                contactEmail.innerHTML = `<i class="fas fa-envelope"></i> ${president.email}`;
                console.log('Updated contact information');
            }
        }
    } catch (error) {
        console.error('Error loading leadership data:', error);
    }
}); 