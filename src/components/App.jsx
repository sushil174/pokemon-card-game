import { useState,useEffect } from "react";
import Card from "./Card";
import GameOver from "./GameOver";
import LoadingScreen from "./Loading";
import { getPokemon, shuffleArray, updateBestScore } from "./Data";

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false)
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [bestScore, setBestScore] = useState(0)
    const [score, setScore] = useState(0)
    const [visited, setVisited] = useState([])
    const [win, setWin] = useState(false)

    function onClick(id) {
        if(isGameOver || isLoading) return
        if(visited.includes(id)) {
            setIsGameOver(true)
            setBestScore(updateBestScore(score,bestScore))
        }
        else {
            setVisited([...visited, id])
            setScore((prevScore) => prevScore + 1)
            checkWin()
            shuffleCards()
        }
    }
    function checkWin() {
        if(score === 10) {
            setWin(true)
            setIsGameOver(true)
        }
    }

    useEffect(() => {
        async function getPokemons() {
            const promises = Array.from({length:10}, () => {
                const randomId = Math.floor(Math.random() * 1010) + 1;
                return getPokemon(randomId)
            })
            const data = await Promise.all(promises)
            setPokemonList(data.filter(pokemon => pokemon !== null))
            setIsLoading(false)
        }
        const storedBestScore = localStorage.getItem('BestScore')
        if(storedBestScore) {
            setBestScore(parseInt(storedBestScore, 10))
        }
        getPokemons()
    },[])
    

    function shuffleCards() {
        setPokemonList((prevList) => shuffleArray(prevList))
    }

    function onReset() {
        setVisited([])
        setScore(0)
        setIsGameOver(false)
        shuffleCards()
        setWin(false)
    }

    if(isLoading) {
        return (
           <LoadingScreen />
        )
    }
    return (
       <main>
            <div>
                <p>Best Score : {bestScore}</p>
                <p>Score : {score}</p>
            </div>
            {
                isGameOver ? (
                    <GameOver onReset={onReset} win={win}/>
                ) : (
                    <div className="card-container">
                        {pokemonList.map((pokemon) => (
                            <Card key={pokemon.id} pokemon={pokemon} onClick={onClick} />
                        ))}
                    </div>
                )
            }
       </main>
    )

}