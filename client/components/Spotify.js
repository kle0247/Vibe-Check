import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Player from './SpotifyPlayer';
import { fetchTracks } from '../store/tracks';
import { analyzeTrack } from '../store/track';
import Canvas from './Canvas';


class Spotify extends React.Component{
    constructor(){
        super()
        this.state = {
            playingTrack: '',
            externalUrl: ''
        }
        this.getTracks = this.getTracks.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.analyzeTrack = this.analyzeTrack.bind(this)
        this.canvasRef = React.createRef()
    };
    
    async getTracks(){
        await this.props.getTracks()
    };
    handleClick(ev){
        this.setState({ playingTrack: ev.target.value })
    };

    async analyzeTrack(ev){
        const id = ev.target.value 
        await this.props.analyzeTrack(id)
    }

    render(){
        const { getTracks, handleClick, analyzeTrack} = this;
        const { playingTrack } = this.state
        const { tracks } = this.props;
        const access_token = window.localStorage.getItem('access_token');


        return(
            <div>
                <Player access_token={access_token} trackURI = { playingTrack  }  />
                <button onClick={ getTracks }>Recent Tracks</button>
                {
                    tracks.map( track => {
                        return(
                            <div key={track.id}>
                                <button key={track.track.uri} onClick={handleClick} value={track.track.uri} >{ track.track.name }</button>
                                <button key={track.track.id} onClick={analyzeTrack} value={track.track.id}>Analyze</button>
                            </div>
                        )
                    })
                }
                <Canvas canvasRef={this.canvasRef}/>
            </div>
        )
    }
};

const mapState = ( state ) => {
    return{
        tracks: state.tracks,
        track: state.track
    }
};

const mapDispatch = (dispatch) => {
    return {
        getTracks: () => dispatch(fetchTracks()),
        analyzeTrack: (id) => dispatch(analyzeTrack(id))
    }
};

export default connect(mapState, mapDispatch)(Spotify);