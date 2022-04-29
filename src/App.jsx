import "./App.css";
import StartScreen from "./components/start-screen/StartScreen";
import { useCallback, useEffect, useState } from "react";
import { wordsList } from "./data/words";
import Game from "./components/game/Game";
import End from "./components/end/End";

const stages = [
	{ id: 1, name: "start" },
	{ id: 2, name: "game" },
	{ id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
	const [gameStage, setGameStage] = useState(stages[0].name);
	const [words] = useState(wordsList);
	const [chooseWord, setChooseWord] = useState("");
	const [chooseCategory, setChooseCategory] = useState("");
	const [letters, setLetters] = useState([]);

	const [guessedLetters, setGuessedLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [guesses, setGuesses] = useState(guessesQty);
	const [score, setScore] = useState(0);

	const wordAndCategory = useCallback(() => {
		//pick a random category
		const categories = Object.keys(words);
		const category =
			categories[Math.floor(Math.random() * Object.keys(categories).length)];

		//pick a random word
		const word =
			words[category][Math.floor(Math.random() * words[category].length)];

		return { word, category };
	}, [words]);

	const startGame = useCallback(() => {
		//clear all letters
		clearLetterStates();

		//pick a category and word
		const { word, category } = wordAndCategory();

		// create an array of letters
		let wordLetters = word.split("");

		wordLetters = wordLetters.map((l) => l.toLowerCase());

		// fill states
		setChooseWord(word);
		setChooseCategory(category);
		setLetters(wordLetters);

		setGameStage(stages[1].name);
	}, [wordAndCategory]);

	//letter input
	const veriffyLetter = (letter) => {
		const normalizedLetter = letter.toLowerCase();
		//Check if letter is already been used
		if (
			guessedLetters.includes(normalizedLetter) ||
			wrongLetters.includes(normalizedLetter)
		) {
			return;
		}

		//push guessed letter or remove a guess
		if (letters.includes(normalizedLetter)) {
			setGuessedLetters((actualGuessedLetters) => [
				...actualGuessedLetters,
				normalizedLetter,
			]);
		} else {
			setWrongLetters((actualWrongLetters) => [
				...actualWrongLetters,
				normalizedLetter,
			]);
			setGuesses((actualGuesses) => actualGuesses - 1);
		}
	};

	const clearLetterStates = () => {
		setGuessedLetters([]);
		setWrongLetters([]);
	};

	useEffect(() => {
		if (guesses <= 0) {
			//reset all states
			clearLetterStates();

			setGameStage(stages[2].name);
		}
	}, [guesses]);

	//check win conditions
	useEffect(() => {
		const uniqueLetters = [...new Set(letters)];

		//win condition
		if (guessedLetters.length === uniqueLetters.length) {
			//add score
			setScore((actualScore) => (actualScore += 100));

			//restart game with new word
			startGame();
		}
	}, [guessedLetters, letters, startGame]);

	//restart the game
	const retry = () => {
		setScore(0);
		setGuesses(guessesQty);
		setGameStage(stages[0].name);
	};

	return (
		<div className="App">
			{gameStage === "start" && <StartScreen startGame={startGame} />}
			{gameStage === "game" && (
				<Game
					veriffyLetter={veriffyLetter}
					chooseWord={chooseWord}
					chooseCategory={chooseCategory}
					letters={letters}
					guessedLetters={guessedLetters}
					wrongLetters={wrongLetters}
					guesses={guesses}
					score={score}
				/>
			)}
			{gameStage === "end" && <End retry={retry} score={score} />}
		</div>
	);
}

export default App;
