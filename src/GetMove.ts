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
    let ret: MoveItem = {
        name: result.name,
        power: result.power
    }
    if (result.power === null) {
        alert(`${result.name} is a non-damaging move`);
        ret.power = 0;
    }
    console.log('move: ', ret);
    return ret;
}
