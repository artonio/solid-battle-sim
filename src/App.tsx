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
    speed: number, // speed of pokemon
    move: Move[] // url to the pokemon's info
}

export type MoveItem = {
    name: string, // name of the move
    power: number, // power of the attack
}

const RedThing = () => <strong style="color: red">Red Thing</strong>;
const GreenThing = () => <strong style="color: green">Green Thing</strong>;
const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

const options = {
    red: RedThing,
    green: GreenThing,
    blue: BlueThing
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

  const onOptionClick = (e: any) => {
        console.log(e);
  }

const [selected, setSelected] = createSignal("red");



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

        <button  type="button"
                 class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={onBtnClick}>Catch Bulbasaur</button>
        <button onClick={() => refetch()}>Refetch</button>
        <div style={{width: '100px'}}>
            <select
                data-te-select-init
                data-te-select-filter="true"
                value={selected()}
                onChange={e => setSelected(e.currentTarget.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <For each={Object.keys(options)}>{
                    color => <option value={color}>{color}</option>
                }</For>
            </select>
            <div>{selected()}</div>
        </div>

    </div>
  );
}

export default App;
