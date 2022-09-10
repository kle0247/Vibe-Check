import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Box, Button, Typography } from "@mui/material";

const Navbar = ({ handleClick, isLoggedIn, username }) => {
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ backgroundColor: "#000000" }}
          >
            <Typography variant='h5' style={{ color: "#ffffff", marginLeft: '1.5rem' }}>
                VIBE CHECK
              </Typography>
            <Box display="flex" alignItems="center">
              <Typography style={{ color: "#1DB954" }}>
                {username.toUpperCase()}
              </Typography>
              <Button>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </Button>
            </Box>
          </Box>
        ) : null}
      </nav>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
