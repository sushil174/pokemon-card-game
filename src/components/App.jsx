import { useState,useEffect } from "react";
export default function App() {
    const [isGameOver, setIsGameOver] = useState(false)
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [bestScore, setBestScore] = useState(0)
    const [score, setScore] = useState(0)
    const [visited, setVisited] = useState([])

    function onClick(id) {
        if(isGameOver || isLoading) return
        if(visited.includes(id)) 
            setIsGameOver(true)
        else {
            setVisited([...visited, id])
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

}