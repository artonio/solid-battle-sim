import {PokemonItem} from "./App";

export async function getPokemon(query: string) {
    if (!query) {
        return null;
    }
    const response = await fetch(
        // https://pokeapi.co/api/v2/pokemon/5, full name or id
        `https://pokeapi.co/api/v2/pokemon/${query}`
    );
    const result = await response.json();
    let hp = 0;
    let attack = 0;
    let speed = 0;

    const stats = result.stats;
    for (let statObj of stats) {
        if (statObj.stat.name === "hp") {
            hp = statObj.base_stat;
        } else if (statObj.stat.name === "attack") {
            attack = statObj.base_stat;
        } else if (statObj.stat.name === "speed") {
            speed = statObj.base_stat;
        }
    }
    const ret: PokemonItem = {
        sprite: result.sprites.front_default,
        hp: hp,
        attack: attack,
        speed: speed,
        move: result.moves.map((moveObj: any) => {
            return {
                name: moveObj.move.name,
                url: moveObj.move.url
            }
        })
    }
    console.log('this pokemon: ', ret);
    return ret;
}
