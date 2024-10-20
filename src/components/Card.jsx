import React from "react";
import '../css/card.css'
export default function Card({pokemon, onClick,flip}) {
    return (
        <div className="scene">
            <div className={`card ${flip ? 'flipped' : ''}`}>
                <div className="front-face"  onClick={() => onClick(pokemon.id)}>
                    <div className="front-face-content">
                        <img src={pokemon.imageUrl} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                </div>
                <div className="back-face">
                    <img src="../src/assets/ball.png" alt="" />
                </div>
            </div>
        </div>
    )
}   