/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postCountry, loadCountries, deleteCountry } from '../../store/countries';

class CreateCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      flag: '',
      latitude: '',
      longitude: '',
      err: '',
    };
    this.originalState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.load();
  }

  onChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  async onSave(ev) {
    const { create, history } = this.props;
    ev.preventDefault();
    try {
      const {
        name, flag, latitude, longitude,
      } = this.state;
      await create({
        name, flag, latitude, longitude,
      });
      this.setState(this.originalState);
      // this.props.postCountry(
      //   this.state.name,
      //   this.state.flag,
      //   this.state.latitude,
      //   this.state.longitude
      // );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      name, flag, latitude, longitude,
    } = this.state;
    const { onChange, onSave } = this;
    return (
      <div id="create-country">
        <h3>Add A Country:</h3>
        <form onSubmit={onSave} action="/">
          <label htmlFor="title">Name*:</label>
          <input name="name" value={name} onChange={onChange} />
          <br />
          <label htmlFor="flag">Flag:</label>
          <input name="flag" value={flag} onChange={onChange} />
          <br />
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={latitude}
            onChange={onChange}
          />
          <br />
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={longitude}
            onChange={onChange}
          />
          <br />
          <button onClick={onSave}>Save</button>
          <button>
            <Link to="/">Cancel</Link>
          </button>
        </form>
        <div id="country list">
          <ul key="key">
            {this.props.countries.map((e) => {
              return (
                <div>
                  <ul key={`${e.id}`}>
                    <li id="name">
                      {e.name}
                      <i className={`em ${e.flag}`} />
                    </li>
                    <li id="latitude">
                      Latitude:
                      {' '}
                      {e.latitude}
                      , Longitude:
                      {' '}
                      {e.longitude}
                    </li>
                    <button onClick={() => { this.props.delete(e.id); }}>Delete</button>
                    <br />
                    <br />
                  </ul>
                </div>
              );
            })}
          </ul>

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ countries }) => {
  return { countries };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (newCountry) => {
      return dispatch(postCountry(newCountry, history));
    },
    load: () => {
      return dispatch(loadCountries());
    },
    delete: (id) => {
      return dispatch(deleteCountry(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCountry);