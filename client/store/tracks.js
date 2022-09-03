import axios from 'axios'

const tracks = ( state = [], action ) => {
    if(action.type === 'SET_TRACKS'){
        return ( action.tracks ? action.tracks : null )
    }
    return state
}

export const fetchTracks = () => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        const tracks = (await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        })).data.items
        dispatch({type: 'SET_TRACKS', tracks})
    }
}

export default tracks;