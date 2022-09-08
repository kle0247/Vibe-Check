import React from "react"; 
import { connect } from "react-redux";
import { searchTracks } from '../store/search'

class Search extends React.Component{
    constructor(props){
        super()
    }
    render(){
        return(
            <input placeholder="Search tracks" onChange={ (ev) => this.props.searchTracks(ev.target.value) } />
        )
    }
}

const mapDispatch = (dispatch) => {
    return{
        searchTracks:(search) => dispatch(searchTracks(search))
    }
}

export default connect(null, mapDispatch)(Search)