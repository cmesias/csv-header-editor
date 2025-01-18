document.getElementById('processBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFile');

    if (!fileInput.files.length) {
        alert('Please upload a CSV file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const csvData = event.target.result;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');

        // Format headers
        const formattedHeaders = headers.map(header => formatHeader(header.trim()));

        // Create new CSV content
        const updatedCsv = [formattedHeaders.join(',')].concat(lines.slice(1)).join('\n');

        // Download the updated CSV
        const blob = new Blob([updatedCsv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'updated_headers.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    reader.readAsText(file);
});

function formatHeader(header) {
    return header
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_');   // Replace spaces with underscores
}