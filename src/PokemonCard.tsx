import {PokemonItem} from "./App";
import {createEffect, createResource, createSignal, For, on, onMount} from "solid-js";
import {Select} from "tw-elements";
import {findKeyInObjectById, selectedMoveObject, setSelectedMoveObject} from "./solid-store";
import {getMove} from "./GetMove";

export type PokemonCardProps = {
    data: PokemonItem,
    id: string,
}

export const PokemonCard = (props: PokemonCardProps) => {

    const [id] = createSignal(props.id);

    const [val] = createSignal('')

    onMount(() => {
        const select = new Select(document.getElementById(id()));
    });

    const [moveUrl, setMoveUrl] = createSignal('')

    const [move] = createResource(moveUrl, getMove);


    createEffect(on([move], () => {
        if (move()) {
            const key = findKeyInObjectById(selectedMoveObject, props.id) as 'left' | 'right';
            setSelectedMoveObject(key, 'power', move()!.power)
        }
    }))


    const onMoveChange = (e: any) => {
        console.log('onMoveChange: ', e.currentTarget.value)

        const key = findKeyInObjectById(selectedMoveObject, props.id) as 'left' | 'right';
        setMoveUrl(e.currentTarget.value);
        setSelectedMoveObject(key, 'url', e.currentTarget.value)

        console.log('selectedMoveObject', selectedMoveObject)
    }

    return (
        <div
            class="block relative max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 top-[10px]">

            <div class="relative overflow-hidden bg-cover bg-no-repeat top-[10px]">
                <img
                    class="rounded-t-lg mx-auto"
                    src={props.data.sprite}
                    alt="" />
            </div>
            <div class="relative left-[10px] top-[10px]">
                Attack: <b>{props.data.attack}</b>
            </div>
            <div class="relative left-[10px] top-[10px]">
                Defense: <b>{props.data.defense}</b>
            </div>
            <div class="relative left-[10px] top-[10px]">
                Speed: <b>{props.data.speed}</b>
            </div>
            <div class="p-3 relative top-[10px]">
                <select
                    id={id()}
                    data-te-select-init
                    data-te-select-filter="true"
                    value={val()}
                    onChange={onMoveChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <For each={props.data.move}>{
                        item => <option value={item.url}>{item.name}</option>
                    }</For>
                </select>
            </div>
            <div class="relative left-[10px] top-[10px]">
                Move Power Rating: {move.latest ? move()!.power : 0}
            </div>
            <div class="p-3">
                <div class="w-full bg-neutral-200 dark:bg-neutral-600">
                    <div
                        class="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                        style="width: 100%">
                        {props.data.hp}/{props.data.hp}
                    </div>
                </div>
            </div>
        </div>
    )
}
