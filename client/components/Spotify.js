import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Player from './SpotifyPlayer'

class Spotify extends React.Component{
    constructor(){
        super()
        this.state = {
            tracks: [], 
            playingTrack: ''
        }
        this.getTracks = this.getTracks.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        const access_token = window.localStorage.getItem('access_token')
        this.setState({access_token: access_token});
    }
    async getTracks(){
        try{
            const tracks = (await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': 'Bearer ' + this.state.access_token 
            }
            })).data.items
            this.setState({ tracks: tracks })
        }
        catch(ex){
            console.log(ex)
        }
    }
    handleClick(ev){
        this.setState({ playingTrack: ev.target.value })
    }
    render(){
        const { getTracks, handleClick } = this;
        const { tracks, playingTrack } = this.state

        return(
            <div>
                <Player access_token={this.state.access_token} trackURI= { playingTrack  }  />
                <button onClick={ getTracks }>tracks</button>
                {
                    tracks.map( track => {
                        return(
                            <button onClick={handleClick} value={track.track.uri} key={track.track.uri}>{ track.track.name }</button>
                            
                        )
                    })
                }
            </div>
        )
    }
}


const mapDispatch = (dispatch) => {
    return {
        playTrack: () => dispatch(playTrack(track))
    }
}

export default connect( mapDispatch)(Spotify);