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
    name: string, // name of the move
    power: number, // power of the attack
}

function App() {

  // get all pokemon
  const [allPokemon, setAllPokemon] = createSignal([]);
  const [data] = createResource(allPokemon, getAllPokemon);
  // get a specific pokemon

  const [pokemon, setPokemon] = createSignal('pikachu');

  const [dataPokemon] = createResource(pokemon, getPokemon);
  // get a move
  const [move, setMove] = createSignal('52');
  const [dataMove] = createResource(move, getMove);

  const onBtnClick = () => {
      setPokemon('bulbasaur');
  }



    return (
    <div class={styles.App}>
      {/*<Show when={!data.loading} fallback={<>Catching Pokemon...</>}>*/}
      {/*  {JSON.stringify(data())}*/}
      {/*</Show>*/}
        {
            dataPokemon.loading ? <p>Loading...</p> :
            dataPokemon.error ? <p>Error: {dataPokemon.error.message}</p> :
                // @ts-ignore
                dataPokemon() ? <p>{dataPokemon().hp}</p> : null
        }
        <div>
            {dataMove()?.name}
        </div>

        <button onClick={onBtnClick}>Catch Bulbasaur</button>

    </div>
  );
}

export default App;
