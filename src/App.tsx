import styles from './App.module.css';
import {createResource, createSignal, Show} from "solid-js";
import {getAllPokemon} from "./GetAllPokemon";
import {getPokemon} from "./GetPokemon";
import {PokemonCard} from "./PokemonCard";
import {PokemonSelect} from "./PokemonSelect";
import {BattleTimeline} from "./BattleTimeline";
import {selectedMove} from "./solid-store";


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
    name: string, // name of pokemon
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


export const findKeyById = (id: string) => {
    return selectedMove.findIndex((item: { id: string; }) => item.id === id)
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
  // const [move, setMove] = createSignal('');
  // const [dataMove] = createResource(move, getMove);

  const [selectedMoveLeft, setSelectedMoveLeft] = createSignal("");
  const [selectedMoveRight, setSelectedMoveRight] = createSignal("");

    return (
        <div class={styles.App}>
            <div class={styles.mainCenter}>
                <div class={styles.left}>
                    <PokemonSelect data={data} signal={selectedLeft} signalSetter={setSelectedLeft}/>
                    <Show when={leftPokemon.latest} fallback={<>Loading...</>}>
                        <PokemonCard data={leftPokemon()!} id={selectedMove[0].id}/>
                    </Show>

                </div>
                <div class={styles.right}>
                    <PokemonSelect data={data} signal={selectedRight} signalSetter={setSelectedRight}/>
                    <Show when={rightPokemon.latest} fallback={<>Loading...</>}>
                        <PokemonCard data={rightPokemon()!} id={selectedMove[1].id}/>
                    </Show>
                </div>
            </div>
            <div>
                <Show when={leftPokemon.latest && rightPokemon.latest} fallback={<>Select Pokemon to battle...</>}>
                    <BattleTimeline pokemon1={leftPokemon()!} pokemon2={rightPokemon()!}
                        move1={selectedMoveLeft()} move2={selectedMoveRight()}/>
                </Show>
            </div>
            selectedMoveLeft: {selectedMove[0].name}
            <br></br>
            selectedMoveRight: {selectedMove[1].name}
        </div>
  );
}

export default App;
