import React, { createContext, useContext, useState } from 'react'

export const MovieContext = createContext()

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState([])

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {props.children}
    </MovieContext.Provider>
  )
}
