export const deserializeArtist = (artists) => artists.map(artist => ({
  ...artist,
  type: 'Artista',
  genres: artist.genres
    .map(_artist => _artist)
    .toString()
    .replace(/,/g, ', '),
}))

export const deserializeAlbum = (albums) => albums.map(album => ({
  ...album,
  type: 'Album',
  artist_names: album.artists
    .map(_album => _album.name)
    .toString()
    .replace(/,/g, ', '),
}))


export const deserializeTrack = (tracks) => tracks.map(track => ({
  ...track,
  type: 'Track'
}))
