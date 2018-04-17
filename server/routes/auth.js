var router = require('express').Router();
var { logIn, isLogged, logOut, signIn, signOut } = require('../services/passport.js'); 

router.post('/signIn', signIn());
router.post('/logIn', logIn());
router.get('/isLogged', isLogged());
router.get('/logOut', logOut());
router.get('/signOut', signOut());

module.exports = router;