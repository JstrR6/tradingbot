const tickers = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "JPM", "V", "PG", "UNH"
];

const tickerList = document.getElementById("tickerList");
const tickerSearch = document.getElementById("tickerSearch");
const tickerData = document.getElementById("tickerData");
const tickerHeader = document.getElementById("tickerHeader");
const tickerChart = document.getElementById("tickerChart");
const tickerInfo = document.getElementById("tickerInfo");
let chart;

function displayTickers(filteredTickers) {
    tickerList.innerHTML = "";
    filteredTickers.forEach(ticker => {
        const li = document.createElement("li");
        li.textContent = ticker;
        li.addEventListener("click", () => {
            fetchTickerData(ticker);
        });
        tickerList.appendChild(li);
    });
}

displayTickers(tickers);

tickerSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toUpperCase();
    const filteredTickers = tickers.filter(ticker => ticker.includes(searchTerm));
    displayTickers(filteredTickers);
    tickerData.style.display = 'none';
});

async function fetchTickerData(ticker) {
    try {
        const response = await fetch(`/ticker/${ticker}`);
        const data = await response.json();
        if (data.error) {
            tickerData.innerHTML = `<p>${data.error}</p>`;
            tickerData.style.display = 'block';
            return;
        }
        const parsedData = JSON.parse(data.data);
        displayTickerData(ticker, parsedData);
    } catch (error) {
        tickerData.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        tickerData.style.display = 'block';
    }
}

function displayTickerData(ticker, data) {
    tickerHeader.textContent = ticker;
    tickerData.style.display = 'block';
    tickerInfo.innerHTML = ''; //Clear previous data

    const labels = data.map(item => new Date(item.Datetime).toLocaleTimeString());
    const prices = data.map(item => item.Close);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(tickerChart.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Close Price',
                data: prices,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    display: false,
                }
            }
        }
    });
}