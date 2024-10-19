import React from "react";
import '../css/card.css'
export default function Card({pokemon, onClick,flip}) {
    return (
        <div className="scene">
            <div className={`card ${flip ? 'flipped' : ''}`}>
                <div className="front-face"  onClick={() => onClick(pokemon.id)}>
                    <img src={pokemon.imageUrl} alt={pokemon.name} />
                    <p>{pokemon.name}</p>
                </div>
                <div className="back-face">back</div>
            </div>
        </div>
    )
}   