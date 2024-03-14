import React from 'react'

const About = ({start}) => {
  return (
    <div className='aboutComponent'>
        <h1> Sobre Secret Word</h1>
        <p> Este projeto consiste em um Jogo feito com React.js no frontend, usando hooks como useState e useEffect, explorando lógica e métodos de JavaScript. 
            {/* This project consists in a Game made with React on frontend using hooks like useState and useEffect.
             */}
        </p>  
        <p>Feito como treinamento de conceitos básicos de React.</p>
        <h2>@Felipe Monteiro</h2> 

        <button onClick={start}>Começar o jogo</button>
            
    </div>
  )
}

export default About