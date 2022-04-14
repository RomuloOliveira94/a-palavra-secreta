import React, { useRef } from "react";
import { useState } from "react";
import "./GameScreen.css";

const GameScreen = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  //letter é a letra que digitamos
  const [letter, setLetter] = useState("");
  //essa referencia do input pega o campo como o queryselector
  const letterInputRef = useRef(null);
  //essa função vai pegar nossa letra e mandar pro pai para ser validada.
  const handleSubmit = (e) => {
    //primeiro prevenimos que o form atualize a pagina
    e.preventDefault();
    //usamos um callback para essa verificação da letra, passando a letra que digitamos como parametro
    verifyLetter(letter);
    //e depois resetamos a letra.
    setLetter("");
    //aqui mantemos nosso campo de texto focado.
    letterInputRef.current.focus()
  };

  return (
    <div className="game">
      <p className="points"></p>
      <span>Pontuação: {score}</span>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} Tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blanksquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já chutadas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
