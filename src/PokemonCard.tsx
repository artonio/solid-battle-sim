import {findKeyById, PokemonItem} from "./App";
import {createSignal, For, onMount} from "solid-js";
import {Select} from "tw-elements";
import {
    findKeyInObjectBydId,
    selectedMove,
    selectedMoveObject,
    setSelectedMove,
    setSelectedMoveObject
} from "./solid-store";

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
    // const {
    //     sprite,
    //     name,
    //     hp,
    //     attack,
    //     defense,
    //     speed,
    //     move
    // } = destructure(props.data);


    const onMoveChange = (e: any) => {
        console.log('onMoveChange: ', e.currentTarget.value)
        console.log('selectedMove', selectedMove)

        const key = findKeyInObjectBydId(selectedMoveObject, props.id) as 'left' | 'right';

        setSelectedMoveObject(key, 'name', e.currentTarget.value)

        console.log('selectedMoveObject', selectedMoveObject)

        setSelectedMove((arg) => {
            // Cache the props.id value
            const id = props.id;

            // Find the index of the move to be selected
            const index = findKeyById(id);

            // Copy the arg array to a new array
            const newArr = arg.slice();

            // Update the selected move in the new array
            newArr[index] = { ...newArr[index], name: e.currentTarget.value };

            // Return the new array
            return newArr;
        })

        console.log('selectedMove', selectedMove)
        // props.signalSetter(e.currentTarget!.value)
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
