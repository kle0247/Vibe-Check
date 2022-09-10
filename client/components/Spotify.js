import React from "react";
import { connect } from "react-redux";
import Player from "./SpotifyPlayer";
import { fetchTracks, fetchTopTracks } from "../store/tracks";
// import { fetchTopTracks } from '../store/topTracks';
import { analyzeTrack, resetTrack } from "../store/track";
import { analyzeAllTracks } from "../store/analyzeTracks";
import Bar from "./Nivo";
import Radar from "./Radar";
import Search from "./Search";
import {
  Container,
  Box,
  Card,
  Button,
  List, 
  ListItem,
  Typography,
} from "@mui/material";
import Canvas from "./Canvas";

class Spotify extends React.Component {
  constructor() {
    super();
    this.state = {
      playingTrack: "",
      tracksList: "",
      trackName: "",
    };
    this.getTracks = this.getTracks.bind(this);
    this.getTopTracks = this.getTopTracks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getTracks() {
    await this.props.getTracks();
    await this.analyzeAllTracks();
    this.props.resetTrack();
  }
  async handleClick(ev) {
    this.setState({ playingTrack: ev.target.value });
    const playingTrack = ev.target.value;

    // get id from URI
    const id = playingTrack.slice(14);
    await this.props.analyzeTrack(id);
  }
  async getTopTracks() {
    await this.props.getTopTracks();
    await this.analyzeAllTracks();
    this.props.resetTrack();
  }
  async analyzeAllTracks(props) {
    //get list of ids
    const tracksList = this.props.tracks
      .map((track) => `${track.id}`)
      .join(",");
    await this.props.analyzeAllTracks(tracksList);
  }
  render() {
    const { getTracks, getTopTracks, handleClick, canvasRef } = this;
    const { playingTrack } = this.state;
    const { tracks, track, analyzedTracks } = this.props;
    const access_token = window.localStorage.getItem("access_token");

    return (
      <div >
        <Box style={{width: '100vw'}}>
            <Search />
          <Box>
          <Button onClick={getTracks}>Recent Tracks</Button>
          <Button onClick={getTopTracks}>Top Tracks</Button>
          </Box>
        </Box>
        <div id="container">
          {tracks && (
            <div>
              {
                <List disablePadding sx={{ width: '100%', maxWidth: 360, height: '78vh', overflowX: 'auto', bgcolor: 'background.paper' }}>
                  {tracks.map((track) => {
                    return (
                      <ListItem key={track.id} onClick={handleClick}>
                        <Button
                          style={{ display:'flex', justifyContent:'flex-start', textAlign: "start", width: 400 }}
                          variant="text"
                          key={track.uri}
                          value={track.uri}
                        >
                          <img
                            src={track.album.images[2].url}
                            style={{ paddingRight: "1rem" }}
                          />
                          {track.name} <br /> {track.artists[0].name}
                        </Button>
                      </ListItem>
                    );
                  })}
                </List>
              }
            </div>
          )}
          <Box style={{ display: "flex" }}>
            {!tracks.length ? null : (
              <Card
                variant="outlined"
                style={{
                  height: 550,
                  width: 500,
                  margin: "1rem",
                  paddingTop: "1rem",
                }}
              >
                <Bar tracksFeatures={analyzedTracks} />
              </Card>
            )}

            {!track.length || !tracks.length ? null : (
              <Card
                variant="outlined"
                style={{
                  height: 550,
                  width: 500,
                  margin: "1rem",
                  textAlign: "center",
                  paddingTop: "1rem"
                }}
              >
                <Typography>
                  {tracks.find((_track) => _track.id === track[0].id)
                    ? tracks.find((_track) => _track.id === track[0].id).name
                    : null}
                </Typography>

                <Radar trackFeatures={track} />
              </Card>
            )}
          </Box>

          {/* <Canvas tempo={fps} canvasRef={ canvasRef }/> */}
        </div>
        <Box style={{position: 'fixed', bottom: 0, width: '100vw'}}>
            <Player access_token={access_token} trackURI={playingTrack} />
        </Box>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    tracks: state.tracks,
    track: state.track,
    analyzedTracks: state.analyzedTracks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTracks: () => dispatch(fetchTracks()),
    getTopTracks: () => dispatch(fetchTopTracks()),
    analyzeTrack: (id) => dispatch(analyzeTrack(id)),
    analyzeAllTracks: (tracks) => dispatch(analyzeAllTracks(tracks)),
    resetTrack: () => dispatch(resetTrack())
  };
};

export default connect(mapState, mapDispatch)(Spotify);
