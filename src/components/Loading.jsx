import '../css/loading.css'
import pokemonBall from '../assets/ball.png'
function LoadingScreen() {
    return (
        <div className="loading-screen">
            <img src={pokemonBall} alt=""/>
        </div>
    );
}

export default LoadingScreen;
