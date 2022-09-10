import React from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import Spotify from './Spotify';
import { Typography } from '@mui/material';

/**
 * COMPONENT
 */
export const Home = () => {

  return (
    <div>
      <Spotify/>
    </div>
  )
}

export default connect()(Home)
