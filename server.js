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
app.use(cors());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))

// this connects to postgres
var db = massive.connectSync({
    connectionString: 'postgres://postgres:postgres@localhost/click_event'
});

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/userinfo.profile']
}, function(accessToken, refreshToken, profile, done) {
    console.log(profile.emails[0].value);
    db.getUserByGoogleId([profile.id], function(err, user) {
        if (!user.length) {
            console.log('creating user');
            var name = profile.name.givenName + ' ' + profile.name.familyName
            db.createUserGoogle([name, profile.id], function(err, newUser) {
                return done(err, newUser[0], {
                    scope: 'all'
                });
            })
        } else {
            return done(err, user[0]);
        }
    })
}))

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/')
})

// Facebook Strategy complete!!
passport.use('facebook', new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'emails']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile.emails[0].value);
        db.getUserByFacebookId([profile.id], function(err, user) {
            if (!user.length) {
                console.log('Creating USER');
                db.createUserFacebook([profile.displayName, profile.id], function(err, newUser) {
                    return done(err, newUser[0], {
                        scope: 'all'
                    });
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
    if (user.googleid) {
        db.getUserByGoogleId([user.googleid], function(err, us) {
            return done(null, us[0]);
        })
    } else {
        db.getUserByFacebookId([user.facebookid], function(err, u) {

            return done(null, u[0]);
        })
    }
})
// send to facebook to sign in
app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }))

// this one is to redirect after successfully signing in
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.status(200).redirect('/#/');
    })

app.get('/logout', function(req, res) {
    req.session.destroy(function() {
        res.redirect('/')
    })
})

app.get('/verifyuser', function(req, res) {
    if (!req.session.passport) {
        console.log('test');
        res.status(200).json('')
    } else {
        res.json(req.session.passport.user)

    }
})



//NOTES DATABASE
app.post('/api/notes', function(req, res) {
    db.createnote([req.body.notes, req.body.userid], function(err, success) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json('note saved')
        }
    })
})

app.get('/notes', function(req, res, next) {
    db.getnote(req.body.notes),
        function(err, success, next) {
            res.status(200).json({
                notes: body.notes
            });
        }
})

app.put('/notes', function(req, res) {
    db.create([req.body.notes, req.body.userid], function(err, success) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json({
                notes: body.notes
            });
        }
    })
});


// QUESTIONS DATABASE

// var questions = [
//   {id:1, question: 'What is the best framework to use?', likes: 2},
//   {id:2, question: 'When are we going to get a Hawaiian Punch drinking fountain?', likes: 2},
//   {id:3, question: 'Where would you reccomend we look for jobs?', likes: 1}
// ]

app.get('/questions', function(req, res) {
    db.getquestions([], function(err, questions){
      if(err){
        res.status(500).json(err)
      }
      else {
        res.status(200).json(questions)
      }
    })
})

app.post('/questions', function(req, res) {
  var likes = 1;
    db.createquestion([req.body.question, likes], function(err, success){
      if(err){
        res.status(500).json(err)
      }
      else {
        res.status(200).json('added')
      }
    })

})

app.put('/questions/:id', function(req, res) {
    db.updatequestion([req.params.id, req.body.likes], function(err, success){
      if(err){
        res.status(500).json(err)
      }
      else {
        res.status(200).json('updated')
      }
    })

})

// app.put('/api/questions/:id', function(req, res){
//   for(var i = 0; i < questions.length; i++) {
//     if(questions[i].id==req.params.id) {
//         questions[i].question = req.body.question
//     }
//   }
//   res.status(200).json('updated!')
// })

// app.delete('/api/customers/:id', function(req, res){
//   questions.forEach(function(val, i, arr){
//     if(val.id == req.params.id){
//       arr.splice(i,1)
//     }
//   })
//   res.status(200).json('deleted')
// })









var port = 4000
app.listen(port, function() {
    console.log('Listening on', port);
})
