import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';

import { millisToMinutesAndSeconds } from '../../utils/millisToMinutesAndSeconds'
import { defaultImage } from '../../models/DefaultImageCard'

import { useStyles } from './Styles'
import _ from 'lodash';

const TrackCard = ({ info, isFavorite, handleRemoveFavorite, handleAddFavorite }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={4}
      className={classes.Card_collapse}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={!_.isEmpty(info.album.images) ? info.album.images[0].url : defaultImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" >
            {`Música: ${info.name}`}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" align='justify'>
            {`Artista: ${info.artists[0].name}`}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" align='justify'>
            {`Duração: ${millisToMinutesAndSeconds(info.duration_ms)}`}
          </Typography>

          <Button
            variant='contained'
            color='primary'
            onClick={() => isFavorite ? handleRemoveFavorite(info) : handleAddFavorite(info)}
          >
            {
              isFavorite
                ? 'Remover das Favoritas'
                : 'Favoritar Música'
            }
          </Button>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default TrackCard