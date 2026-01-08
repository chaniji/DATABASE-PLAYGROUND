import {initDB,clear,executeQuery,setQuery} from "./functions.js";

const a = document.createElement("style");
const b = document.createElement("div");
const c = document.createElement("title");
c.textContent = "Database Playground";

a.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Chicago', 'Charcoal', 'Geneva', 'Helvetica', sans-serif;
    background: #cccccc;
    min-height: 100vh;
    padding: 10px;
  }

  @media (min-width: 768px) {
    body {
      padding: 20px;
    }
  }

  .window {
    background: #ffffff;
    border: 2px solid #000000;
    width: 95%;
    max-width: 500px;
    height: auto;
    max-height: 95vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
  }

  @media (min-width: 768px) {
    .window {
      width: 500px;
      height: 620px;
      max-height: 620px;
    }
  }

  .titlebar {
    background: #ffffff;
    border-bottom: 2px solid #000000;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 24px;
  }

  @media (min-width: 768px) {
    .titlebar {
      height: 20px;
    }
  }

  .titlefont {
    font-size: 13px;
    font-weight: bold;
    color: #000000;
    text-align: center;
  }

  @media (min-width: 768px) {
    .titlefont {
      font-size: 12px;
    }
  }

  .content {
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #ffffff;
  }

  @media (min-width: 768px) {
    .content {
      padding: 12px;
    }
  }

  .section {
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    .section {
      margin-bottom: 10px;
    }
  }

  .label {
    font-size: 11px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 4px;
  }

  .textarea {
    width: 100%;
    height: 70px;
    padding: 6px;
    border: 2px solid #000000;
    background: #ffffff;
    font-family: 'Monaco', 'Courier', monospace;
    font-size: 11px;
    resize: none;
    color: #000000;
  }

  @media (min-width: 768px) {
    .textarea {
      height: 80px;
    }
  }

  .textarea::placeholder {
    color: #999999;
  }

  .textarea:focus {
    outline: none;
  }

  .button-row {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    .button-row {
      margin-bottom: 10px;
    }
  }

  .btn {
    min-width: 70px;
    padding: 0 12px;
    height: 32px;
    background: #ffffff;
    border: 2px solid #000000;
    font-family: 'Chicago', 'Charcoal', sans-serif;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    color: #000000;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
    touch-action: manipulation;
  }

  @media (min-width: 768px) {
    .btn {
      height: 28px;
      font-size: 11px;
    }
  }

  .btn:active {
    background: #000000;
    color: #ffffff;
  }

  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .btn-primary {
    flex: 1;
  }

  .samples {
    background: #ffffff;
    border: 2px solid #000000;
    padding: 8px;
    height: 140px;
    overflow-y: auto;
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    .samples {
      height: 80px;
      margin-bottom: 10px;
    }
  }

  .samples-title {
    font-size: 10px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 6px;
  }

  .sample-item {
    font-family: 'Monaco', 'Courier', monospace;
    font-size: 10px;
    color: #000000;
    padding: 6px 4px;
    margin: 2px 0;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #000000;
    touch-action: manipulation;
  }

  @media (min-width: 768px) {
    .sample-item {
      padding: 4px;
    }
  }

  .sample-item:hover {
    background: #000000;
    color: #ffffff;
  }

  .sample-item:active {
    background: #000000;
    color: #ffffff;
  }

  .results {
    flex: 1;
    background: #ffffff;
    border: 2px solid #000000;
    padding: 8px;
    overflow-y: auto;
    overflow-x: auto;
    font-size: 11px;
    font-family: 'Monaco', 'Courier', monospace;
    min-height: 120px;
  }

  @media (min-width: 768px) {
    .results {
      min-height: 150px;
    }
  }

  .results-empty {
    color: #666666;
    text-align: center;
    padding: 20px;
    font-style: italic;
    font-size: 10px;
  }

  @media (min-width: 768px) {
    .results-empty {
      font-size: 11px;
    }
  }

  .status {
    padding: 6px 8px;
    margin-bottom: 8px;
    border: 2px solid #000000;
    font-weight: bold;
    font-size: 10px;
  }

  .status-success {
    background: #ffffff;
    color: #000000;
  }

  .status-error {
    background: #ffffff;
    color: #000000;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
    min-width: 300px;
  }

  .table th {
    background: #000000;
    color: #ffffff;
    padding: 6px 8px;
    text-align: left;
    border: 1px solid #000000;
    font-size: 9px;
    font-weight: bold;
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .table th {
      font-size: 10px;
    }
  }

  .table td {
    padding: 6px 8px;
    border: 1px solid #000000;
    font-size: 9px;
    background: #ffffff;
  }

  @media (min-width: 768px) {
    .table td {
      font-size: 10px;
    }
  }

  .table tr:nth-child(even) td {
    background: #f0f0f0;
  }

  .loading {
    color: #000000;
    font-weight: bold;
    text-align: center;
    padding: 20px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }

  .results::-webkit-scrollbar,
  .samples::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-left: 2px solid #000000;
  }

  @media (min-width: 768px) {
    .results::-webkit-scrollbar,
    .samples::-webkit-scrollbar {
      width: 16px;
      height: 16px;
    }
  }

  .results::-webkit-scrollbar-thumb,
  .samples::-webkit-scrollbar-thumb {
    background: #000000;
    border: 2px solid #ffffff;
  }

  .results::-webkit-scrollbar-corner {
    background: #ffffff;
  }
`;

b.innerHTML = `
<div class="window">
  <div class="titlebar">
    <span class="titlefont">Database Playground</span>
  </div>
  <div class="content">
    <div class="section">
      <div class="label">▶ SQL Query:</div>
      <textarea id="queryInput" class="textarea" placeholder="Enter SQL query...">SELECT * FROM users;</textarea>
    </div>
    <div class="button-row">
      <button class="btn btn-primary" id="ExecuteButton">
        ▶ Execute
      </button>
      <button class="btn" id="ClearButton">
        Clear
      </button>
    </div>
    <div class="samples">
      <div class="samples-title">■ Sample Queries:</div>
      <div class="sample-item" data-query="CREATE TABLE (table_name) (column1 datatype, column2 datatype, ...);">
        CREATE TABLE
      </div>
      <div class="sample-item" data-query="ALTER TABLE (table_name) ADD|MODIFY|DROP COLUMN (column_name);">
        ALTER TABLE
      </div>
      <div class="sample-item" data-query="SELECT (columns) FROM (table) WHERE (condition);">
        SELECT
      </div>
      <div class="sample-item" data-query="DROP TABLE (table_name);">
        DROP TABLE
      </div>
      <div class="sample-item" data-query="INSERT INTO (table_name) (columns) VALUES (values);">
        INSERT
      </div>
      <div class="sample-item" data-query="DELETE FROM (table_name) WHERE (condition);">
        DELETE
      </div>
      <div class="sample-item" data-query="UPDATE (table_name) SET (column1 = value1, column2 = value2, ...) WHERE (condition);">
        UPDATE
      </div>
      <div class="sample-item" data-query="SELECT AVG(column_name) AS avg_column FROM (table_name);">
        AGGREGATE (AVG, COUNT, SUM...)
      </div>
    </div>
    <div class="label">▶ Results:</div>
    <div class="results" id="resultsSection">
      <div class="results-empty">
        System Ready. Enter a query and press Execute.
      </div>
    </div>
  </div>
</div>
`;

document.body.appendChild(b);
document.head.appendChild(a);
document.head.appendChild(c);

const clearbtn = document.getElementById("ClearButton");
const executeBtn = document.getElementById('ExecuteButton');
const sampleQuery = document.querySelectorAll('.sample-item');

executeBtn.addEventListener("click", executeQuery);
clearbtn.addEventListener("click", clear);
sampleQuery.forEach(item => {
  item.addEventListener('click', () => {
    const query = item.dataset.query;
    setQuery(query);
  });
});

initDB();