const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const {isLoggedIn} = require('../lib/auth');

router.get('/',(req,res)=>{
    res.render('links/login');
});
router.get('/signup',(req,res)=>{
    res.render('links/signup');
});
router.get('/', (req,res)=>{
    res.render('/links/signin');
});

router.post('/signin', (req, res, next) => {
    /*req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/signin');
    }*/
    passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
  });
  
router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect('/');
});
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', isLoggedIn,(req,res)=>{
    res.render('links/profile');
});

module.exports =router;