import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import axios from 'axios'
import Spline from '@splinetool/react-spline'
import { Card, Button } from '@mui/material'


/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  setTimeout(() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': '1'})), 1500);

  return (
    <div style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'center', 'backgroundColor':'#000000', height: '100vh'}}>
      <div style={{'height':500, 'width': 700, 'paddingTop': '1rem' }}>
          <Spline scene='https://prod.spline.design/vJgCWzKCOTteVe2X/scene.splinecode'/>
      </div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
            <Button size='large' variant='contained' style={{'display': 'flex','alignItems': 'center', 'backgroundColor': '#1DB954', 'border': 'none'}}><a href='/auth/spotify'>Login via Spotify</a></Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>      
      </div>
)}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with i nterfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)