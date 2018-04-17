const Sequelize = require('sequelize');
const db = new Sequelize('mysql://root:123azerty@127.0.0.1:3306/session_test');
var userModel = require('../models/user.js');
var User = db.define('user', userModel);

const asyncInit = () => async () => {
    return await db.sync({force:true});
}

const initializeDb = asyncInit();

module.exports = { 
    db, 
    initializeDb, 
    User
};