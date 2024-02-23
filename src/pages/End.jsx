import React from 'react'
import styles from './End.module.css'

const End = ({retry, points}) => {
  return (

    
    <div>
        <h1 className={styles.game_over}>GAME OVER</h1>

        <h3 className={styles.pontos}>PONTOS TOTAIS: {points}</h3>
        
        <button onClick={retry}>Jogar novamente</button>
    </div>
  )
}

export default End