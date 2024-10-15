import { useEffect, useState } from "react"
function Data({index, key}) {
    const [img, Setimg] = useState(null)

    async function gatData() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        const data = await response.json()
        return data.sprites.front_default;
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const image = await gatData();
                Setimg(image)
            } catch(err) {
                console.error(err)
            }
        }
        fetchData()
    }, []);

    return (
        <div key={key}>
            {
                img ? (
                    <img src={img} />
                ) :
                (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default Data