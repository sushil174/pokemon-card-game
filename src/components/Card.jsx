import React from "react";
import '../css/card.css'
import pokemonBall from '../assets/ball.png'
export default function Card({pokemon, onClick,flip}) {
    return (
        <div className="scene">
            <div className={`card ${flip ? 'flipped' : ''}`}>
                <div className="front-face"  onClick={() => onClick(pokemon.id)}>
                    <div className="front-face-content">
                        <img src={pokemon.imageUrl} alt={pokemon.name} />
                    </div>
                </div>
                <div className="back-face">
                    <img src={pokemonBall} alt=""/>
                </div>
            </div>
        </div>
    )


    //     return (
    //         <div className={`card ${flip ? 'flipped' : ''}`}>
    //             <div className="card-inner">
    //                 <div className="front-face"  onClick={() => onClick(pokemon.id)}>
    //                     <div className="front-face-content">
    //                         <img src={pokemon.imageUrl} alt={pokemon.name} />
    //                         <p>{pokemon.name}</p>
    //                     </div>
    //                 </div>
    //                 <div className="back-face">
    //                     <img src="../src/assets/ball.png" alt="" />
    //                 </div>
    //             </div>
    //         </div>
    // )
}   