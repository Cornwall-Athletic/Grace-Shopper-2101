import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteCountry,
  updateCountry,
  loadCountries,
} from '../../store/countries';

class EditCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.country.id ? this.props.country.name : '',
      flag: this.props.country.id ? this.props.country.flag : '',
      latitude: this.props.country.id ? this.props.country.latitude : '',
      longitude: this.props.country.id ? this.props.country.longitude : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.loadCountries();

    if (!this.props.country.id) {
      this.setState({
        name: this.props.country.id ? this.props.country.name : '',
        flag: this.props.country.id ? this.props.country.flag : '',
        latitude: this.props.country.id ? this.props.country.latitude : '',
        longitude: this.props.country.id ? this.props.country.longitude : '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.country.id && this.props.country.id) {
      this.setState({
        name: this.props.country.name,
        flag: this.props.country.flag,
        latitude: this.props.country.latitude,
        longitude: this.props.country.longitude,
      });
    }
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSave(ev) {
    const { history, update } = this.props;
    ev.preventDefault();
    const { id } = this.props.match.params;
    try {
      const { name, flag, latitude, longitude } = this.state;
      update({
        id,
        name,
        flag,
        latitude,
        longitude,
      });
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { name, flag, latitude, longitude } = this.state;
    const { onChange, onSave } = this;
    const { countries, deleteCountry } = this.props;
    const { id } = this.props.match.params;

    return (
      <div id="edit-country">
        <h3>Edit Country:</h3>

        <form onSubmit={onSave}>
          <label htmlFor="name">Name*:</label>
          <input name="name" value={name} onChange={onChange} />
          <br />

          <label htmlFor="flag">Flag*:</label>
          <input name="flag" value={flag} onChange={onChange} />
          <br />

          <label htmlFor="latitude">Latitude*:</label>
          <input
            name="latitude"
            type="number"
            value={latitude}
            onChange={onChange}
          />
          <br />

          <label htmlFor="longitude">Longitude:*</label>
          <input
            name="longitude"
            type="number"
            value={longitude}
            onChange={onChange}
          />
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
          <button type="submit">Submit Changes</button>
        </form>

        <button
          type="submit"
          onClick={() => {
            deleteCountry(id);
          }}
        >
          Delete Country
        </button>

        <button
          type="submit"
          onClick={() => {
            return this.props.history.push('/manage-countries');
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
    update: (updatedCountry) => {
      return dispatch(updateCountry(updatedCountry, history));
    },
    loadCountries: () => {
      return dispatch(loadCountries());
    },
    deleteCountry: (countryId) => {
      return dispatch(deleteCountry(countryId, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCountry);
