import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { originalWordsList } from './data/words'
import End from './pages/End'
import Game from './pages/Game'
import About from './pages/About'

// estágios do jogo

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
  {id: 4, name: 'about'}
]

function App() {
  const [wordsList, setWordsList] = useState(originalWordsList)

  //state que controlará qual component será exibido
  const [gameStage, setGameStage] = useState(stages[0].id) //observe que o 1 é o start, será o default

  //função para escolher aleatoriamente Uma palavra de uma das Categorias 
    const drawWord = ()=> {

      const categories = Object.keys(wordsList) // o object serve para melhor manipulação de objetos, neste caso combinado a propriedade keys irá criar um array de strings com nome das keys

      const drawnCategory = categories[Math.floor(Math.random() * categories.length )]

      const drawnWord = wordsList[drawnCategory][Math.floor(Math.random() * wordsList[drawnCategory].length)]

      // após sorteada, eu vou retirar essa palavra da listaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      setWordsList(actual=> ( 
        {...actual,
          [drawnCategory]: actual[drawnCategory].filter((word)=> drawnWord !== word)}
      ))

      return {drawnWord , drawnCategory}

      
    
      }
   
  //função para que ao clicar no botão, passe para o estágio Game, 
  const goToGame = ()=>{

    clearWordStates()
  
    setGameStage(2)

    // MAS ANTES de mudar para o estágio game, temos que preparar este component com:

    //1- Sortear a palavra a ser adivinhada, e também precisaremos do nome da categoria para exibir como dica
    const {drawnWord , drawnCategory} = drawWord()

    //2- Transformar a palavra em letra Maiuscula e em seguida em um array de letras  
    let drawnWordLetters = drawnWord.toUpperCase().split("")
    
   // 3-atualizar States necessários para a rodada(quem vao ser rodados no component game): palavra, categoria e array de letras
    setWord(drawnWord)
    setCategory(drawnCategory)
    setLetters(drawnWordLetters)

    setGameStage(stages[1].id)
  }
  // States necessários para a rodada(a serem usadas no component game): palavra, categoria e array de letras. + letras acertadas, letras erradas, tentativas, pontos
const [word, setWord] = useState()
const [category, setCategory] = useState()
const [letters, setLetters] = useState()

const uniqueLetters = [... new Set(letters)]

const [guessedLetters , setGuessedLetters] = useState([])
const [wrongLetters , setWrongLetters] = useState([])
const [shotsLeft, setShotsLeft] = useState(8)
const [points, setPoints] = useState(0)

const [letterShot, setLetterShot] = useState("")

  //função que para o component Game
  const verifyLetter = (letterShot)=>{
   
    //mensagem de letra repetida
    if(guessedLetters.includes(letterShot) || wrongLetters.includes(letterShot)){
      alert("Já usaste esta letra. Insira outra")
    }

    //se acertar 

    if(letters.includes(letterShot)){
      setGuessedLetters((actual)=>[...actual,letterShot])
      setLetterShot("") //isto foi solução que encontrei pois a renderização dos quadrados de letras só estão sendo reefetudas quando atualiza o useState do LetterShot

      // Verificar se ganhou a palavra: ficará no useEffect, devido o delay do useState guessedLetter
        
     
      // se errar:
    }else{
      setWrongLetters((actual)=>[...actual,letterShot])
      setShotsLeft(shotsLeft-1)

      //a condição de esgotamento de tentativas ficará no useEffect, devido o delay do useState shotsLeft
      
    }
}

useEffect(()=>{
  if(shotsLeft==0){
  setGameStage(3)
}}, [shotsLeft])

// Verificar se ganhou a palavra
useEffect(()=>{
  if(uniqueLetters.length > 0 && guessedLetters.length == uniqueLetters.length){
    
    alert('Parabéns! Ganhaste 50 pontos!')
    setPoints((actual)=> actual+50)

    clearWordStates()
    goToGame()
    
}}, [guessedLetters])

  //função para o component End
  const retry = ()=>{
    clearWordStates()
    setPoints(0)
    setWordsList(originalWordsList)
    setShotsLeft(8)
    setGameStage(2)
  }
  const clearWordStates = ()=> {
    setWrongLetters([])
    setGuessedLetters([])
  }

  const handleAbout = () => {
    setGameStage(4)
  }

  return (
    <div>
      <div className='about'>   
        {gameStage !=4 && <button onClick={handleAbout} >Sobre</button> }
      </div>
      <div className='App'>
        {/* Renderização Condicional de components */}
        {gameStage == 1 && <Home start={goToGame} />}
        {gameStage == 2 && 
          <Game 
          word={word}
          category={category}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          shotsLeft={shotsLeft}
          points={points}
          letterShot={letterShot}
          setLetterShot={setLetterShot}

          verifyLetter={verifyLetter}

          />
        }
        {gameStage == 3 && <End retry={retry} points={points}/>}

        {gameStage == 4 && <About start={goToGame} />}

      </div>
    </div>
  )
}

export default App
