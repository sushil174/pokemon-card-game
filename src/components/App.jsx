import { useState,useEffect } from "react";
import Card from "./Card";
import GameOver from "./GameOver";
export default function App() {
    const [isGameOver, setIsGameOver] = useState(false)
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [bestScore, setBestScore] = useState(0)
    const [score, setScore] = useState(0)
    const [visited, setVisited] = useState([])

    function onClick(id) {
        if(isGameOver || isLoading) return
        if(visited.includes(id)) {
            setIsGameOver(true)
            updateBestScore()
        }
        else {
            setVisited([...visited, id])
            setScore((prevScore) => prevScore + 1)
            shuffleCards()
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
    
    async function getPokemon(id) {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            if(!response.ok) {
                throw new Error('Network response not ok !')
            }
            const data = await response.json();
            return {id:id, name: data.name, imageUrl:data.sprites.front_default};
        }catch(err) {
            console.error(err)
            return null
        }
    }

    function shuffleCards() {
        setPokemonList((prevList) => {
            const shuffled = [...prevList];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
    }

    function updateBestScore() {
        if(score > bestScore) {
            setBestScore(score);
            localStorage.setItem('BestScore',score);
        }
    }

    function onReset() {
        setVisited([])
        setScore(0)
        setIsGameOver(false)
        shuffleCards()
    }

    if(isLoading) {
        return (
            <h2>Loading.....</h2>
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
                    <GameOver onReset={onReset} />
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