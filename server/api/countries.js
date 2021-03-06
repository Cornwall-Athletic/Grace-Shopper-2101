const router = require('express').Router();
const {
  models: { Product, Country, User },
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

router.get('/', async (req, res, next) => {
  try {
    const countries = await Country.findAll();
    res.status(200).send(countries);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const country = await Country.findByPk(req.params.id, {
      include: [Product],
    });
    res.send(country);
  } catch (ex) {
    next(ex);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const DeleteCountry = await Country.destroy({
      where: { id: req.params.id },
    });
    if (!DeleteCountry) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    const { name, flag, latitude, longitude } = req.body;
    const createCountry = await Country.create({
      name,
      flag,
      latitude,
      longitude,
    });
    res.status(201).send(createCountry);
  } catch (ex) {
    next(ex);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const countryToModify = await Country.findByPk(req.params.id);
    const { name, flag, lat, lon } = await countryToModify.update(req.body);
    res.status(200).send(name, flag, lat, lon);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
