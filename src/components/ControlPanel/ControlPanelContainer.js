import ControlPanel from './ControlPanel'
import React from 'react'
import {calculateResult, clearSourceData} from '../../redux/recognitionReducer'
import {connect} from 'react-redux'

class ControlPanelContainer extends React.Component {

    calculate = () => {
        this.props.calculateResult(this.props.sourcePoints)
    }

    render() {
        return <ControlPanel
            clearSourceData={this.props.clearSourceData}
            calculate={this.calculate}/>
    }
}

let mapStateToProps = (state) => ({
    sourcePoints: state.recognition.sourcePoints
})

export default connect(mapStateToProps, {clearSourceData, calculateResult})(ControlPanelContainer)
