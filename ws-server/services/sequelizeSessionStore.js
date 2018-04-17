const Sequelize = require('sequelize');
var expressSession = require('express-session');
var SequelizeSessionConnector = require('connect-session-sequelize')(expressSession.Store);    

/* session store config*/
var mysqlDb = new Sequelize('mysql://root:123azerty@127.0.0.1:3306/session_test');

var sqliteDb = new Sequelize(
    "session_store",
    "adnls",
    "123azerty", 
    {
        "dialect": "sqlite",
        "storage": "./session.sqlite"
    }
);

var mysqlSessionStore = new SequelizeSessionConnector({
    db: mysqlDb
})

var sqliteSessionStore = new SequelizeSessionConnector({
    db: sqliteDb
})


const asyncInit = () => async sessionStore => {
    return await sessionStore.sync({force:false});
}

const initializeSessionStore = asyncInit();

const session = (sessionStore, SECRET) => {
    return expressSession({
        secret: SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: true
})}

module.exports = {
    session, 
    mysqlSessionStore,
    sqliteSessionStore,
    initializeSessionStore
};