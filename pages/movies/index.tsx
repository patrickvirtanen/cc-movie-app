import styled from '@emotion/styled'
import { Autocomplete, Box, Card, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'

import { useEffect, useState } from 'react'

const Movies = () => {
  return (
    <div>
      <MoviesList />
    </div>
  )
}

type MovieProps = {
  id: number
  title: string
  genre_ids: Array<number>
  poster_path: string
  overview: string
  backdrop_path: string
}

const MoviesList = () => {
  const [data, setData] = useState<MovieProps[]>()
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
      )
      .then((response) => {
        setData(response.data.results)
      })
  }, [])

  if (!data) return null

  console.log(data)

  return (
    <Stack>
      <Autocomplete
        sx={{ color: 'white' }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((movie) => movie.title)}
        // renderOption={renderOption}
        // getOptionLabel={(option) => option.toString()}
        renderInput={(params) => (
          <TextField
            sx={{ color: 'white' }}
            {...params}
            label="hmmm?"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <Stack gap={4} direction={'row'} flexWrap={'wrap'}>
        {data?.map((d) => (
          <Link href={`/movies/${d.id}`} key={d.id} style={{ textDecoration: 'none' }}>
            <StyledCard>
              <StyledMovieCard backdrop_path={d.backdrop_path} />

              <Typography fontSize={16} sx={{ mt: 2 }}>
                {d.title}
              </Typography>
            </StyledCard>
          </Link>
        ))}
      </Stack>
    </Stack>
  )
}

const renderOption = (option: any, { selected }: any) => {
  return (
    <Box display="flex" alignItems="center">
      <Link href={`/movies/${option.id}`}>
        <Typography variant="body1">{option.title}</Typography>
      </Link>
    </Box>
  )
}

const StyledCard = styled(Card)`
  height: 250px;
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: #10141f;
  color: white;
  font-weight: bold;
  text-decoration: none;
  box-shadow: none;
`

const StyledMovieCard = styled(Card)<{ backdrop_path: string }>`
  height: 300px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(https://image.tmdb.org/t/p/w500${(props) => props.backdrop_path});
  background-size: cover;
  background-repeat: no-repeat;
`

export default Movies
