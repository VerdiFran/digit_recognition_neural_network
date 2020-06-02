import React from 'react'
import GridCanvas from './GridCanvas'
import {connect} from 'react-redux'

class GridCanvasContainer extends React.Component {
    componentDidMount() {
        this.props.drawGrid('gridCvs')
    }

    render() {return <GridCanvas {...this.props}/>}
}

let mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(GridCanvasContainer)
