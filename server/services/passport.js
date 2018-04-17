const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User, insertUser } = require('../services/mysqlDb.js');

/*passport serialize user */
passport.serializeUser((user, done) => {
    console.log('dans serialize');
    done(null, user.id);
  }
);

passport.deserializeUser((id, done) => {
    console.log();
    User.findOne({ where: {id:id} })
    .then(user => done(null, user))
    .catch(err => console.log(err));
});

/*passport local strategy */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    console.log('dans la strategie');
        User
        .findOne({where:{email:email}})
        .then(user => {
            if (user)
                done(null, user);
            else done(null, false);
        })
        .catch(err => done(err));
  }));

  const signOut = () => {
    return (req, res, next) => {
            User.findOne({where:{id:req.user.id}})
                .then(user => {
                    req.logout();
                    return user.destroy({force:true});
                })
                .then(()=>res.status(200).send(JSON.stringify('user deleted')))
            .catch(err=>res.status(404).send(JSON.stringify('not found')));
    }
}

/*session check if existing */
const isLogged = () => {
    return (req, res, next) => {
            if (req.isAuthenticated()){
                console.log('authed');
                res.status(200).send(req.user);
            }
            else
                res.status(200).send(false);
        }
};

const logOut = () => {
    return (req, res, next) => {
        req.logout();
        res.status(200).send(JSON.stringify('You\'re logged out!'));
    }
}

const signIn = () => {
    return (req, res, next) => {
        User.create(req.body)
        .then(user => {
            req.login(user, err => {if (err) console.log(newClient)});
            res.status(200).send(JSON.stringify(user));
        })
        .catch(err => res.status(400).send(JSON.stringify('Oops... an error occured')));
    }
} 

const logIn = () => {
    return (
        [
            passport.authenticate('local'),
            (req, res) => {
                res.status(200).send(JSON.stringify(req.user));
            }
        ]
    )
}

module.exports = {
    passport,
    logIn,
    isLogged,
    logOut,
    signIn,
    signOut
}