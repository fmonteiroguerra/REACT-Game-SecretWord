import React from 'react'
import styles from './Home.module.css'

const Home = ({start}) => {
  return (
    <div>
        <h1 className={styles.secret}>Secret Word</h1>
        <p className={styles.iniciar}>Clique no botão para iniciar</p>
        <button onClick={start}>Começar o jogo</button>

    </div>
  )
}

export default Home