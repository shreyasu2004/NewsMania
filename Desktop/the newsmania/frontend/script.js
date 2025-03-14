const loadNews = async () => {
    try {
        // Times of India
        const toi = await fetch('http://localhost:5000/api/news/toi');
        const toiData = await toi.json();
        displayNews(toiData, 'times-of-india');

        // Hindustan Times
        const ht = await fetch('http://localhost:5000/api/news/ht');
        const htData = await ht.json();
        displayNews(htData, 'hindustan-times');

        // Vijay Karnataka
        const vk = await fetch('http://localhost:5000/api/news/vk');
        const vkData = await vk.json();
        displayNews(vkData, 'vijay-karnataka');

        // The New Indian Express
        const nie = await fetch('http://localhost:5000/api/news/nie');
        const nieData = await nie.json();
        displayNews(nieData, 'new-indian-express');
    } catch (error) {
        console.error('Error loading news:', error);
    }
};

// Helper function to display news
const displayNews = (data, elementId) => {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    data.slice(0, 5).forEach(article => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        container.appendChild(listItem);
    });
};

// Load news on page load
window.onload = loadNews;
