var http = require('http');
var server = http.createServer();
const cookieParser = require('cookie-parser');
const { session, mysqlSessionStore:sessionStore, initializeSessionStore } = require('./services/sequelizeSessionStore.js');
var passportSocketIo = require("passport.socketio");
var passport = require('passport');
const socketIO = require('socket.io');
const { User } = require('./services/mysqlDb.js');
const SECRET = '123azerty';
var sharedsession = require("express-socket.io-session");

const io = socketIO(server, {
  serveClient: false, 
  cookie:false
});

var nsp = io.of('/private');

/*passport must be in scope*/
passport.serializeUser((user, done) => {
    console.log('serializing');
    done(null, user.id);
  }
);

/*only deserialize seems to be used by the underlaying lib... how they access the object? */
passport.deserializeUser((id, done) => {
    console.log('deserializing');
    User.findOne({ where: {id:id} })
    .then(user => done(null, user))
    .catch(err => console.log(err));
});

nsp.use(sharedsession(session(sessionStore, SECRET), {
    autoSave:true
})); 

nsp.use(passportSocketIo.authorize({
  cookieParser: cookieParser,       // the same middleware you registrer in express
  key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
  secret:       SECRET,    // the session_secret to parse the cookie
  store:        sessionStore
}));

nsp.on('connection', socket => {
  
  console.log('Private channel connection');

  console.log(socket.handshake.session);

  const users = Object.entries(nsp.sockets).map(([id, client]) => {
    return {[id]: client.request.user.dataValues};
  });

  socket.emit('payload', users);
  
  socket.on('disconnect', () => {
      console.log('Private channel disconnection');
  })
});

const port = 8080;

initializeSessionStore(sessionStore)
.then(()=>server.listen(port, () => console.log('\n> Listening on http://localhost:' + port + '\n')));

//TODO deep read socket io docs get all props for displaying users list => done
//mix with session store to retrieve info via user => done