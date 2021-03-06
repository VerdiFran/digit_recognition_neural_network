import React from 'react'
import styles from './ControlPanel.module.scss'
import recognizeImage from './../../assets/images/recognize-button.png'
import clearImage from './../../assets/images/clear.svg'

const ControlPanel = (props) => {
    return (
        <div className={styles.controlPanel}>
            <div onClick={props.clearSourceData}>
                <img src={clearImage} alt='clear'/>
            </div>
            <div onClick={props.calculate}>
                <img src={recognizeImage} alt='recognize'/>
            </div>
        </div>
    )
}

export default ControlPanel
