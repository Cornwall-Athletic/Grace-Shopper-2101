/*eslint-disable*/

import React from 'react';
import axios from 'axios';

import {
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

class NewReview extends React.Component {
  constructor({ productId, userId, updateReviews, checkIfReviewed, reviews }) {
    super();
    this.state = {
      text: '',
      rating: 1,
      userId,
      productId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateReviews = updateReviews;
    checkIfReviewed(userId, reviews);
  }

  async handleSubmit(ev) {
    const form = ev.target;
    ev.preventDefault();
    const newReview = { ...this.state };
    await axios.post('/api/reviews', newReview);
    this.updateReviews();
    form.reset();
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  render() {
    return (
      <div className="form">
        <h4>Add A Review</h4>
        <form className="newReview" onSubmit={this.handleSubmit}>
          <FormControl variant="outlined">
            <InputLabel>Stars</InputLabel>
            <Select
              labelId="rating-input"
              id="select-rating"
              name="rating"
              type="number"
              onChange={this.handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            id="review-text"
            variant="outlined"
            name="text"
            type="text"
            placeholder="Your Review Here"
            onChange={this.handleChange}
          ></TextField>

          <label htmlFor="rating"></label>
          {/* <input
            name="rating"
            type="number"
            placeholder="Rating"
            min="1"
            max="5"
            defaultValue="1"
            onChange={this.handleChange}
          /> */}

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default NewReview;
