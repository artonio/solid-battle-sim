import {Accessor, For, onMount, Resource, Setter} from "solid-js";
import {initTE, Select} from "tw-elements";
import {ResultItem} from "./App";

export type PokemonSelectProps = {
    data: Resource<ResultItem[]>,
    signal: Accessor<string>,
    signalSetter: Setter<string>,
}

export const PokemonSelect = (props: PokemonSelectProps) => {
    onMount(() => {
        initTE({ Select });
    });

    return (
        <select
            data-te-select-init
            data-te-select-filter="true"
            value={props.signal()}
            onChange={e => props.signalSetter(e.currentTarget.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <For each={props.data()}>{
                item => <option value={item.url}>{item.name}</option>
            }</For>
        </select>
    )
}
