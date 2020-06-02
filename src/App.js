import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import {Provider} from 'react-redux'
import store from './redux/store'
import SourceContainer from './components/Source/SourceContainer'
import ControlPanelContainer from './components/ControlPanel/ControlPanelContainer'
import ResultContainer from './components/Result/ResultContainer'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Header/>
                <div className='mainContent'>
                    <SourceContainer/>
                    <ResultContainer/>
                </div>
                <ControlPanelContainer/>
            </div>
        </Provider>
    )
}

export default App
