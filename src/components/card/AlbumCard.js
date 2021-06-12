import React, { useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse, Paper, Button, Divider } from '@material-ui/core';

import { millisToMinutesAndSeconds } from '../../utils/millisToMinutesAndSeconds'

import { useStyles } from './Styles'

import { baseUrl, getHeaders } from '../../services/services'
import { defaultImage } from '../../models/DefaultImageCard'

import axios from 'axios'
import _ from 'lodash';

const AlbumCard = ({ info, open, handleClick, token }) => {
  const classes = useStyles();
  const [songs, setSongs] = useState([])
  const [hide, setHide] = useState(false)

  const fetchSong = async (type) => {
    if (_.isEmpty(songs)) {
      try {
        const params = { limit: 4 }

        const { data } = await axios.get(`${baseUrl}/albums/${info.id}/tracks`, {
          params,
          headers: getHeaders()
        })

        setHide(true)

        setSongs(data.items)
      }
      catch (error) {
        console.error(error)
      }
    } else {
      setHide(true)
    }
  }

  return (
    <Collapse in={open} collapsedHeight='250px'>
      <Paper
        elevation={4}
        className={open ? classes.Card_collapse : classes.Card_not_collapse}
      >
        <CardActionArea
          onClick={handleClick}
        >
          <CardMedia
            className={classes.media}
            image={!_.isEmpty(info.images) ? info.images[0].url : defaultImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2" >
              {`${info.type}: ${info.name}`}
            </Typography>

            {
              !!info.release_date &&
              <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                {`Data de Lançamento: ${info.release_date}`}
              </Typography>
            }
          </CardContent>
        </CardActionArea>

        <Button
          variant={!hide ? 'contained' : 'outlined'}
          color='primary'
          onClick={() => !hide ? fetchSong() : setHide(!hide)}
        >
          {
            hide
              ? 'Ocultar Lista'
              : 'Listar Músicas'
          }
        </Button>

        {
          open && !_.isEmpty(songs) && hide &&
          <>
            {
              songs.map(song =>
                <>
                  <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                    {`Música: ${song.name}`}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                    {`Temporada de Duração: ${millisToMinutesAndSeconds(song.duration_ms)}`}
                  </Typography>

                  <Divider className={classes.Divider} />
                </>
              )
            }
          </>
        }
      </Paper>
    </Collapse >
  );
}

export default AlbumCard