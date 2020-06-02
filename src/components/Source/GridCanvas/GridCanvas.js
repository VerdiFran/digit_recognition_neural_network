import React from 'react'

const GridCanvas = (props) => {
    return (
        <canvas
            id='gridCvs'
            onMouseDown={(e) =>
                props.startDrawing({
                    x: e.clientX - e.currentTarget.offsetLeft,
                    y: e.clientY - e.currentTarget.offsetTop
                })}
            onMouseMove={(e) =>
                props.draw({x: e.clientX - e.currentTarget.offsetLeft, y: e.clientY - e.currentTarget.offsetTop})}
            onMouseUp={(e) =>
                props.stopDrawing({
                    x: e.clientX - e.currentTarget.offsetLeft,
                    y: e.clientY - e.currentTarget.offsetTop
                })}
        />
    )
}

export default GridCanvas
