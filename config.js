module.exports = {
    secretKey: 'h8G!5dM@k#3Lz&7tW2b^pV$',
    dbConfig: {
        server: 'localhost', // or your SQL Server address
        authentication: {
            type: 'default',
            options: {
                userName: 'sa', // Your SQL Server username
                password: 'Welcome2#' // Your SQL Server password
            }
        },
        options: {
            database: 'ITSupportTicketingDB', // Your database name
            encrypt: true, // Use encryption if required
            enableArithAbort: true // Recommended for SQL Server
        }
    }
};
