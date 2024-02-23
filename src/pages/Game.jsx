import React, { useState, useRef } from 'react'
import styles from './Game.module.css'

const Game = ({word, category, letters, guessedLetters, wrongLetters, shotsLeft, points,  verifyLetter, letterShot, setLetterShot}) => {
    
    const focus = ()=> {
        letterInputRef.current.focus()
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        verifyLetter(letterShot)
        setLetterShot("")
        letterInputRef.current.focus()
    }

    const letterInputRef = useRef(null)
    
   // console.log(word)


  return (
    
    <div onMouseOver={focus} className={styles.game}>
       
        <h1>Adivinhe a palavra</h1>
        <h3 className={styles.tip}>
        Dica: {category}</h3>

        <div className={styles.lettersCointainer}>
            {letters.map((e, i)=> 
                guessedLetters.includes(e) ? (<span key={i} className={styles.revealLetter}>{e}</span>) : (<span key={i} className={styles.blankSquare}></span>)
            )}

            </div>
               
        <div className={styles.userLetter}>
            <p className={styles.points}> PONTOS: {points}
            </p>  

            <p>Insira uma letra</p>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input 
                type="text" 
                name='isertedLettter'
                maxLength="1" value={letterShot}
                required
                onChange={(e)=>setLetterShot(e.target.value.toUpperCase())} 
                ref={letterInputRef}
                /> {/*ele vai modificar o state a cada modificação mas a verificação da letra só será feita ao submeter*/}
                
                <button type='submit'>Enviar</button>
            </form>
        </div>
        <p>{shotsLeft} tentativas restantes</p>
        <p>Letras erradas já utilizadas:</p>
         {wrongLetters.map((e,i)=>
            <span key={i} className='wrongLetters'>{e}</span>
        )}
        
    </div>
    
  )
  
}

export default Game
