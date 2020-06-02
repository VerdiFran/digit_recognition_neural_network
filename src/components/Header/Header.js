import React from 'react'
import styles from './Header.module.scss'

const Header = (props) => {
    return (
        <div className={styles.header}>
            <span>Распознавание рукописных цифр. Нейронная сеть.</span>
        </div>
    )
}

export default Header
