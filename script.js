const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error("Error fetching data:", error));


async function fetchDataAsync() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderTable(data);
    } catch(error) {
        console.error("Error fetching data:", error);
    }
}

function renderTable(data) {
    const tableBody = document.getElementById("coinsTableBody");
    tableBody.innerHTML = "";

    data.forEach(coin => {
        const row = tableBody.insertRow();

        const {image, name, symbol, current_price, total_volume} = coin;
        const marketCap = coin.market_cap;
        const percentageChange = coin.price_change_percentage_24h;

        const imgCell = row.insertCell();
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = name;
        imgElement.width = 30;
        
        imgCell.appendChild(imgElement);
        row.insertCell().innerText = name;
        row.insertCell().innerText = symbol;
        row.insertCell().innerText = current_price;
        row.insertCell().innerText = total_volume;
        row.insertCell().innerText = marketCap;
        row.insertCell().innerText = percentageChange;
    });
}

function search() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    const filteredData = originalData.filter(coin =>
    coin.name.toLowerCase(),includes(searchTerm) || 
    coin.symbol.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredData);
}

let originalData;

function sortBy(key) {
    const sortedData = [...originalData];

    sortedData.sort((a, b) => {
        if(key === 'marketCap') {
            return b.market_cap - a.market_cap;
        }else if(key === 'percentageChange') {
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }

        return 0;
    });

    renderTable(sortedData);
}

fetch(apiUrl) 
    .then(response => response.json())
    .then(data => {
        originalData = data;
        renderTable(data);
    })
    .catch(error => console.error("Error fetchinf data:", error));
