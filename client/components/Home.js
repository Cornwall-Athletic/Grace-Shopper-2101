import React from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';
import { Button } from '@material-ui/core';

const Home = () => {
  return (
    <div id="test">
      <div id="home">
        <h1 id="title-title">Welcome to the Global Snacker</h1>
        <Map id="map"></Map>
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Czh5f_nGC5M_EHN4KYNnLVIok4mHvkE&map_ids=4deaa8c67ed436b3&callback=initMap" /> */}
        <div className="homeButtons">
          <div id="mainButtons">
            <form action="/#/products">
              <Button
                id="quick-add"
                variant="contained"
                color="default"
                type="submit"
              >
                All Snacks
              </Button>
            </form>
          </div>
          <div id="homeLinks">
            <Link to="/login">Log In</Link>
            <Link to="/login">Not regesitered? Become a global snacker</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
