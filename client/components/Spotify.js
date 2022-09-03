import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Player from './SpotifyPlayer';
import { fetchTracks } from '../store/tracks';
import Canvas from './Canvas';

// import Visualize from './Wave';


class Spotify extends React.Component{
    constructor(){
        super()
        this.state = {
            playingTrack: '',
            externalUrl: ''
        }
        this.getTracks = this.getTracks.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleVisualize = this.handleVisualize.bind(this)

    };
    
    componentDidMount(){
        this.props.getTracks
    };
    async getTracks(){
        await this.props.getTracks()
    };
    handleClick(ev){
        this.setState({ playingTrack: ev.target.value })
    };
    handleVisualize(ev){
        this.setState({ externalUrl: ev.target.value })
    } ;
    render(){
        const { getTracks, handleClick, handleVisualize } = this;
        const { playingTrack, externalUrl } = this.state
        const { tracks } = this.props;
        const access_token = window.localStorage.getItem('access_token')

        return(
            <div>
                <Player access_token={access_token} trackURI = { playingTrack  }  />
                <button onClick={ getTracks }>Recent Tracks</button>
                {
                    tracks.map( track => {
                        return(
                            <div key={track.id}>
                                <button key={track.track.uri} onClick={handleClick} value={track.track.uri} >{ track.track.name }</button>
                                <button key={track.track.id} onClick={handleVisualize} value={track.track.external_urls.spotify}>Visualize</button>
                            </div>
                        )
                    })
                }
                <Canvas />
                {/* <Visualize trackURL = { externalUrl } /> */}
            </div>
        )
    }
};

const mapState = ( state ) => {
    return{
        tracks: state.tracks
    }
};

const mapDispatch = (dispatch) => {
    return {
        getTracks: () => dispatch(fetchTracks())
        // playTrack: () => dispatch(playTrack(track))
    }
};

export default connect(mapState, mapDispatch)(Spotify);