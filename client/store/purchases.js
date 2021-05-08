import axios from 'axios';

const LOAD_PURCHASES = 'LOAD_PURCHASES';

const _loadPurchases = (purchases) => {
  return {
    type: LOAD_PURCHASES,
    purchases,
  };
};

export const loadPurchases = (id) => {
  return async (dispatch) => {
    try {
      const purchases = (await axios.get(`/api/order/purchases/${id}`)).data;
      dispatch(_loadPurchases(purchases));
    } catch (error) {
      console.log(error);
    }
  };
};

const purchaseReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PURCHASES: {
      const purch = action.purchases;
      return purch;
    }
    default: {
      return state;
    }
  }
};

export default purchaseReducer;
