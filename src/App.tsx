import logo from './logo.svg';
import styles from './App.module.css';
import {createResource, createSignal, onMount, Show} from "solid-js";
import {getAllPokemon} from "./GetAllPokemon";
import {getPokemon} from "./GetPokemon";
import {getMove} from "./GetMove";
import { Select, initTE } from "tw-elements";


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
    name: string, // name of the move
    power: number, // power of the attack
}

function App() {
    onMount(() => {
        initTE({ Select });
    });
  // get all pokemon
  const [allPokemon, setAllPokemon] = createSignal([]);
  const [data] = createResource(allPokemon, getAllPokemon);
  // get a specific pokemon

  const [pokemon, setPokemon] = createSignal('');

  const [dataPokemon, {refetch}] = createResource(pokemon, getPokemon);
  // get a move
  const [move, setMove] = createSignal('');
  const [dataMove] = createResource(move, getMove);

  const onBtnClick = () => {
      setPokemon('bulbasaur');
  }

    const options = ['Apple', 'Orange', 'Banana', 'Mango', 'Pear'];
    const [text, setText] = createSignal("");


    return (
    <div class={styles.App}>
      {/*<Show when={!data.loading} fallback={<>Catching Pokemon...</>}>*/}
      {/*  {JSON.stringify(data())}*/}
      {/*</Show>*/}
        {
            dataPokemon.loading ? <p>Loading...</p> :
            dataPokemon.error ? <p>Error: {dataPokemon.error.message}</p> :
            dataPokemon() ? <p>{dataPokemon()?.hp}</p> : null
        }
        <div>
            {dataMove()?.name}
        </div>

        <button onClick={onBtnClick}>Catch Bulbasaur</button>
        <button onClick={() => refetch()}>Refetch</button>

        <select data-te-select-init data-te-select-filter="true">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
        </select>

    </div>
  );
}

export default App;
