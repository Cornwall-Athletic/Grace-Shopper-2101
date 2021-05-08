import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCountries } from '../../store/countries';
import CreateCountry from './CrearteCountry';

class ManageCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.props.loadCountries();
  }

  render() {
    const { countries } = this.props;

    return (
      <div>
        <h2>Manage Countries</h2>
        <CreateCountry />
        <div id="manage-countries">
          <h3>Country List</h3>
          {countries.map((country, idx) => {
            const { name, flag, latitude, longitude } = country;

            return (
              <div key={idx} className="country-manage">
                <ul id="country-manage">
                  <li>Name: {name}</li>
                  <li>Flag: {flag}</li>
                  <li>Latitude: {latitude}</li>
                  <li>Longitude: {longitude}</li>
                </ul>
                <Link to={`/manage-countries/${country.id}`}>Edit</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadCountries: () => dispatch(loadCountries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCountries);
