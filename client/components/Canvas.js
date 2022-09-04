import { createCanvas } from 'canvas';
import React from 'react';



class Canvas extends React.Component{
    constructor(){
        super()
        this.setState = {
            radius: 0
        }
        this.canvasRef = React.createRef()
        this.setCanvas = this.setCanvas.bind(this)
    }
    componentDidMount(){
        this.setCanvas()
    }
    setCanvas(){
        let canvas = createCanvas()
        const { canvasRef } = this.props
        canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 70;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    };
    
    render(){
        const { canvasRef } = this.props
        // console.log(audioRef)
        return(
            <div>
                <canvas 
                    id='canvas'
                    style={{ 'border': '1px solid black', 'backgroundColor':'white'}}
                    ref={ canvasRef }
                >
                </canvas>
            </div>
        )
    }
}

export default Canvas;


