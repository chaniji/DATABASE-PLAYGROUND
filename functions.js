import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js';

// INITILIAZING DB
export let  db;
 export async function initDB() {
    try {
        db = new PGlite('idb://babel-sql-playground');
        console.log('Database initialized successfully!');
    } catch (err) {
        showError('Failed to initialize database: ' + err.message);
    }
}
// ERROR MESSAGE
 function showError(message) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = `<div class="status status-error">■ Error: ${message}</div>`;
}
// DISPLAYING RESULT
 function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    let html = '<div class="status status-success">■ Success! ' + result.rows.length + ' row(s) returned.</div>';
    html += '<table class="table">';

    html += '<tr>';
    result.fields.forEach(field => {
        html += `<th>${field.name}</th>`;
    });
    html += '</tr>';

    result.rows.forEach(row => {
        html += '<tr>';
        result.fields.forEach(field => {
            html += `<td>${row[field.name] !== null ? row[field.name] : 'NULL'}</td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    resultsSection.innerHTML = html;
}
// CLEAR
export function clear (){
    document.getElementById('resultsSection').innerHTML = '<div class="results-empty">System Ready. Enter a query and press Execute.</div>';
}
// EXECUTE QUERY
export async function executeQuery() {
    const query = document.getElementById('queryInput').value.trim();
    const resultsSection = document.getElementById('resultsSection');
    const executeBtn = document.getElementById('ExecuteButton');
    if (!query) return;
    executeBtn.disabled = true;
    resultsSection.innerHTML = '<div class="loading">▶ Executing query...</div>';
    try {
        const result = await db.query(query);
        if (result.rows && result.rows.length > 0) {
            displayResults(result);
        } else {
            resultsSection.innerHTML = '<div class="status status-success">■ Query executed successfully! ' +
                (result.affectedRows ? `${result.affectedRows} row(s) affected.` : 'No rows returned.') + '</div>';
        }
    } catch (err) {
        showError(err.message);
    } finally {
        executeBtn.disabled = false;
    }
}
// SET QUERY
export function setQuery(query) {
    document.getElementById('queryInput').value = query;
}

