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
- Runs completely in the browser

## Live Demo

[View Live Project](https://database-playground.vercel.app/)

## Usage

1. Enter your SQL query in the text area
2. Click Execute to run the query
3. View results in the results section
4. Click Clear to reset

## Sample Queries

Click any sample query button to load common SQL operations like CREATE TABLE, SELECT, INSERT, UPDATE, DELETE, and more.

## Technical Details

- Built with vanilla JavaScript
- PGlite for PostgreSQL in the browser
- Data stored in IndexedDB
- No server or backend needed

## Project Structure

```
sql-playground/
├── index.html
├── script.js
└── functions.js
```

---

Built with vanilla JavaScript and PGlite.
