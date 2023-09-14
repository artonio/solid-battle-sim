import logo from './logo.svg';
import styles from './App.module.css';
import {createResource, createSignal, Show} from "solid-js";
import {getAllPokemon} from "./GetAllPokemon";
import {getPokemon} from "./GetPokemon";
import {getMove} from "./GetMove";

// Result from get all Pokemon
export type ResultItem = {
  name: string, // name of pokemon
  url: string[] // url to the pokemon's info
}

export type Move = {
    name: string, // name of the move
    url: string // url to the move's info
}

export type PokemonItem = {
    sprite: string, // default sprite of pokemon
    hp: number, // hp of pokemon
    attack: number, // attack of pokemon
    speed: number, // speed of pokemon
    move: Move[] // url to the pokemon's info
}

export type MoveItem = {
    moveName: string, // name of the move
    power: number, // power of the attack
}

function App() {

  // get all pokemon
  const [allPokemon, setAllPokemon] = createSignal([]);
  const [data] = createResource(allPokemon, getAllPokemon);
  // get a specific pokemon
  const [bulbasaur, setBulbasaur] = createSignal({});
  const [dataBulbasaur] = createResource(bulbasaur, getPokemon);
  // function to select/catch a pokemon
  const caughtBalbasaur = () => getPokemon('bulbasaur');
  // get a move
  const [move, setMove] = createSignal({});
  const [dataMove] = createResource(move, getMove);
  // function to select a move
  const getMoveFunc = () => getMove('razor-wind');

  return (
    <div class={styles.App}>
      <Show when={!data.loading} fallback={<>Catching Pokemon...</>}>
        {JSON.stringify(data())}
      </Show>
    </div>
  );
}

export default App;
