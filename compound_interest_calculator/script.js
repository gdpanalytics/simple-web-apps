function calculateInterest() {
    const principal = document.getElementById('principal').value;
    const rate = document.getElementById('rate').value;
    const years = document.getElementById('years').value;

    let amounts = [];
    let labels = [];
    let p = parseFloat(principal);
    let r = parseFloat(rate) / 100;
    let t = parseInt(years);

    for (let i = 0; i <= t; i++) {
        amounts.push(p * Math.pow(1 + r, i));
        labels.push(`Year ${i}`);
    }

    const totalAmount = amounts[amounts.length - 1];
    const interestEarned = totalAmount - p;

    document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
    document.getElementById('interestEarned').textContent = `$${interestEarned.toFixed(2)}`;

    renderChart(labels, amounts);
}

function renderChart(labels, data) {
    const ctx = document.getElementById('interestChart').getContext('2d');
    if (window.interestChart?.destroy) {
        window.interestChart.destroy();
    }
    window.interestChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Compound interest',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                data: data,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Capital (€)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}
