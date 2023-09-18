import logo from './logo.svg';
import styles from './App.module.css';
import {createResource, createSignal, For, onMount, Show} from "solid-js";
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
    defense: number, // defense of pokemon
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
                    <select
                        data-te-select-init
                        data-te-select-filter="true"
                        value={selectedLeft()}
                        onChange={e => setSelectedLeft(e.currentTarget.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <For each={data()}>{
                            item => <option value={item.url}>{item.name}</option>
                        }</For>
                    </select>
                    {/*<div>{leftPokemon()?.hp}</div>*/}
                    <Show when={leftPokemon.latest} fallback={<>Loading...</>}>
                        <div
                            class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                                <img
                                    class="rounded-t-lg mx-auto"
                                    src={leftPokemon()?.sprite}
                                    alt="" />
                            </div>
                            <div class="p-6">
                                <div class="w-full bg-neutral-200 dark:bg-neutral-600">
                                    <div
                                        class="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                                        style="width: 100%">
                                        {leftPokemon()?.hp}/{leftPokemon()?.hp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Show>

                </div>
                <div class={styles.right}>
                    <select
                        data-te-select-init
                        data-te-select-filter="true"
                        value={selectedRight()}
                        onChange={e => setSelectedRight(e.currentTarget.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <For each={data()}>{
                            item => <option value={item.url}>{item.name}</option>
                        }</For>
                    </select>
                    {/*<div>{rightPokemon()?.hp}</div>*/}
                    <Show when={rightPokemon.latest} fallback={<>Loading...</>}>
                        <div
                            class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                                <img
                                    class="rounded-t-lg mx-auto"
                                    src={rightPokemon()?.sprite}
                                    alt="" />
                            </div>
                            <div class="p-6">
                                <div class="w-full bg-neutral-200 dark:bg-neutral-600">
                                    <div
                                        class="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                                        style="width: 100%">
                                        {rightPokemon()?.hp}/{rightPokemon()?.hp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
  );
}

export default App;
