import React, { useState, useEffect } from 'react';

export const SpotifyPlayer = () =>{
    const player = window.onSpotifyWebPlaybackSDKReady = () => {
        const token = '[My access token]';
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });
    return(
        <div>
            <script src="https://sdk.scdn.co/spotify-player.js"></script> 
            <script>
                {player()}    
            </script>              
        </div>
    )}
}