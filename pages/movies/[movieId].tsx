import { Card, Stack, styled, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MovieInfoPage = () => {
  const router = useRouter()
  const { movieId } = router.query

  const [movies, setMovies] = useState<{
    id: number
    title: string
    genre_ids: Array<number>
    poster_path: string
  }>()

  useEffect(() => {
    if (movieId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        )
        .then((response) => {
          setMovies(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [movieId])

  console.log(movieId)

  if (!movies) return null

  return (
    <Wrapper>
      <Stack>
        <Typography variant="h5">{movies.title}</Typography>
        {movieId}
      </Stack>
    </Wrapper>
  )
}

export default MovieInfoPage

const Wrapper = styled(Card)`
  height: 500px;
`
