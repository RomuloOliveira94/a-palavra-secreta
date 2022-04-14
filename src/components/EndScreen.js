import React from "react";
import "./EndScreen.css"

const EndScreen = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>Pontuação final: <span>{score}</span></h2>
      <button onClick={retry}>Tentar novamente</button>
    </div>
  );
};

export default EndScreen;
