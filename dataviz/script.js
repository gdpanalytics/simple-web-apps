document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
document.getElementById('plotButton').addEventListener('click', plotData, false);

let parsedData = [];

function handleFileSelect(event) {
    const file = event.target.files[0];
    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            parsedData = results.data;
            updateAxisSelectors(results.meta.fields);
            createDataTable(parsedData, results.meta.fields);
        }
    });
}

function updateAxisSelectors(columns) {
    const xAxisSelector = document.getElementById('xAxis');
    const yAxisSelector = document.getElementById('yAxis');
    xAxisSelector.innerHTML = '';
    yAxisSelector.innerHTML = '';

    columns.forEach(column => {
        xAxisSelector.add(new Option(column, column));
        yAxisSelector.add(new Option(column, column));
    });
}

function plotData() {
    if (parsedData.length === 0) {
        console.error("No data available to plot.");
        return;
    }

    const plotType = document.getElementById('plotType').value;
    const xAxisValue = document.getElementById('xAxis').value;
    const yAxisValue = document.getElementById('yAxis').value;

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: plotType,
        data: {
            labels: parsedData.map(item => item[xAxisValue]),
            datasets: [{
                label: yAxisValue,
                data: parsedData.map(item => item[yAxisValue]),
                pointRadius: 5,
            }]
        },
    });
}

function createDataTable(data, columns) {
    const container = document.getElementById('dataTable');
    container.innerHTML = '';
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
    columns.forEach(column => {
        const headerCell = document.createElement('th');
        headerCell.textContent = column;
        headerRow.appendChild(headerCell);
    });
    tbody.appendChild(headerRow);

    data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(column => {
            const cell = document.createElement('td');
            cell.textContent = item[column];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}
