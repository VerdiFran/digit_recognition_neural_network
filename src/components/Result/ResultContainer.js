import {connect} from 'react-redux'
import Result from './Result'

let mapStateToProps = (state) => ({
    resultDigit: state.recognition.resultDigit
})

export default connect(mapStateToProps)(Result)
