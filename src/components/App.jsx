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
    const [level, setLevel] = useState(1)
    const [flip, setFlip] = useState(false)

    useEffect(() => {
        setFlip(false)
    },[pokemonList])

    function onClick(id) {
        setFlip(true)
        if(isGameOver || isLoading) return
        if(visited.includes(id)) {
            setIsGameOver(true)
            setLevel(1)
            setBestScore(updateBestScore(score,bestScore))
        }
        else {
            const newVisited = [...visited, id]
            setVisited(newVisited)
            setScore((prevScore) => prevScore + 1)
            
            setTimeout(() => {
                shuffleCards()
                setTimeout(() => {
                    setFlip(false)
                },200)
            },650)

            if(newVisited.length === pokemonList.length) {
                setIsGameOver(true)
                setWin(true)
                setLevel(prev => prev + 1)
                setBestScore(updateBestScore(score,bestScore))
            } 
        }
    }

    useEffect(() => {
        getPokemons()
        const storedBestScore = localStorage.getItem('BestScore')
        if(storedBestScore) {
            setBestScore(parseInt(storedBestScore, 10))
        }
    },[])
    
    async function getPokemons() {
        setIsLoading(true)
        const pokemonId = new Set()
        const limit = level * 3
        while(pokemonId.size < limit) {
            const randomId = Math.floor(Math.random() * 1010) + 1
            pokemonId.add(randomId)
        }
        const promises = Array.from(pokemonId).map(id => getPokemon(id))
        const data = await Promise.all(promises)
        setPokemonList(data.filter(pokemon => pokemon !== null))
        setIsLoading(false)
    }

    function shuffleCards() {
        setPokemonList((prevList) => shuffleArray(prevList))
    }

    function onReset() {
        setVisited([])
        if(!win) {
            setScore(0)
        }
        setIsGameOver(false)
        shuffleCards()
        setWin(false)
        getPokemons()
        setFlip(false)
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
                <p>Level : {level}</p>
            </div>
            {
                isGameOver ? (
                    <GameOver onReset={onReset} win={win}/>
                ) : (
                    <div className="card-container">
                        {pokemonList.map((pokemon) => (
                            <Card key={pokemon.id} pokemon={pokemon} onClick={onClick} flip={flip}/>
                        ))}
                    </div>
                )
            }
       </main>
    )

}