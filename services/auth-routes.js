const express = require('express');
const passport = require('passport');


const router = express.Router();
//Oauth Routes//////////////////////////////////////////////
// sends user to Google auth sign in
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// gets user info back after log in
router.get('/google/callback', passport.authenticate('google'),
    
    (req, res) => {
        console.log(req.headers.cookie) 
        res.redirect('/dashboard')
    }
);

// logs user out and removes req.user property and session
router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.headers.cookie)
    res.redirect('/');
});

// returns current user info
router.get('/current_user', (req, res) => {
    
    res.send(req.user);
});

/////localStrategy Routes///////////////////////////////////////////////////////////


//911//911//911
//set the res.redirect when the dashboard is ready and linked in heroku in login

//login user and send to dashboard when successful or login if not
router.post('/login', passport.authenticate('local.login', {failureRedirect: '/login'}), (req, res) => {
    console.log('login auth returned');
    //res.redirect('/dashboard');
    res.status(200).json({
        loginSuccess: true
    });
});

//register users and send to dashboard or back to form based on sucess
router.post('/register', passport.authenticate('local.register', {
//     successRedirect : '/login', 
//     failureRedirect : '/register', 
    failureFlash : true 
}), (req, res) => {
    res.status(201).json({
        registerSuccess: true
    });
});



module.exports = router;
