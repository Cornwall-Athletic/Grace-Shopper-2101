import React from 'react';

const SinglePurchase = ({ purchase }) => {
  const { purchased_items } = purchase;
  let total = 0;
  return (
    <div className="singlePurchase">
      <h3>Ordered on {purchase.date_of_purchase}</h3>
      <ul>
        {purchased_items.map((item) => {
          total += parseFloat(item.price);
          return (
            <li key={item.id}>
              {item.title}, Amount: {item.amount}, Price: {item.price}
            </li>
          );
        })}
      </ul>
      Total: {total.toFixed(2)}
    </div>
  );
};

export default SinglePurchase;
