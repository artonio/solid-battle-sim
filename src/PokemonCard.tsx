import {PokemonItem} from "./App";
import {createSignal, For, onMount} from "solid-js";
import {initTE, Select} from "tw-elements";
import {destructure} from "@solid-primitives/destructure";
import { v4 as uuidv4 } from 'uuid';

export const PokemonCard = (props: PokemonItem) => {

    const [id] = createSignal(uuidv4());

    onMount(() => {
        const select = new Select(document.getElementById(id()));
    });
    const {
        sprite,
        hp,
        attack,
        defense,
        speed,
        move
    } = destructure(props);

    const [selectedMove, setSelectedMove] = createSignal("");


    return (
        <div
            class="block relative max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 top-[10px]">

            <div class="relative overflow-hidden bg-cover bg-no-repeat top-[10px]">
                <img
                    class="rounded-t-lg mx-auto"
                    src={sprite()}
                    alt="" />
            </div>
            <div class="relative left-[10px] top-[10px]">
                Attack: <b>{attack()}</b>
            </div>
            <div class="relative left-[10px] top-[10px]">
                Defense: <b>{defense()}</b>
            </div>
            <div class="relative left-[10px] top-[10px]">
                Speed: <b>{speed()}</b>
            </div>
            <div class="p-3 relative top-[10px]">
                <select
                    id={id()}
                    data-te-select-init
                    data-te-select-filter="true"
                    value={selectedMove()}
                    onChange={e => setSelectedMove(e.currentTarget.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <For each={move()}>{
                        item => <option value={item.url}>{item.name}</option>
                    }</For>
                </select>
            </div>
            <div class="p-3">
                <div class="w-full bg-neutral-200 dark:bg-neutral-600">
                    <div
                        class="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                        style="width: 100%">
                        {hp()}/{hp()}
                    </div>
                </div>
            </div>
        </div>
    )
}
