import { ResultItem } from './App';

export async function getAllPokemon() {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=1000`
    );
    const results = await response.json();
    const ret = results.results as ResultItem[];
    console.log('all pokemon ', ret);
    return ret;
}
