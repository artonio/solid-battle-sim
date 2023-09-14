import {MoveItem} from "./App";


export async function getMove(id: string) {
    const response = await fetch(
        // https://pokeapi.co/api/v2/move/52/
        `https://pokeapi.co/api/v2/move/${id}`
    );
    const result = await response.json();
    const ret: MoveItem = {
        moveName: result.name,
        power: result.power
    }

    console.log('move: ', ret);
    return ret;
}
