import axios from 'axios';

const results = (state=[], action) => {
    if(action.type === 'SET_RESULTS'){
        return action.resultsList ? action.resultsList : state
    }
    return state
}

export const searchTracks = (search) => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        if(search !== ''){
            const resultsList = (await axios.get(
                `https://api.spotify.com/v1/search?q=${search}&type=track,artist`, {
                headers: {
                    'Authorization': 'Bearer ' + access_token 
                }
            })).data.tracks.items
            dispatch({type: 'SET_RESULTS', resultsList})
        } else {
            const resultsList = []
            dispatch({type: 'SET_RESULTS', resultsList})
        }
    }
}

export default results