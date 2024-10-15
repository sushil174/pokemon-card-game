import { useEffect, useState } from "react"
function Data({id}) {
    const [img, SetImg] = useState(null)

    async function getData() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            // if(!response.ok) {
            //     throw new Error('Network response not ok')
            // }
            const data = await response.json()
            SetImg(data.sprites.front_default)
        }
        catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    }, [id]);

    return (
        <div>
            {
                img ? (
                    <img src={img} alt="pokemon"/>
                ) :
                (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

export default Data