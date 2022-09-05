import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Player from './SpotifyPlayer';
import tracks, { fetchTracks } from '../store/tracks';
import { fetchTopTracks } from '../store/topTracks';
import { analyzeTrack } from '../store/track';
import { analyzeAllTracks } from '../store/analyzeTracks';

import Pie from '../components/Nivo'

class Spotify extends React.Component{
    constructor(){
        super()
        this.state = {
            playingTrack: '',
            recentTracks: false,
            top: false,
            tracksList: ''
        }
        this.getTracks = this.getTracks.bind(this)
        this.getTopTracks = this.getTopTracks.bind(this)
        this.handleClick = this.handleClick.bind(this)
    };
    
    async getTracks(){
        await this.props.getTracks()
        this.setState({ recentTracks: true, top: false })

    };
    async handleClick(ev){
        
        this.setState({ playingTrack: ev.target.value });
        const playingTrack = ev.target.value;
        
        // get id from URI
        const id = playingTrack.slice(14); 
        await this.props.analyzeTrack(id);
    };    
    async getTopTracks(){
        await this.props.getTopTracks()
        this.setState({ recentTracks: false, top: true })
        this.analyzeTracks()
    };
    async analyzeTracks(props){
        const tracksList = this.props.topTracks.map( track => `${track.id}` ).join(',') //got list of ids
        await this.props.analyzeTracks(tracksList)
    }
    render(){
        const { getTracks, getTopTracks, handleClick, analyzeTracks} = this;
        const { playingTrack, recentTracks, top } = this.state
        const { tracks, track, topTracks } = this.props;
        const access_token = window.localStorage.getItem('access_token');

        // let segmentsArray  = []
        
        // track.map( track => {
        //     segmentsArray.push({start: track.start, loudness: track.loudness_max, duration: track.duration })
        // })

        return(
            <div>
                <Player access_token={access_token} trackURI = { playingTrack  }  />

                <button onClick={ getTracks }>Recent Tracks</button>
                <button onClick={ getTopTracks }>Top Tracks</button>
                {/* <button onClick={ analyzeTracks }>Analyze</button> */}
                { 
                    recentTracks ? 

                    <div>
                    {
                        tracks.map( track => {
                            return(
                                <div key={track.id}>
                                    <button key={track.track.uri} onClick={handleClick} value={track.track.uri} >{ track.track.name } by { track.track.artists[0].name }</button>
                                </div>
                            )
                        })
                    }
                    </div> : null
                }

                {   top ? 
                    <div>
                    {
                    topTracks.map( track => {
                        return(
                            <div key={track.id}>
                                <button key={track.uri} onClick={handleClick} value={track.uri} >{ track.name } by { track.artists[0].name }</button>
                            </div>
                        )
                    })
                    }
                    </div> : null
                }
                <div >
                    {/* <Pie track={track} />  */}
                </div>
            </div>
        )
    }
};

const mapState = ( state ) => {
    return{
        tracks: state.tracks,
        track: state.track, 
        topTracks: state.topTracks
    }
};

const mapDispatch = (dispatch) => {
    return {
        getTracks: () => dispatch(fetchTracks()),
        getTopTracks: () => dispatch(fetchTopTracks()),
        analyzeTrack: (id) => dispatch(analyzeTrack(id)),
        analyzeTracks: (tracks) => dispatch(analyzeAllTracks(tracks))
    }
};

export default connect(mapState, mapDispatch)(Spotify);