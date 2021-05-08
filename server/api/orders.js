/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const stripe = require('stripe')(
  'sk_test_51InvgGCzEJe0jWa9qwf4rTyGBxHY1GvAFSTaFniDqqGSJRt1mLTy9hIaLM3gcm7CJNV2T1GenLopTlj1HA9rFDNG00jDxVqD6W'
);
const router = require('express').Router();
const {
  models: { Order, User, StripeId },
} = require('../db');

//All Orders get route
router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        all: true,
        nested: true,
      },
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/orders/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        all: true,
        nested: true,
      },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// Purchase Order route
router.post('/purchase', async (req, res, next) => {
  try {
    const { date, items, orderId, userId } = req.body;
    const id = await Order.purchase(date, items, orderId, userId);
    res.status(200).send(id);
  } catch (err) {
    next(err);
  }
});

router.get('/cart/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await User.getCart(id);
    res.status(200).send(cart);
  } catch (err) {
    next(err);
  }
});

router.get('/purchases/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchases = await User.findPurchases(id);
    res.status(200).send({ purchases });
  } catch (err) {
    next(err);
  }
});

//Order Put Route
router.put('/orders/:id', async (req, res, next) => {
  try {
    const orderToModify = await Order.findByPk(req.params.id);
    const updated = await orderToModify.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

router.put('/updateCart', async (req, res, next) => {
  try {
    const { orderId, productId, amount } = req.body;
    await Order.updateProductsAmount(orderId, productId, amount);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put('/addToCart', async (req, res, next) => {
  try {
    const { orderId, products } = req.body;
    await Order.addProducts(orderId, products);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post('/create-checkout-session', async (req, res) => {
  const products = req.body;
  const promises = [];
  const Ids = [];
  for (const i of products) {
    promises.push(StripeId.findOne({ where: { productId: i.id } }));
  }
  Promise.all(promises).then((results) => {
    products.forEach((e) => {
      Ids.push({ price: results.find((element) => { return element.productId === e.id; }).id, quantity: e.amount });
    });
    return Ids;
  }).then(async (results) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: results,
      mode: 'payment',
      success_url: 'http://localhost:3000/#/cart?success=true',
      cancel_url: 'http://localhost:3000/#/cart?canceled=true',
    });
    res.json({ id: session.id });
  });
});

module.exports = router;
