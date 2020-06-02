import React from 'react'
import {connect} from 'react-redux'
import {setSizes, setSourcePoints} from '../../redux/recognitionReducer'
import Source from './Source'

class SourceContainer extends React.Component {
    state = {
        isDrawing: false,
        ctx: '',
        pixelSize: 14
    }

    toIndices = (coordinates) => {
        const pixel = this.state.pixelSize
        return {
            x: Math.trunc(coordinates.x / pixel),
            y: Math.trunc(coordinates.y / pixel)
        }
    }

    toCoordinates = (indices) => {
        const pixel = this.state.pixelSize
        return {
            x: indices.x * pixel,
            y: indices.y * pixel
        }
    }

    drawCell = (coordinates) => {
        const ctx = this.state.ctx
        const pixelSize = this.state.pixelSize
        let coords = this.toCoordinates(coordinates)

        ctx.fillStyle = 'grey'
        ctx.fillRect(coords.x, coords.y, pixelSize, pixelSize)
    }

    startDrawing = (coordinates) => {
        this.setState({
            isDrawing: true
        })
        this.state.ctx.beginPath()
        let coords = this.toIndices(coordinates)
        this.props.setSourcePoints([{x: coords.x, y: coords.y, value: 1}])
    }

    draw = (coordinates) => {
        if (this.state.isDrawing) {
            let coords = this.toIndices(coordinates)
            this.props.setSourcePoints([{x: coords.x, y: coords.y, value: 1}])
        }
    }

    stopDrawing = (coordinates) => {
        this.setState({
            isDrawing: false
        })
    }

    componentDidMount() {
        this.props.setSizes(['dwgCvs'])
        let elem = document.getElementById('dwgCvs')
        const ctx = elem.getContext('2d')
        this.setState({ctx: ctx})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.sourcePoints.forEach((row, idx) => {
            row.forEach((point, index) => {
                if (prevProps.sourcePoints[idx][index] !== point) {
                    this.drawCell({x: index, y: idx})
                }
            })
        })
    }

    render() {
        return <Source
            startDrawing={this.startDrawing}
            draw={this.draw}
            stopDrawing={this.stopDrawing}
        />
    }
}

let mapStateToProps = (state) => ({
    sourcePoints: state.recognition.sourcePoints
})

export default connect(mapStateToProps, {setSizes, setSourcePoints})(SourceContainer)
