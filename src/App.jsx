import Data from "./Data"
function App() {

    let allPoke = []
    for(let i = 89; i < 100; i++) {
        allPoke.push(<Data index={i} key={i}/>)
    }
    return (
       <div>
        {
            allPoke.map(pok => pok)
        }
       </div>
    )
}
export default App