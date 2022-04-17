// React
import { useCallback, useEffect, useState } from "react";
// Data
import { wordList } from "./data/words";
// CSS
import "./App.css";
//Components
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";

//Objeto que representa a progressão do jogo.
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];
let guessesQty = 3;

function App() {
  const [gamesStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);
  const [pickedWord, setPicketWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  //Essa função pega a categoria e a palavra de forma aleatória
  const pickWordAndCategory = useCallback (() => {
    //Atribuição das chaves(keys) do objeto word para uma const, retorna um array com esses dados.
    const categories = Object.keys(words);
    //Gerando a categoria aleatoria, atribuindo a uma const, o array, a pegando um indice a partir do math, vezes o tamanho do indice, arredondado para baixo.
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //Para pegar a palavra
    //Aqui atribuimos a word, primeiramente a categoria buscada aleatoriamente, em words[category] é a mesma coisa que words['fruta'].
    //Vai nos retornar o array completo, e a partir dai pegamos o numero aleatória com o math.random no valor do tamanho do array da categoria escolhida.
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  //Função para começar o jogo
  const startGame = useCallback(() => {
    clearLetterStates();
    //Depois de pegar os valores aleatorios, desestruturamos o retorno da função.
    const { word, category } = pickWordAndCategory();
    //aqui padronizamos as letras para que nao tenha problemas  na validação
    let wordLetter = word.split("");
    wordLetter = wordLetter.map((l) => l.toLowerCase());

    //Gerando os estados
    setPickedCategory(category);
    setPicketWord(word);
    setLetters(wordLetter);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);
  //Processar as palavras do input
  const verifyLetter = (letter) => {
    //padronizamos tambem para lowercase
    const normalizedLetter = letter.toLowerCase();
    //verificamos se as letras que foi passada ja esta nas adivinhadas ou nas erradas, caso sim paramos a função.
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    //agora caso a letra do jogo tenha a seja uma letra que a gente adivinhou, adicionamos ela ao nosso array de adivinhadas. Esse actualGuessedLetters já é o valor que temos, o que estamos fazendo aqui é atribuir um array a esse actualGuessedLetters, com o valor dele mesmo mais a letra que foi enviada.
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      //caso nao seja, colocamos elas no array de wrong, letras erradas
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      //e diminuimos as chances
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  //essa função faz a limpeza ao final da partida
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };
  //aqui monitoramos as mudanças, caso tenhamos 0 tentativas, reiniciamos o jogo e vamos para a terceira tela. Lembrando que o use effect monitora alguma alteração em um estado ou função, e temos que informar ele ali no final.
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //este use effect é quando ganhamos, primeiro retiramos as letras repetidas e verificamos se as letras batem, se sim, mais 100 de pontuação e reiniciamos o jogo.
  useEffect(() => {
    //essa classe newSet faz com que o nosso array tenha apenas uma letra de cada, para evitar erros de validação quando a palavra tiver mais de uma letra igual.
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  //Reiniciar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gamesStage === "start" && <StartScreen startGame={startGame} />}
      {gamesStage === "game" && (
        <GameScreen
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gamesStage === "end" && <EndScreen retry={retry} score={score} />}
    </div>
  );
}

export default App;
