var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var configGoog = require('./configGoog');

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized:false,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'))

// this connects to postgres
var db = massive.connectSync({
  connectionString : 'postgres://postgres:postgres@localhost/click_event'
});

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  scope: ['openid', 'email', 'https://www.googleapis.com/auth/userinfo.profile']
}, function(accessToken, refreshToken, profile, done) {
  console.log(profile.emails[0].value);
  db.getUserByGoogleId([profile.id], function (err, user) {
    if(!user.length) {
      console.log('creating user');
      var name = profile.name.givenName + ' ' + profile.name.familyName
      db.createUserGoogle([name, profile.id], function(err, newUser){
        return done(err, newUser[0], {scope:'all'});
      })
    } else {
      return done(err, user[0]);
    }
  })
}))
//
//
app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile']}));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), function(req, res) {
  res.redirect('/')
})


// Facebook Strategy complete!!
passport.use('facebook', new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL:"http://localhost:4000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile.emails[0].value);
    db.getUserByFacebookId([profile.id], function(err, user) {
      if(!user.length) {
        console.log('Creating USER');
        db.createUserFacebook([profile.displayName, profile.id], function(err, newUser) {
          return done(err, newUser[0], {scope:'all'});
        })
      } else {
        return done(err, user[0]);
      }
    })
  }))

passport.serializeUser(function(user, done) {
  return done(null, user);
})
passport.deserializeUser(function(user, done) {
  if(user.googleid){
    db.getUserByGoogleId([user.googleid], function(err, us){
      return done(null, us[0]);

    })
  }
  else {
    db.getUserByFacebookId([user.facebookid], function(err, u) {

    return done(null, u[0]);
  })

}
})

// send to facebook to sign in

app.get('/auth/facebook',
passport.authenticate('facebook', {scope: ['email']}))

// this one is to redirect after successfully signing in
app.get('/auth/facebook/callback',
passport.authenticate('facebook', {failureRedirect: '/login'}),
function(req, res) {
  res.status(200).redirect('/#/');
})

app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/')
  })
})


app.get('/verifyuser', function(req, res){
  if(!req.session.passport){
    console.log('test');
    res.status(200).json('')
  }
  else {
    res.json(req.session.passport.user)

  }
})

// passport.use('local', new LocalStrategy(
//   function(username, password, done) {
//     db.user_info.findOne({username: username}, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {return done(null, false); }
//       if (user_info.password != password) { return done(null, false); }
//       return done(null, user);
//     })
//   }
// ))
//
// passport.serializeUser(function(user, done) {
//   return done(null, user);
// })
//
// passport.deserializeUser(function(user, done) {
//   return done(null, user);
// })
//
// app.post('/auth/local', passport.authenticate('local'), function(req, res) {
//   res.status(200).redirect('/maps');
// });
//
// function isAuthed(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.status(403).send({msg: 'YOU SHALL NOT PASS'});
//   }
// }
//
// app.get('/auth/me', isAuthed, function(req, res) {
//   if (req.user) {
//     consoel.log(req.user);
//     res.status(200).send(req.user);
//   } else {
//     consoel.log('No user!')
//     res.status(200).send();
//   }
// })
//
// app.get('/auth/logout', function(req, res) {
//   req.logout();
//   res.redirect('/maps');
// })
//
// app.get('/eventinfo', function(req, res) {
//   db.get_all_userinfo(function(err, user_info){
//     res.send(user_info);
//   });
// });
//
// app.get('/user_info', function(req, res) {
//   res.send({user_info:[]});
// });
//
// app.post('/user_info', function(req, res) {
//   res.send({id: 123});
// });












































var port = 4000
app.listen(port, function(){
  console.log('Listening on', port);
});
