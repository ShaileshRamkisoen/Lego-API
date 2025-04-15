document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');

    async function searchLegoSets(query) {
        try {
            const response = await fetch(`https://interface2.jeffvanderheijden.nl/api/sets?search=${encodeURIComponent(query)}`);
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error fetching LEGO sets:', error);
            resultsContainer.innerHTML = '<p class="error">Error loading LEGO sets. Please try again.</p>';
        }
    }

    function displayResults(sets) {
        resultsContainer.innerHTML = '';
        
        if (sets.length === 0) {
            resultsContainer.innerHTML = '<p>No LEGO sets found. Try a different search term.</p>';
            return;
        }

        sets.forEach(set => {
            const setElement = document.createElement('div');
            setElement.className = 'lego-set';
            
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';
            
            const img = new Image();
            img.src = set.img_url;
            img.alt = set.name;
            img.className = 'lego-image';
            
            img.onload = function() {
                imgContainer.classList.add('loaded');
            };
            
            img.onerror = function() {
                img.src = 'https://www.lego.com/cdn/cs/set/assets/blt6a0b0c0b0b0b0b0b/placeholder.png';
                imgContainer.classList.add('loaded');
            };
            
            imgContainer.appendChild(img);
            
            const infoHtml = `
                <h3>${set.name}</h3>
                <p><strong>Set Number:</strong> ${set.set_num}</p>
                <p><strong>Year:</strong> ${set.year}</p>
                <p><strong>Parts:</strong> ${set.num_parts}</p>
            `;
            
            const infoContainer = document.createElement('div');
            infoContainer.className = 'set-info';
            infoContainer.innerHTML = infoHtml;
            
            setElement.appendChild(imgContainer);
            setElement.appendChild(infoContainer);
            resultsContainer.appendChild(setElement);
        });
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchLegoSets(query);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchLegoSets(query);
            }
        }
    });
}); 