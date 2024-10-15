import Data from "./Data"
function App() {

    function getRandomSequence() {
        // Create an array with numbers from 1 to 10
        const arr = Array.from({ length: 10 }, (_, index) => index + 1);
    
        // Shuffle the array using the Fisher-Yates shuffle algorithm
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    
        return arr;
    }

    let allPoke = getRandomSequence()
    // for(let i = 89; i < 100; i++) {
    //     allPoke.push(<Data index={i} key={i}/>)
    // }
    return (
       <div>
        {
            allPoke.map((id,index) => (
                <Data key={index} id={id}/>
            ))
        }
       </div>
    )
}
export default App