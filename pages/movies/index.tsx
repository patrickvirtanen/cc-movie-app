import styled from '@emotion/styled'
import { Autocomplete, Box, Card, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const [data, setData] = useState<MovieProps[]>()
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
      )
      .then((response) => {
        setData(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (!data)
    return (
      <Stack>
        <Typography variant="h2" color={'white'}>
          Could not find any movies :(
        </Typography>
      </Stack>
    )

  console.log(data)

  return (
    <Stack>
      <Autocomplete
        options={data}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
        renderOption={(props, option) => {
          return (
            <Link href={`/movies/${option.id}`}>
              <Box
                component="li"
                sx={{
                  background: '#151d2e',
                  color: 'white',
                  textDecoration: 'none',

                  '& > img': {
                    mr: 2,
                    flexShrink: 0,
                  },
                }}
                {...props}
              >
                <Box
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    loading="lazy"
                    width="50"
                    alt={option.title}
                    src={`https://image.tmdb.org/t/p/w500${option.poster_path}`}
                  />
                  <Typography fontSize={16}>{option.title}</Typography>
                </Box>
              </Box>
            </Link>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search movie"
            InputProps={{
              ...params.InputProps,
              type: 'search',
              style: { color: 'white' },
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
