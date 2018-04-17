const SECRET = '123azerty';

var proxy = require('http-proxy-middleware');
const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = http.createServer(app);
const { session, mysqlSessionStore:sessionStore, initializeSessionStore } = require('./services/sequelizeSessionStore.js');
//const { session, sessionStore } = require('./services/mysqlSessionStore.js');
const { passport } = require('./services/passport.js');
const { initializeDb, insertUser } = require('./services/mysqlDb');
const authRoutes = require('./routes/auth.js');

const watch = () => {
    return (req, res, next) => {
    console.log(req.url);
    next();
    };
}

/*proxy request to a ws only server, avoid cors and shit */
const proxyOptions = {
    target: 'http://localhost:8080',
    changeOrigin: true,               
    ws: true               
};

/*app config */
app
    .use(watch())
    .use('/socket.io',  proxy(proxyOptions))
    .use(cookieParser()) //give access to cookies
    .use(bodyParser.urlencoded({ extended: false })) //let read body
    .use(bodyParser.json()) //as a json
    .use(session(sessionStore))
    .use(passport.initialize())
    .use(passport.session())
    .use('/auth', authRoutes);

const port = 5000;    
const startServer = () => {
    server.listen(port, () => 
    console.log('\n> Server listening on http://localhost:' + port + '\n'));
}

initializeDb()
    .then(() => {
        return initializeSessionStore(sessionStore)
    }) //for sequelize session store only
    .then(() => startServer())
    .catch(err => console.log(err));