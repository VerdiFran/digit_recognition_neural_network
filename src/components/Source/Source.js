import React from 'react'
import styles from './Source.module.scss'
import GridCanvasContainer from './GridCanvas/GridCanvasContainer'
import DrawingCanvasContainer from './DrawingCanvas/DrawingCanvasContainer'

const Source = (props) => {
    return (
        <div className={styles.canvasesContainer}>
            <DrawingCanvasContainer/>
            <GridCanvasContainer {...props}/>
        </div>
    )
}

export default Source
