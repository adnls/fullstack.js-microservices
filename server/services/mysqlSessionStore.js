var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const SECRET = '123azerty';

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: SECRET,
    database: 'session_test',
    createDatabaseTable: true,
    connectionLimit: 3,
};
 
var sessionStore = new MySQLStore(options);

module.exports = {
    sessionStore,
    session
}