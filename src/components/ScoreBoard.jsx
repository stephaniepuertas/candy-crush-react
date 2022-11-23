const ScoreBoard =({score}) => {
    return (
        <div className="score-board">
            <h1 className="title">Welcome To QuirkyFruit</h1>
            <h2 className="score">Your Score is: {score}</h2>
        </div>
    )
}
export default ScoreBoard