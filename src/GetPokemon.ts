import {PokemonItem} from "./App";

interface StatObj {
    stat: {
        name: 'hp' | 'attack' | 'speed' | 'defense';
    };
    base_stat: number;
}

interface StatsMap {
    hp: number;
    attack: number;
    speed: number;
    defense: number;
}

export async function getPokemon(query: string) {
    if (!query) {
        return null;
    }

    const response = await fetch(query);
    const result = await response.json();
    const stats: any[] = result.stats;

    const initialStats: StatsMap = {
        hp: 0,
        attack: 0,
        speed: 0,
        defense: 0
    };

    // Use reduce to iterate over the stats array.
    // For each stat object, check if the stat name exists in our accumulator object (acc).
    // If it does, set the corresponding property in acc to the base_stat of the current statObj.
    // Finally, return the updated accumulator.
    const statsMap: StatsMap = stats.reduce((acc: StatsMap, statObj: StatObj) => {
        if (statObj.stat.name in acc) {
            acc[statObj.stat.name] = statObj.base_stat;
        }
        return acc;
    }, initialStats);

    const ret: PokemonItem = {
        sprite: result.sprites.front_default,
        hp: statsMap.hp,
        attack: statsMap.attack,
        speed: statsMap.speed,
        defense: statsMap.defense,
        move: result.moves.map((moveObj: any) => ({
            name: moveObj.move.name,
            url: moveObj.move.url
        }))
    }

    console.log('this pokemon: ', ret);
    return ret;
}
