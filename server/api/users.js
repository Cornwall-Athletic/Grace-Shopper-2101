const express = require('express');

const router = express.Router();

const {
  models: { User, Review },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/', requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: Review,
      order: [['email', 'DESC']],
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Review });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({ email, password, firstName, lastName });
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const userToModify = await User.findByPk(req.params.id);
    const updated = await userToModify.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
