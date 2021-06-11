import React from 'react';

import { Grid } from '@material-ui/core';

import Card from '../card';

const Favorites = ({ movies, handleRemoveFavorite }) =>
  <Grid
    container
    spacing={8}
  >
    {
      movies.map(movie =>
        <Grid
          item xs={12} sm={6} md={movies.length > 1 ? 4 : 12}
        >
          <Card
            movie={movie}
            handleRemoveFavorite={handleRemoveFavorite}
          />
        </Grid>
      )
    }
  </Grid>

export default Favorites
