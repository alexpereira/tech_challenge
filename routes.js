const ctrl = require('./controllers');
const router = require('express').Router();

router.get('/v1/ping', (req, res, next) =>  {
  res.status(200)
    .send('OK')
    .end()
});

// Register API
router.post('/v1/register', ctrl.register.newUser);

// Login API
router.post('/v1/login', ctrl.login.user);

// Profile API
router.post('/v1/profile', ctrl.profile.user);

module.exports = router
