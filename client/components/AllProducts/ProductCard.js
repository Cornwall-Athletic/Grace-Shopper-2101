import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Paper, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { addToCart } from '../../store/cart';

const ProductCard = (props) => {
  const { product } = props;
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const theme = useTheme();
  const useStyles = makeStyles({
    productsTitle: {
      marginLeft: 15,
      fontSize: 24,
      fontWeight: 400,
    },
  });
  const classes = useStyles();

  const handleClick = (prod) => {
    let cart = null;
    if (login.cart) {
      cart = login.cart;
    }
    dispatch(addToCart(prod, cart));
  };

  return (
    <Paper key={product.id} className="product">
      <Link href={`/#/products/${product.id}`}>
        <Typography id="product-link">{`${product.title}`}</Typography>
      </Link>

      <Typography>
        {product.country.name}
        <i className={`em ${product.country.flag}`} />
      </Typography>
      <span id="item-category">
        {product.categories
          .map((category) => {
            return category.name;
          })
          .join(', ')}
      </span>

      <span id="price">${product.price}</span>

      <br />
      <img
        className="allProductImage"
        src={product.imageUrl}
        alt={product.description}
      />
      <br />
      <Button
        id="quick-add"
        variant="contained"
        onClick={() => {
          handleClick(product);
        }}
      >
        Add Product
      </Button>
    </Paper>
  );
};

export default ProductCard;
