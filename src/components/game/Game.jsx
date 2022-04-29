import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
	veriffyLetter,
	chooseWord,
	chooseCategory,
	letters,
	guessedLetters,
	wrongLetters,
	guesses,
	score,
}) => {
	const [letter, setletter] = useState("");
	const letterInputRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		veriffyLetter(letter);

		setletter("");

		letterInputRef.current.focus();
	};

	return (
		<div className="game">
			<p className="points">
				<span>Pontos: {score}</span>
			</p>
			<h1>Advinhe a palavra:</h1>
			<h3 className="tip">
				Dica sobre a palavra: <span>{chooseCategory}</span>
			</h3>
			<p>Você ainda tem {guesses} tentativa(s).</p>
			<div className="wordContainer">
				{letters.map((letter, i) =>
					guessedLetters.includes(letter) ? (
						<span key={i} className="letter">
							{letter}
						</span>
					) : (
						<span key={i} className="blankSquare"></span>
					)
				)}
			</div>
			<div className="letterContainer">
				<p>Tente advinhar uma letra da plavra: </p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="letter"
						maxLength="1"
						required
						onChange={(e) => setletter(e.target.value)}
						value={letter}
						ref={letterInputRef}
					/>
					<button>Jogar!</button>
				</form>
			</div>
			<div className="wrongLettersContainer">
				<p>Letras já utilizadas:</p>
				{wrongLetters.map((letter, i) => (
					<span key={i}>{letter}, </span>
				))}
			</div>
		</div>
	);
};

export default Game;
