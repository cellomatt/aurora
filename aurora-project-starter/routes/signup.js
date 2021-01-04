const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const db = require('../db/models');
const { User } = db;

const csrfProtection = csrf({ cookie: true });
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/* GET sign-up form. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', async function(req, res, next) {
  const { username, email, password } = req.body;
  // check if user already exists in db
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ 
    username, 
    email,
    hashedPassword
  });
  
  res.redirect('/');
})

module.exports = router;
