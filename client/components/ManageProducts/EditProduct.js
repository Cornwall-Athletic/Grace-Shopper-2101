import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteProduct, updateProduct } from '../../store/products/products.js';
import { loadCountries } from '../../store/countries';
import { loadCategories } from '../../store/categories';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      title: '',
      brand: '',
      description: '',
      price: 0,
      inventory: 0,
      imageUrl: '',
      countryId: 0,
      categories: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getCurrProduct = this.getCurrProduct.bind(this);
  }

  componentDidMount() {
    this.getCurrProduct();
    this.props.loadCountries();
    this.props.loadCategories();
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
    const { history, update } = this.props;
    ev.preventDefault();
    const { id } = this.props.match.params;
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
      update({
        id,
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        countryId,
        categories,
      });
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  async getCurrProduct() {
    const { id } = this.props.match.params;
    const currProduct = (await axios.get(`/api/products/${id}`)).data;
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
    } = currProduct;

    let { categories } = currProduct;
    categories = categories.map((category) => {
      return category.id;
    });
    this.setState({
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
      categories,
    });
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
      categories,
    } = this.state;
    const { onChange, onSave } = this;
    const { countries, deleteProduct } = this.props;
    const { id } = this.props.match.params;
    const allCategories = this.props.categories;

    return (
      <div id="edit-product">
        <h3>Edit Product:</h3>
        <img src={imageUrl} alt="snack" width="100" />
        <form onSubmit={onSave}>
          <label htmlFor="title">Title*:</label>
          <br />
          <input name="title" value={title} onChange={onChange} />
          <br />

          <label htmlFor="brand">Brand*:</label>
          <br />
          <input name="brand" value={brand} onChange={onChange} />
          <br />

          <label htmlFor="description">Description*:</label>
          <br />
          <input name="description" value={description} onChange={onChange} />
          <br />

          <label htmlFor="price">Price:*</label>
          <br />
          <input
            name="price"
            type="number"
            value={price}
            step=".10"
            onChange={onChange}
          />
          <br />

          <label htmlFor="inventory">Inventory*:</label>
          <br />
          <input
            name="inventory"
            value={inventory}
            type="number"
            onChange={onChange}
          />
          <br />

          <label htmlFor="imageUrl">Image Url*:</label>
          <br />
          <input name="imageUrl" value={imageUrl} onChange={onChange} />
          <br />

          <label htmlFor="countryId">Country*:</label>
          <br />
          <select value={countryId} name="countryId" onChange={onChange}>
            {countries.map((country) => {
              return (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <br />

          <label htmlFor="categories">Categories*:</label>
          <br />
          <select
            value={categories}
            name="categories"
            onChange={onChange}
            multiple
          >
            {allCategories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <br />
          <button id="edit-prod-btn" type="submit">
            Submit Changes
          </button>
        </form>

        <button
          type="submit"
          onClick={() => {
            deleteProduct(id);
          }}
        >
          Delete Product
        </button>

        <button
          type="submit"
          onClick={() => {
            return this.props.history.push('/manage-products');
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (updatedProduct) => {
      return dispatch(updateProduct(updatedProduct, history));
    },
    loadCountries: () => {
      return dispatch(loadCountries());
    },
    deleteProduct: (productId) => {
      return dispatch(deleteProduct(productId, history));
    },
    loadCategories: () => {
      return dispatch(loadCategories());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
