import { createCanvas } from 'canvas';
import React from 'react';




class Canvas extends React.Component{
    render(){
        return(
            <div>
                <canvas 
                    id='canvas'
                    style={{ 'border': '1px solid black', 'backgroundColor':'black'}}
                >
                </canvas>
            </div>
        )
    }
}

export default Canvas;


