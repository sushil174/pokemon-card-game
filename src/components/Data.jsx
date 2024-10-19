export async function getPokemon(id) {
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

export function shuffleArray(cards) {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
}

export function updateBestScore(score, bestScore) {
    if(score > bestScore) {
        localStorage.setItem('BestScore',score);
        return score;
    }
    return bestScore;
}