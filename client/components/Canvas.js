import { createCanvas } from 'canvas';
import React from 'react';


class Canvas extends React.Component{
    constructor(props){
        super()
        this.state = {
            xPosition: 55,
            yPosition: 55,
            fps: 30, //tempo
            speed: 10, 
            direction: 1,
            layout: ''
        }
        this.canvasRef = React.createRef()
        this.setCanvas = this.setCanvas.bind(this)
        this.drawPositions= this.drawPositions.bind(this)
    }
    componentDidUpdate(prevProps){
        console.log(prevProps)
        if(prevProps.tempo !== this.props.tempo) {
            this.setState({ speed: this.props.tempo })
            this.setCanvas()
        }
    }
    componentDidMount(){
        this.setCanvas()
    }
    setCanvas(){
        let canvas = createCanvas({width: 1000})
        const { canvasRef } = this.props
        canvas = canvasRef.current    
        this.setState({ canvas: canvas })   

        if(canvas.getContext){
            let layout = canvas.getContext('2d');
            this.setState({ layout: layout })
            
            const interval = setInterval( () => {
                this.getPositions();
                this.drawPositions();
            }, 1000 / this.state.fps  );
        
            setTimeout(() => {
                clearInterval(interval)
            }, 6000)

        }   

    };
    
    getPositions(){
        if(this.state.xPosition >= this.state.layout.canvas.width){
            this.state.direction = -1
        } else if(this.state.xPosition <= 0) {
            this.state.direction = 1
        }
        this.state.xPosition += this.state.direction === 1 ? this.state.speed : this.state.speed * -1;
    }

    drawPositions(){
        const layout = this.state.layout
        layout.fillStyle = 'white'
        layout.fillRect(0, 0, layout.canvas.width, layout.canvas.width)
        
        layout.fillStyle = 'black'
        layout.fillRect(this.state.xPosition, this.state.yPosition, 50, 50)
    }

    render(){
        const { canvasRef } = this.props
        console.log(this.state.fps)
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


