const frontendConfig = {
    baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? '' 
        : '/FSA-Website' // Replace with your actual repository name
};

export default frontendConfig; 