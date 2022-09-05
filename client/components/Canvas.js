import { createCanvas } from 'canvas';
import React from 'react';


class Canvas extends React.Component{
    constructor(props){
        super()
        this.canvasRef = React.createRef()
        this.setCanvas = this.setCanvas.bind(this)
    }
    componentDidUpdate(prevProps){
        if(prevProps.track.length === 0 && this.props.track.length > 0){
            this.setCanvas()
        }
    }
    componentDidMount(){
        this.setCanvas()
    }
    setCanvas(){
        let canvas = createCanvas()
        const { canvasRef, track } = this.props
        canvas = canvasRef.current

        const ctx = canvas.getContext('2d');
        const data = track
        
        
    };

    draw(ctx, data){
        const space = ctx.canvas.width / data.length
        const loudness = data.map( _data => Math.abs(_data.loudness))

        loudness.forEach( (_data, i) => {
            const startPoint = _data.start+1
            const duration = _data.duration

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);   

            ctx.beginPath();
            ctx.moveTo(space*i, 0) //start at  0,0
            ctx.lineTo(space*i, _data); //y would be the loudness of the song 
            ctx.fillStyle = 'black';
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.fillStyle = 'black';
        })
    }

    render(){
        const { canvasRef, track } = this.props

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


