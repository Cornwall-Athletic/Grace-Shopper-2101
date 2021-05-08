import React from 'react';
import timeAgo from 'node-time-ago';
import {
  Button,
  TextField,
  Select,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const Reviews = ({ reviews }) => {
  return (
    <div>
      {reviews.length ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id} className="review;">
                <div>
                  Rating:
                  {review.rating}
                  <br />
                  User:
                  {` ${review.user.firstName} ${review.user.lastName}`}
                  <br />
                  When:
                  {timeAgo(review.createdAt)}
                  <br />"{review.text}"
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No Reviews</div>
      )}
    </div>
  );
};

export default Reviews;
