import styles from './App.module.css';
import {createResource, createSignal, Show} from "solid-js";
import {getAllPokemon} from "./GetAllPokemon";
import {getPokemon} from "./GetPokemon";
import {getMove} from "./GetMove";
import {PokemonCard} from "./PokemonCard";
import {PokemonSelect} from "./PokemonSelect";


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
    defense: number, // defense of pokemon
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

    const [selectedLeft, setSelectedLeft] = createSignal("");
    const [selectedRight, setSelectedRight] = createSignal("");

    const [leftPokemon] = createResource(selectedLeft, getPokemon);
    const [rightPokemon] = createResource(selectedRight, getPokemon);

  // get a move
  const [move, setMove] = createSignal('');
  const [dataMove] = createResource(move, getMove);

    return (
        <div class={styles.App}>
            <div class={styles.mainCenter}>
                <div class={styles.left}>
                    <PokemonSelect data={data} signal={selectedLeft} signalSetter={setSelectedLeft}/>
                    <Show when={leftPokemon.latest} fallback={<>Loading...</>}>
                        <PokemonCard {...leftPokemon()!}/>
                    </Show>

                </div>
                <div class={styles.right}>
                    <PokemonSelect data={data} signal={selectedRight} signalSetter={setSelectedRight}/>
                    <Show when={rightPokemon.latest} fallback={<>Loading...</>}>
                        <PokemonCard {...rightPokemon()!}/>
                    </Show>
                </div>
            </div>
        </div>
  );
}

export default App;
