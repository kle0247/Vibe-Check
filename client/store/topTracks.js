import axios from 'axios'

const topTracks = ( state = [], action ) => {
    if(action.type === 'SET_TOP_TRACKS'){
        return ( action.tracks ? action.tracks : null )
    }
    return state
};

export const fetchTopTracks = () => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        const tracks = (await axios.get(
            "https://api.spotify.com/v1/me/top/tracks?limit=50", {
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        })).data.items
        dispatch({type: 'SET_TOP_TRACKS', tracks})
    }
};

export default topTracks