import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


const Player = ({ access_token, trackURI }) => {

    return(
        <SpotifyPlayer 
            token={ access_token }
            uris = { trackURI }
            play={!!trackURI}
            styles={{
                activeColor: '#fff',
                bgColor: 'black',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff'
              }}
        />
    )
}

export default Player;