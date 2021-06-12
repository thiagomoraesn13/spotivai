import React, { useState, useEffect } from 'react';

import axios from 'axios'
import _ from 'lodash'

import './App.css';

import Search from './components/search'
import Errors from './components/errors'
import { Content, Wrapper, Title, WrapperSuggestion } from './components/wrappers/components'
import CustomTabs from './components/customTabs';

import { deserializeArtist, deserializeAlbum, deserializeTrack } from './models/Deserialize'

import {
  Grid,
  CircularProgress
} from '@material-ui/core'

import ArtistCard from './components/card/ArtistCard'
import AlbumCard from './components/card/AlbumCard';
import TrackCard from './components/card/TrackCard';

import { getToken, getHeaders, baseUrl } from './services/services'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [tab, setTab] = useState(0)
  const [infos, setInfos] = useState([])
  const [action, setAction] = useState('')
  const [openCards, setOpenCards] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInfo = async (type) => {
    setAction(type)

    try {
      const params = {
        q: inputValue,
        type,
        limit: 5
      }
      setLoading(true)

      const { data } = await axios.get(`${baseUrl}/search`, {
        params,
        headers: getHeaders()
      })

      let newData = []

      if (type === 'album') {
        newData = deserializeAlbum(data.albums.items)

        setOpenCards(newData.map(open => !!open.cards))
      }

      if (type === 'artist') {
        newData = deserializeArtist(data.artists.items)

        setOpenCards(newData.map(open => !!open.cards))
      }

      if (type === 'track') {
        newData = deserializeTrack(data.tracks.items)
      }

      setInfos(newData)
    }
    catch (error) {
      console.error(error)
    }

    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }

  useEffect(() => {
    getToken()
  }, []);

  const handleAddFavorite = (selectedTrack) => {
    const newInfos = infos.map(info => {
      if (info.id === selectedTrack.id) {
        return {
          ...info,
          favorite: true
        }
      }
      return info
    })
    setInfos(newInfos)
  }

  const handleRemoveFavorite = (selectedTrack) => {
    const newInfos = infos.map(info => {
      if (info.id === selectedTrack.id) {
        return {
          ...info,
          favorite: false
        }
      }
      return info
    })

    setInfos(newInfos)
  }

  const handleChangeCard = (index) => {
    const newOpenCards = [...openCards]
    newOpenCards[index] = !openCards[index]

    setOpenCards(newOpenCards)
  }

  const favoriteSong = infos.filter(song => song.favorite)

  return (
    <Wrapper>
      <Title gutterBottom variant="h4" component="h2" >
        SPOTIVAI
      </Title>

      <CustomTabs
        currentTab={tab}
        setTab={setTab}
      />
      {
        tab === 0 &&
        <>
          <Search
            inputValue={inputValue}
            setInputValue={setInputValue}
            fetchInfo={fetchInfo}
            setAction={setAction}
            action={action}
          />
          {
            loading
              ? <CircularProgress size={80} color='success' />
              : <Content>
                {
                  !_.isEmpty(infos) && action === 'artist' &&
                  <Grid container spacing={8}
                  >
                    {
                      infos.map((info, index) =>
                        <Grid
                          item xs={12} sm={12} md={infos.length === 1 ? 12 : 6}
                        >
                          <WrapperSuggestion>
                            <ArtistCard
                              info={info}
                              open={openCards[index]}
                              handleClick={() => handleChangeCard(index)}
                              index={index}
                            />
                          </WrapperSuggestion>
                        </Grid>
                      )
                    }
                  </Grid>
                }

                {
                  action === 'album' && !_.isEmpty(infos) &&
                  <Grid container spacing={8}>
                    {
                      infos.map((info, index) =>
                        <Grid
                          item xs={12} sm={12} md={infos.length === 1 ? 12 : 6}
                        >
                          <WrapperSuggestion>
                            <AlbumCard
                              info={info}
                              open={openCards[index]}
                              handleClick={() => handleChangeCard(index)}
                              index={index}
                            />
                          </WrapperSuggestion>
                        </Grid>
                      )
                    }
                  </Grid>
                }

                {
                  action === 'track' && !_.isEmpty(infos) &&
                  <Grid container spacing={8}>
                    {
                      infos.map(info =>
                        <Grid
                          item xs={12} sm={12} md={infos.length === 1 ? 12 : 6}
                        >
                          <WrapperSuggestion>
                            <TrackCard
                              info={info}
                              isFavorite={!!info.favorite}
                              handleAddFavorite={handleAddFavorite}
                              handleRemoveFavorite={handleRemoveFavorite}
                            />
                          </WrapperSuggestion>
                        </Grid>
                      )
                    }
                  </Grid>
                }
              </Content>
          }
        </>
      }

      {
        tab === 1 &&
        <Content>
          {
            !_.isEmpty(favoriteSong)
              ?
              <Grid container spacing={8} >
                {
                  favoriteSong.filter(song => song.favorite).map(song =>
                    <Grid
                      item xs={12} sm={12} md={favoriteSong.length === 1 ? 12 : 6}
                    >
                      <WrapperSuggestion>
                        <TrackCard
                          info={song}
                          handleAddFavorite={handleAddFavorite}
                          handleRemoveFavorite={handleRemoveFavorite}
                          isFavorite={!!song.favorite}
                        />
                      </WrapperSuggestion>
                    </Grid>
                  )
                }
              </Grid>
              : (
                <Errors
                  info={
                    'Nenhum música adicionada como favorita. Clique na aba Buscar e Selecione a opção música'
                  }
                />

              )
          }
        </Content>
      }
    </Wrapper >
  );
}

export default App;
