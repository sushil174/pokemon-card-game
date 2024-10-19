import React from "react";
import '../css/card.css'
export default function Card({pokemon, onClick}) {
    return (
        <div className="card" onClick={() => onClick(pokemon.id)}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
        </div>
    )
}