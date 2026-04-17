let myChart; // Store chart globally to allow for updates



async function fetchData() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();

        data.forEach(item => {
            const loc = item.location;
            const iceElement = document.getElementById(`ice-${loc}`);
            const tempElement = document.getElementById(`temp-${loc}`);
            const badge = document.getElementById(`badge-${loc}`);

            const iceValue = (item.avgIceThickness != null) 
                ? `${item.avgIceThickness.toFixed(1)} cm` 
                : "No Data";
                
            const tempValue = (item.avgSurfaceTemp != null) 
                ? `${item.avgSurfaceTemp.toFixed(1)}°C` 
                : "N/A";

            if (iceElement) iceElement.innerText = iceValue;
            if (tempElement) tempElement.innerText = tempValue;
            if (badge) {
                badge.innerText = item.safetyStatus || "Unknown";
                badge.className = `badge ${(item.safetyStatus || 'unknown').toLowerCase()}`;
            }
        });

        document.getElementById('last-update').innerText = new Date().toLocaleTimeString();
        updateHistoricalChart();
    } catch (error) {
        console.error("Dashboard update failed:", error);
    }
}

async function updateHistoricalChart() {
    try {
        const response = await fetch('/api/history');
        const historyData = await response.json();

        const labels = [...new Set(historyData.map(item => 
            new Date(item.windowEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        ))];

        const locations = ["DowsLake", "FifthAve", "NAC"];
        const colors = { "DowsLake": "#3498db", "FifthAve": "#e67e22", "NAC": "#e74c3c" };

        const datasets = locations.map(loc => ({
            label: loc === "DowsLake" ? "Dow's Lake" : loc === "FifthAve" ? "Fifth Avenue" : "NAC",
            data: historyData.filter(d => d.location === loc).map(d => Number(d.avgIceThickness)),
            borderColor: colors[loc],
            backgroundColor: colors[loc] + '22',
            tension: 0.3,
            fill: true,
            pointRadius: 4
        }));

        const ctx = document.getElementById('iceChart').getContext('2d');
        if (myChart) { myChart.destroy(); }

        myChart = new Chart(ctx, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { 
                    y: { 
                        beginAtZero: false,
                        suggestedMin: 20, 
                        suggestedMax: 40,
                        title: { display: true, text: 'Thickness (cm)' } 
                    } 
                }
            }
        });
    } catch (err) {
        console.error("Chart update failed:", err);
    }
}

fetchData();
setInterval(fetchData, 30000);