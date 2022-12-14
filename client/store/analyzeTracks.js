import axios from 'axios';

const analyzedTracks = (state = [], action) => {
    if(action.type === 'ANALYZE_TRACKS'){
        return action.tracks 
    }
    return state
}

export const analyzeAllTracks = (tracksList) => {
    return async(dispatch) => {
        const access_token = window.localStorage.getItem('access_token')
        const tracks = (await axios.get(
            `https://api.spotify.com/v1/audio-features?ids=${tracksList}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        })).data.audio_features
        dispatch({type: 'ANALYZE_TRACKS', tracks})
    }
};

export default analyzedTracks;
