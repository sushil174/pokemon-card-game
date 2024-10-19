export default function GameOver({onReset, win}) {
    return (

        <div>
            {win ? (
                <h2>You win !</h2>
            ) : (
                <h2>Game Over</h2>
            )}
            
            <button onClick={onReset}>Reset</button>
        </div>
    )
}