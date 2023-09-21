import {MoveItem} from "./App";


export async function getMove(url: string) {
    console.log('getMove: ', url);
    if (url === "") {
        return null;
    }
    const response = await fetch(
        // https://pokeapi.co/api/v2/move/52/
        // `https://pokeapi.co/api/v2/move/${id}`
        url
    );
    const result = await response.json();
    const ret: MoveItem = {
        name: result.name,
        power: result.power
    }

    console.log('move: ', ret);
    return ret;
}
