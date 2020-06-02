import React from 'react'
import {connect} from 'react-redux'
import DrawingCanvas from './DrawingCanvas'

class DrawingCanvasContainer extends React.Component {

    render() {
        return <DrawingCanvas
            startDrawing={this.startDrawing}
            draw={this.draw}
            stopDrawing={this.stopDrawing}
        />
    }
}

let mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(DrawingCanvasContainer)
