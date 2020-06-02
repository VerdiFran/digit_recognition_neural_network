import React from 'react'
import styles from './Result.module.scss'
import arrow from './../../assets/images/arrow.svg'

const Result = (props) => {
    return (
        <div className={styles.resultContainer}>
            <div><img src={arrow} alt='arrow' width='40px' height='50px'/></div>
            <div>{props.resultDigit}</div>
        </div>
    )
}

export default Result
