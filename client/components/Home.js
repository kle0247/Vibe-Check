import React from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import Spotify from './Spotify';
import { Typography } from '@mui/material';

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <Typography style={{'textTransform': 'uppercase'}} component={'h3'}>Welcome, {username}</Typography>
      <Spotify/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
