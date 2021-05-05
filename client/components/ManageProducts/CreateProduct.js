import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postProduct } from '../../store/products/products.js';

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
      //location didn't work because location already references the current url
      reqCountry: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
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
        reqCountry,
      } = this.state;
      // const newProduct = {
      //   title,
      //   brand,
      //   description,
      //   price,
      //   inventory,
      //   imageUrl,
      //   reqCountry,
      // };
      await create({
        title,
        brand,
        description,
        price,
        inventory,
        imageUrl,
        reqCountry,
      });
      history.push('/manage-products');
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
      reqCountry,
    } = this.state;
    const { onChange, onSave } = this;

    return (
      <div id="create-product">
        <h3>Add A Product:</h3>
        <form onSubmit={onSave}>
          <label>Title*:</label>
          <input name="title" value={title} onChange={onChange} />
          <br />
          <label>Brand*:</label>
          <input name="brand" value={brand} onChange={onChange} />
          <br />
          <label>Description*:</label>
          <input name="description" value={description} onChange={onChange} />
          <br />
          <label>Price:*</label>
          <input name="price" value={price} type="number" onChange={onChange} />
          <br />
          <label>Inventory*:</label>
          <input
            name="inventory"
            value={inventory}
            type="number"
            onChange={onChange}
          />
          <br />
          <label>Image Url*:</label>
          <input name="imageUrl" value={imageUrl} onChange={onChange} />
          <br />
          <label>Country*:</label>
          <input name="reqCountry" value={reqCountry} onChange={onChange} />
          <br />
          <button>Create Product</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (newProduct) => dispatch(postProduct(newProduct, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateProduct);