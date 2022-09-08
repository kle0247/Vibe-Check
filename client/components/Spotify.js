import React from 'react';
import { connect } from 'react-redux';
import Player from './SpotifyPlayer';
import { fetchTracks } from '../store/tracks';
import { fetchTopTracks } from '../store/topTracks';
import { analyzeTrack } from '../store/track';
import { analyzeAllTracks } from '../store/analyzeTracks';
import Bar from './Nivo'
import Radar from './Radar'
import Search from './Search';
import { Container, Box, Card, Button, CardContent, Typography } from '@mui/material'
import Canvas from './Canvas'

class Spotify extends React.Component{
    constructor(){
        super()
        this.state = {
            playingTrack: '',
            tracksList: '',
            trackName: '',
            fps: 0,
            recent: false,
            top: false
        }
        this.getTracks = this.getTracks.bind(this)
        this.getTopTracks = this.getTopTracks.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.getTempo = this.getTempo.bind(this)
        this.canvasRef = React.createRef()
    };
    
    async getTracks(){
        await this.props.getTracks()
        this.setState({ recent: true, top: false })
        this.analyzeAllTracks()
    };
    async handleClick(ev){
        this.setState({ playingTrack: ev.target.value });
        const playingTrack = ev.target.value;

        // get id from URI
        const id = playingTrack.slice(14); 
        await this.props.analyzeTrack(id);
        this.getTempo()

    };    
    async getTopTracks(){
        await this.props.getTopTracks()
        this.setState({ recent: false, top: true })
        this.analyzeAllTracks()
    };
    getTempo(){
        const track = this.props.track
        if(track.length){
            const tempo = track[0].tempo
            this.setState({ fps: tempo })
        }
    }
    async analyzeAllTracks(props){
        if(this.state.top === true){
            const tracksList = this.props.topTracks.map( track => `${track.id}` ).join(',') //got list of ids
            await this.props.analyzeAllTracks(tracksList)
        } else if(this.state.recent === true){
            const tracksList = this.props.tracks.map( track => `${track.track.id}` ).join(',') //got list of ids
            await this.props.analyzeAllTracks(tracksList)
        }
    }
    render(){
        const { getTracks, getTopTracks, handleClick, canvasRef } = this;
        const { playingTrack, recent, top, fps } = this.state
        const { tracks, track, topTracks, analyzedTracks, results } = this.props;
        const access_token = window.localStorage.getItem('access_token');
        
        return(
            <Container style={{'maxWidth': 2000}}>
                <Box>
                    <Player access_token={access_token} trackURI = { playingTrack  }  />

                    <Button onClick={ getTracks }>Recent Tracks</Button>
                    <Button onClick={ getTopTracks }>Top Tracks</Button>
                    <Search />
                </Box>
                <div id='container'>
                    <Box style={{'display': 'flex', 'width':'50%', 'overflowY': 'scroll', 'maxHeight': 550, 'width': 400, 'padding': '1rem'}} >
                    <div>
                        { 
                            !!recent && results.length === 0 ? 
                            
                            <div className='tracks'>
                            {
                                tracks.map( track => {
                                    return(
                                        <div key={track.id}>
                                            <Button style={{'textAlign': 'start'}} variant='text' key={track.track.uri} onClick={handleClick} value={track.track.uri}>
                                                <img src={ track.track.album.images[2].url } style={{ 'paddingRight': '1rem' }} />
                                                { track.track.name } <br/> { track.track.artists[0].name }
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                            </div> : null
                        }

                        {   
                            !!top && results.length === 0 ? 
                            
                            <div className='tracks'>
                            {
                                topTracks.map( track => {
                                    return(
                                        <div key={track.id}>
                                            <Button style={{'textAlign': 'start'}} variant='text' key={track.uri} onClick={handleClick} value={track.uri} >
                                                <img src={ track.album.images[2].url } style={{'paddingRight': '1rem'}}/>
                                                { track.name } <br/> { track.artists[0].name }
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                            </div> : null
                        }
                        {   
                            results.length !== 0 ? 
                            
                            <div className='tracks'>
                            {
                                results.map( track => {
                                    return(
                                        <div key={track.id}>
                                            <Button style={{'textAlign': 'start'}} variant='text' key={track.uri} onClick={handleClick} value={track.uri}>
                                                <img src={ track.album.images[2].url } style={{'paddingRight': '1rem'}}/>
                                                { track.name } <br/> { track.artists[0].name }
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                            </div> : null
                        }
                    </div> 
                    </Box>
                    <Box style={{'display': 'flex'}}>
                    
                    {
                        !analyzedTracks.length || results.length > 0 ? null :
                         
                        <Card variant='outlined' style={{'height': 550, 'width': 500, 'margin': '1rem',  'paddingTop': '1rem'}}>
                            <Bar tracksFeatures={analyzedTracks} /> 
                        </Card>
                    }
                    
                    {    
                        !track.length ? null :

                        <Card variant='outlined' style={{'height': 550, 'width': 500, 'margin': '1rem', 'textAlign': 'center', 'paddingTop': '1rem'}}>
                            <Typography>
                            {
                                
                                tracks.find( _track =>  _track.track.id === track[0].id ) ? tracks.find( _track =>  _track.track.id === track[0].id ).track.name :
                                
                                topTracks.find( _track =>  _track.id === track[0].id ).name
                            
                            }



                            </Typography>
                            <Radar trackFeatures={track}/>
                        </Card>
                    }  
                    </Box>
                    
                    {/* <Canvas tempo={fps} canvasRef={ canvasRef }/> */}
                    
                </div>              
            </Container>
        )
    }
};

const mapState = ( state ) => {
    return{
        tracks: state.tracks,
        track: state.track, 
        topTracks: state.topTracks,
        analyzedTracks: state.analyzedTracks,
        results: state.results
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
