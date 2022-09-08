import axios from 'axios'

const tracks = ( state = [], action ) => {
    if(action.type === 'SET_TRACKS'){
        return action.tracks
    }
    return state
};

export const fetchTracks = () => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        let tracks = (await axios.get(
            "https://api.spotify.com/v1/me/player/recently-played?limit=50", {
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        })).data.items
        tracks = tracks.map( _track => _track.track)
        dispatch({type: 'SET_TRACKS', tracks})
    }
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
        dispatch({type: 'SET_TRACKS', tracks})
    }
};

export const searchTracks = (search) => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        if(search !== ''){
            const tracks = (await axios.get(
                `https://api.spotify.com/v1/search?q=${search}&type=track,artist`, {
                headers: {
                    'Authorization': 'Bearer ' + access_token 
                }
            })).data.tracks.items
            dispatch({type: 'SET_TRACKS', tracks})
        } else {
            const tracks = []
            dispatch({type: 'SET_TRACKS', tracks})
        }
    }
}

export default tracks