import axios from 'axios';
//delete country
//edit country
//create country

const LOAD_COUNTRIES = 'LOAD_COUNTRIES ';
const POST_COUNTRY = 'POST_COUNTRY';
const DELETE_COUNTRY = 'DELETE_COUNTRY';
const UPDATE_COUNTRY = 'UPDATE_COUNTRY';

const countriesReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_COUNTRIES: {
      return [...action.countries];
    }
    case POST_COUNTRY: {
      return [ ...state, action.country ];
    }
    case DELETE_COUNTRY: {
      return state.filter((countries) => { return countries.id !== action.id; });
    }

    case UPDATE_COUNTRY: {
      const countries = state.countries.map((country) => {
        return country.id === action.country.id ? action.country : country;
      });
      return { ...state, countries };
    }
    default: {
      return state;
    }
  }
};

const loadAllCountries = (countries) => {
  return { type: LOAD_COUNTRIES, countries };
};

const loadCountries = () => {
  return async (dispatch) => {
    try {
      const countries = (await axios.get('/api/countries')).data;

      dispatch(loadAllCountries(countries));
    } catch (err) {
      console.log(err);
    }
  };
};

const postingCountry = (country) => {
  return { type: POST_COUNTRY, country };
};

const postCountry = (newCountry) => {
  return async (dispatch) => {
    const country = (await axios.post('/api/countries', newCountry)).data;
    dispatch(postingCountry(country));
  };
};

const deletingCountry = (id) => {
  return { type: DELETE_COUNTRY, id };
};

const deleteCountry = (id, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/countries/${id}`);
    dispatch(deletingCountry(id));
  };
};
const updatingCountry = (country) => {
  return { type: UPDATE_COUNTRY, country };
};

const updateCountry = (updatedCountry, history) => {
  return async (dispatch) => {
    const country = (
      await axios.put(`/api/countries/${updatedCountry.id}`, updatedCountry)
    ).data;
    dispatch(updatingCountry(country));
    history.push('/manage-countries');
  };
};

export { loadCountries, updateCountry, deleteCountry, postCountry };
export default countriesReducer;
