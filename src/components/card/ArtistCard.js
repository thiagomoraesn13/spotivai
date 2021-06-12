import React, { useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse, Paper, Button, Divider } from '@material-ui/core';

import { useStyles } from './Styles'

import { getHeaders, baseUrl } from '../../services/services'
import { defaultImage } from '../../models/DefaultImageCard'

import axios from 'axios'
import _ from 'lodash';

const ArtistCard = ({ info, open, handleClick, token }) => {
  const classes = useStyles();
  const [songs, setSongs] = useState([])
  const [hide, setHide] = useState(false)

  const fetchSong = async (type) => {
    try {
      const params = { limit: 3 }

      const { data } = await axios.get(`${baseUrl}/artists/${info.id}/albums`, {
        params,
        headers: getHeaders()
      })

      setHide(true)

      setSongs(data.items)
    }
    catch (error) {
      console.error(error)
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
              !!info.popularity &&
              <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                {`Popularidade: ${info.popularity}`}
              </Typography>
            }

            {
              !!info.genres &&
              <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                {`Generos: ${info.genres}`}
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
              : 'Listar Albuns'
          }
        </Button>

        {
          open && !_.isEmpty(songs) && hide &&
          <>
            {
              songs.map(song =>
                <>
                  <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                    {`Album: ${song.name}`}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" component="p" align='justify'>
                    {`Data de Lançamento: ${song.release_date}`}
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

export default ArtistCard