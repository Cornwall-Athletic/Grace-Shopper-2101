import React from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Slider,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  };
});

const Filters = (props) => {
  const classes = useStyles();
  const {
    countries,
    categories,
    filterByPrice,
    filterByCategory,
    filterByCountry,
    sortByInput,
    reset,
    name,
    filterByValue,
  } = props;

  function handleChange(e) {
    const input = e.target.value;
    filterByValue(input);
  }

  return (
    <div id="filter">
      <form onSubmit={reset}>
        <Grid
          direction="row"
          justify="flex-start"
          alignItems="baseline"
          container
        >
          <FormControl className={classes.formControl}>
            <InputLabel id="countries">Countries</InputLabel>
            <Select
              labelId="countries"
              id="countries"
              label="All Countries"
              value={name}
              onChange={filterByCountry}
            >
              {/* <MenuItem value="all">All</MenuItem> */}
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.name}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              labelId="categories-label"
              id="categories"
              defaultValue="ALL"
              name="categories"
              onChange={filterByCategory}
            >
              {/* <MenuItem value="ALL">All</MenuItem> */}
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField type="text" placeholder="search" onChange={(e) => { handleChange(e); }} />
          <FormControl className={classes.formControl}>
            <InputLabel id="sort-by-label" htmlFor="sorting">
              Sort By:
              {' '}
            </InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              defaultValue="sort"
              name="sorting"
              onChange={sortByInput}
            >
              <option value="default">--Sort--</option>
              <option value="alpha_asc">A-Z</option>
              <option value="alpha_des">Z-A</option>
              <option value="price_asc">Low-High</option>
              <option value="price_des">High-Low</option>
            </Select>
          </FormControl>
          <label htmlFor="price"> Max Price</label>
          <input
            id="slider"
            type="range"
            name="price"
            min="0"
            max="45"
            onChange={filterByPrice}
            defaultValue="45"
          />

          <Button
            id="quick-add"
            variant="contained"
            color="default"
            type="submit"
          >
            Reset
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Filters;
