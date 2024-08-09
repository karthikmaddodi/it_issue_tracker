const { Connection, Request } = require('tedious');
const { dbConfig } = require('../config');

// Create a connection to the database
const connection = new Connection(dbConfig);

connection.on('connect', err => {
    if (err) {
        console.error('Database Connection Failed:', err);
    } else {
        console.log('Connected to SQL Server');
    }
});

// Example function to execute a query
function executeQuery(query) {
    return new Promise((resolve, reject) => {
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

        connection.execSql(request);
    });
}

module.exports = {
    connection,
    executeQuery
};
