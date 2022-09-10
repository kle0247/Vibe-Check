import React from "react"; 
import { connect } from "react-redux";
import { searchTracks } from '../store/tracks'
import { analyzeAllTracks } from '../store/analyzeTracks'
import { Box, TextField, Typography } from "@mui/material";

class Search extends React.Component{
    constructor(props){
        super()
        this.searchTracks = this.searchTracks.bind(this)
    }
    async searchTracks(ev){
        if(ev.target.value !== ''){
            await this.props.searchTracks(ev.target.value)
            await this.analyzeAllTracks()
        } else { 
            await this.props.searchTracks(ev.target.value)
        }
    }
    async analyzeAllTracks(props){
        //get list of ids
        const tracksList = this.props.tracks.map( track => `${track.id}` ).join(',')
        await this.props.analyzeAllTracks(tracksList)
};
    render(){
        const { searchTracks } = this
        return(
            <Box display='flex' justifyContent='center' style={{backgroundColor: '#000000'}}>
                <TextField  size='small'  style={{backgroundColor: '#ffffff', margin: '1rem',  borderRadius: '0.5rem', width: 500}}  label="Search tracks" onChange={ searchTracks } />
            </Box>
        )
    }
}

const mapState = (state) => {
    return{
        tracks: state.tracks
    }
} 

const mapDispatch = (dispatch) => {
    return{
        searchTracks: (search) => dispatch(searchTracks(search)),
        analyzeAllTracks: (tracks) => dispatch(analyzeAllTracks(tracks))
    }
}

export default connect(mapState, mapDispatch)(Search)