import "./End.css";

const End = ({ retry, score }) => {
	return (
		<div>
			<h1>Fim de Jogo!</h1>
			<h2>
				A sua pontuação foi: <span>{score}</span>
			</h2>
			<button onClick={retry}>Recomeçar o Jogo</button>
		</div>
	);
};

export default End;
