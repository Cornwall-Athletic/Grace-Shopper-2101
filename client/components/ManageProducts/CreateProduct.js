import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postProduct } from '../../store/products/products.js';
import {
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      brand: '',
      description: '',
      price: '',
      inventory: '',
      imageUrl: '',
      // location didn't work because location already references the current url
      countryId: '',
      categories: [],
    };
    this.originalState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    let { categories } = this.state;
    if (ev.target.name === 'categories') {
      categories = [...ev.target.selectedOptions].map((selected) => {
        return selected.value;
      });
    }
    change[ev.target.name] = ev.target.value;
    change.categories = categories;
    this.setState(change);
  }

  async onSave(ev) {
    const { create, history } = this.props;
    ev.preventDefault();
    try {
      const {
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
        categories,
      } = this.state;
      await create({
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
        categories,
      });

      this.setState(this.originalState);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
    } = this.state;
    const { onChange, onSave } = this;
    const { countries, categories } = this.props;

    return (
      <div>
        <h3>Add A Product:</h3>
        <form id="create-product-form">
          <TextField
            label="Title"
            required
            variant="outlined"
            name="title"
            value={title}
            onChange={onChange}
          />

          <TextField
            label="Brand"
            required
            variant="outlined"
            name="brand"
            value={brand}
            onChange={onChange}
          />

          <TextField
            label="Decription"
            required
            variant="outlined"
            name="description"
            value={description}
            onChange={onChange}
          />

          <TextField
            label="Price"
            required
            variant="outlined"
            name="price"
            value={price}
            type="number"
            min="0"
            onChange={onChange}
          />

          <TextField
            label="Inventory"
            required
            name="inventory"
            variant="outlined"
            value={inventory}
            type="number"
            min="1"
            onChange={onChange}
          />

          <TextField
            label="Image URL"
            required
            name="imageUrl"
            variant="outlined"
            value={imageUrl}
            onChange={onChange}
          />
          <br />
          <FormControl variant="outlined">
            <InputLabel id="select-country">Country</InputLabel>
            <Select
              labelId="select-country"
              id="select-manage-products"
              name="countryId"
              onChange={onChange}
            >
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          {/* <FormControl variant="outlined">
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              labelId="select-category"
              id="select-manage-products"
              name="categoryId"
              onChange={onChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl> */}

          <br />
          <Button
            variant="contained"
            id="quick-add"
            type="submit"
            onClick={onSave}
          >
            Create Product
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (newProduct) => {
      return dispatch(postProduct(newProduct, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
