import {PokemonItem} from "./App";
import {onMount} from "solid-js";
import {initTE, Select} from "tw-elements";
import {destructure} from "@solid-primitives/destructure";

export const PokemonCard = (props: PokemonItem) => {
    const {sprite, hp, attack, defense, speed, move} = destructure(props);
    onMount(() => {
        initTE({ Select });
    });
    return (
        <div
            class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                    class="rounded-t-lg mx-auto"
                    src={sprite()}
                    alt="" />
            </div>
            <div class="p-6">
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
