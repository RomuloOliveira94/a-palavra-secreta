import React from "react";
import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>A Palavra Secreta</h1>
      <p>Clique para jogar</p>
      <button onClick={startGame}>Começar!</button>
    </div>
  );
};

export default StartScreen;
