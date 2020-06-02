import React from 'react'
import {connect} from 'react-redux'
import {setSizes, setSourcePoints} from '../../redux/recognitionReducer'
import Source from './Source'

class SourceContainer extends React.Component {
    state = {
        isDrawing: false,
        ctx: '',
        pixelSize: 14,
        width: 392,
        height: 392
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

        let red = Math.floor(Math.random() * 200 + 30)
        let green = Math.floor(Math.random() * 200 + 30)
        let blue = 250

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.9)`
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

    stopDrawing = () => {
        this.setState({
            isDrawing: false
        })
    }

    clearRect = (coordinates) => {
        let coords = this.toCoordinates(coordinates)
        this.state.ctx.clearRect(coords.x, coords.y, this.state.pixelSize, this.state.pixelSize)
    }

    setSizes = (elementIds) => {
        elementIds.forEach(elemId => {
            let elem = document.getElementById(elemId)
            elem.width = this.state.width
            elem.height = this.state.height
        })
    }

    drawGrid = (elementId) => {
        const element = document.getElementById(elementId)
        const ctx = element.getContext('2d')
        const pixel = this.state.pixelSize

        element.width = this.state.width
        element.height = this.state.height

        const width = element.width
        const height = element.height
        const pixelWidth = width / pixel
        const xStep = width / pixelWidth
        const yStep = height / pixelWidth

        const drawLine = function (x1, y1, x2, y2, color = 'rgba(174, 237, 243, 0.4)') {
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.lineJoin = 'miter'
            ctx.lineWidth = 1
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
        }

        for (let x = xStep; x < width; x += xStep) {
            drawLine(x, 0, x, height)
        }

        for (let y = yStep; y < height; y += yStep) {
            drawLine(0, y, width, y)
        }
    }

    componentDidMount() {
        this.setSizes(['dwgCvs'])
        let elem = document.getElementById('dwgCvs')
        const ctx = elem.getContext('2d')
        this.setState({ctx: ctx})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.props.sourcePoints.forEach((row, idx) => {
            row.forEach((point, index) => {
                if (prevProps.sourcePoints[idx][index] !== point && point === 1) {
                    this.drawCell({x: index, y: idx})
                } else if (prevProps.sourcePoints[idx][index] !== point && point === 0) {
                    this.clearRect({x: index, y: idx})
                }
            })
        })
    }

    render() {
        return <Source
            startDrawing={this.startDrawing}
            draw={this.draw}
            stopDrawing={this.stopDrawing}
            drawGrid={this.drawGrid}
        />
    }
}

let mapStateToProps = (state) => ({
    sourcePoints: state.recognition.sourcePoints
})

export default connect(mapStateToProps, {setSourcePoints})(SourceContainer)
