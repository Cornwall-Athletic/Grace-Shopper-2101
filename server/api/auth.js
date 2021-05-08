const express = require('express');

const router = express.Router();

const {
  models: { User },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const { id, admin, cart, email, firstName, lastName } = user;
    res.send({ id, admin, cart, email, firstName, lastName });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const env = require('../../env');
    process.env.JWT = env.JWT;
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = router;
