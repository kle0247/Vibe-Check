import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Button } from '@mui/material'


const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Button><Link to="/home">Home</Link></Button>
          <Button>
            <a href="#" onClick={handleClick}>
            Logout
            </a>
          </Button>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Button><Link to="/login">Login</Link></Button>
          <Button><Link to="/signup">Sign Up</Link></Button>
          <img src='/public/logo.png'/>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
