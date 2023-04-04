import { Html, Head, Main, NextScript } from 'next/document'
import { Component } from 'react'
import { Routes, Route } from 'react-router'
import Movies from './movies'
import MovieInfoPage from './movies/[movieId]'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
