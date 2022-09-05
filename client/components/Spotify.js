import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Player from './SpotifyPlayer';
import { fetchTracks } from '../store/tracks';
import { fetchTopTracks } from '../store/topTracks';
import { analyzeTrack } from '../store/track';
import { analyzeAllTracks } from '../store/analyzeTracks';
import Bar from './Nivo'
import Radar from './Radar'

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
        this.analyzeAllTracks()
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
        this.analyzeAllTracks()
    };
    async analyzeAllTracks(props){
        if(this.state.recentTracks === false){
            const tracksList = this.props.topTracks.map( track => `${track.id}` ).join(',') //got list of ids
            await this.props.analyzeAllTracks(tracksList)
        } else if(this.state.recentTracks === true){
            const tracksList = this.props.tracks.map( track => `${track.track.id}` ).join(',') //got list of ids
            await this.props.analyzeAllTracks(tracksList)
        }
    }
    render(){
        const { getTracks, getTopTracks, handleClick} = this;
        const { playingTrack, recentTracks, top } = this.state
        const { tracks, track, topTracks, analyzedTracks } = this.props;
        const access_token = window.localStorage.getItem('access_token');
        return(
            <main>
                <Player access_token={access_token} trackURI = { playingTrack  }  />

                <button onClick={ getTracks }>Recent Tracks</button>
                <button onClick={ getTopTracks }>Top Tracks</button>
                <div id='container' style={{'height': 1000}}>
                { 
                    recentTracks ? 

                    <div className='tracks'>
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

                {   
                    top ? 
                    
                    <div className='tracks'>
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
                {/* <div id='charts' style={{'height': 1000}}> */}
                {
                    !analyzedTracks.length ? null : 
                    
                    // <div id='bar' style={{'height': 1000}}>
                        <Bar tracksFeatures={analyzedTracks} /> 
                    // </div>
                }
                {    
                    !track.length ? null :
                    // <div style={{'height': 1000}}>
                        <Radar trackFeatures={track}/>
                    // </div>
                }
                {/* </div> */}
                </div>
            </main>
        )
    }
};

const mapState = ( state ) => {
    return{
        tracks: state.tracks,
        track: state.track, 
        topTracks: state.topTracks,
        analyzedTracks: state.analyzedTracks
    }
};

const mapDispatch = (dispatch) => {
    return {
        getTracks: () => dispatch(fetchTracks()),
        getTopTracks: () => dispatch(fetchTopTracks()),
        analyzeTrack: (id) => dispatch(analyzeTrack(id)),
        analyzeAllTracks: (tracks) => dispatch(analyzeAllTracks(tracks))
    }
};

export default connect(mapState, mapDispatch)(Spotify);
