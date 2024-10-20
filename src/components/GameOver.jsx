import '../css/gameover.css'
export default function GameOver({onReset, win,score,bestScore,level}) {
    return (

        <div className='game-over'>
            <div>
                {win ? (
                    <h2>You win !</h2>
                ) : (
                    <h2>Game Over</h2>
                )}
                {!win && (
                    <div className='details'>
                        <li>Score : {score}</li>
                        <li>bestScore : {bestScore}</li>
                        <li>level : {level}</li>
                    </div>
                ) }
                <button onClick={onReset}>{win ? "Next Level" : "Play Again"}</button>
            </div>
        </div>
    )
}