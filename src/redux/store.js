import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import recognitionReducer from './recognitionReducer'

let reducers = combineReducers({
    recognition: recognitionReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store
