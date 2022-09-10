import axios from 'axios'

const track = ( state = [], action ) => {
    if(action.type === 'GET_TRACK'){
        return action.track
    }
    return state
};

export const analyzeTrack = (id) => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        let track = (await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        })).data
        track = [track]
        dispatch({type: 'GET_TRACK', track})
    }   
}

export const resetTrack = () => {
    return (dispatch) => {
        const track = []

        dispatch({type: 'GET_TRACK', track})
    } 
}

export default track;