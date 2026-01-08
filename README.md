# Classic Mac-Style SQL Playground

A browser-based SQL database playground with a classic Macintosh user interface. Practice SQL queries using a PostgreSQL database that runs directly in your browser.

```
+----------------------------------+
| Database Playground              |
+----------------------------------+
| SQL Query:                       |
| SELECT * FROM users;             |
|                                  |
| [Execute] [Clear]                |
|                                  |
| Sample Queries:                  |
| - CREATE TABLE                   |
| - SELECT                         |
| - INSERT                         |
|                                  |
| Results:                         |
| +--------+--------+             |
| | id     | name   |             |
| +--------+--------+             |
+----------------------------------+
```

## Features

- Classic Macintosh window design from the 1990s
- Full PostgreSQL database powered by PGlite
- Data persists between sessions using IndexedDB
- Built-in sample queries for learning
- Formatted table results
- Works on desktop and mobile devices
- No server or backend needed
- Runs completely in the browser

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation required

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sql-playground.git
cd sql-playground
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js
npx http-server
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage

### Basic Operations

1. Enter your SQL query in the text area
2. Click the Execute button to run the query
3. View results in the results section below
4. Click Clear to reset the results area

### Sample Queries

The interface includes quick-access templates for common operations:

- CREATE TABLE - Create a new table
- ALTER TABLE - Modify an existing table
- SELECT - Query data from tables
- INSERT - Add new records
- UPDATE - Modify existing records
- DELETE - Remove records
- DROP TABLE - Delete a table
- AGGREGATE - Use functions like AVG, COUNT, SUM

Click any sample query to load it into the query editor.

### Example Queries

Create a table:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);
```

Insert data:
```sql
INSERT INTO users (name, email) 
VALUES ('John Doe', 'john@example.com');
```

Query data:
```sql
SELECT * FROM users WHERE name LIKE 'John%';
```

Update records:
```sql
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
```

Delete records:
```sql
DELETE FROM users WHERE id = 1;
```

## Project Structure

```
sql-playground/
│
├── index.html          # Main HTML file
├── script.js           # Main application logic and UI
├── functions.js        # Database functions and operations
└── README.md           # This file
```

## How It Works

The application uses PGlite, a lightweight PostgreSQL implementation that runs in the browser using WebAssembly. Data is stored in IndexedDB, which means your tables and data persist even after closing the browser.

When you execute a query:
1. The query is sent to the PGlite engine
2. PGlite processes it like a real PostgreSQL database
3. Results are formatted into an HTML table
4. Data is automatically saved to IndexedDB

## Browser Compatibility

Works on all modern browsers that support:
- ES6 modules
- IndexedDB
- WebAssembly

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technical Details

### Dependencies

- PGlite - PostgreSQL in the browser via WebAssembly
- No other external dependencies

### Storage

Data is stored using IndexedDB with the database name "babel-sql-playground". Your tables and data will persist across browser sessions unless you clear your browser's indexed database storage.

### Performance

PGlite is optimized for browser usage but has some limitations:
- Best for small to medium datasets (up to 100MB)
- Complex queries may be slower than server-side PostgreSQL
- Performance depends on your device's processing power

## Limitations

- No multi-user support (single browser instance only)
- Storage limited by browser IndexedDB quota
- Some advanced PostgreSQL features may not be available
- Cannot connect to external databases

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- PGlite team for the browser-based PostgreSQL implementation
- Classic Macintosh UI design inspiration
- The open source community

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your browser supports the required features
3. Try clearing IndexedDB storage and refreshing
4. Open an issue on GitHub with details about the problem

## Roadmap

Future improvements under consideration:
- Export and import database functionality
- Query history
- Syntax highlighting in the editor
- Auto-complete for SQL keywords
- Multiple database support
- Dark mode option

## Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with vanilla JavaScript and PGlite.
