function Score({score, highScore, gameOver}){
    return(
        <>
        <div className="scores">
            <h2>Score : {score}</h2>
            <h2>High Score : {highScore}</h2>
        </div>
        {gameOver && 
        <div className="win"><h2>YOU WON!!!</h2></div>
        }
        </>
    )
}

export { Score };