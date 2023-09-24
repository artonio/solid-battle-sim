import {PokemonItem} from "./App";
import {createEffect, createMemo, For, on, onMount} from "solid-js";
import {destructure} from "@solid-primitives/destructure";
import {selectedPokemonMetadata, setSelectedPokemonMetadata} from "./solid-store";
import {createStore} from "solid-js/store";

export type BattleProps = {
    pokemon1: PokemonItem,
    pokemon2: PokemonItem,
}

export const BattleTimeline = (props: BattleProps) => {

    const {
        pokemon1,
        pokemon2,
    } = destructure(props)

    // init cumulative speed
    let pokemon1CumulativeSpeed = 0;
    let pokemon2CumulativeSpeed = 0;

    const move1Memo = createMemo(() => selectedPokemonMetadata.left.url)
    const move2Memo = createMemo(() => selectedPokemonMetadata.right.url)

    const [pokemon1history, setPokemon1History] = createStore<string[]>([])
    const [pokemon2history, setPokemon2History] = createStore<string[]>([])

    // reset whenever pokemon changes
    createEffect(on([pokemon1, pokemon2, move1Memo, move2Memo], () => {
        setSelectedPokemonMetadata('left', 'hp', pokemon1().hp)
        setSelectedPokemonMetadata('right', 'hp', pokemon2().hp)
        setPokemon1History([])
        setPokemon2History([])
    }));

    // each round uses the speed stat to "charge" the attack, so the pokemon can perform the attack
    // once the attack is done the speed stat is exhausted and the pokemon must wait until it is charged again
    let i = 1;
    const doRound = () => {
        console.log(`Round ${i}`)
        // Increase the cumulative speed for each Pokémon
        pokemon1CumulativeSpeed += pokemon1().hp;
        pokemon2CumulativeSpeed += pokemon2().hp;
        // Determine who attacks based on cumulative speed
        if (pokemon1CumulativeSpeed >= pokemon2().speed) {
            doPokemon1Attack()
            pokemon1CumulativeSpeed -= pokemon2().speed
        }
        if (pokemon2CumulativeSpeed >= pokemon1().speed) {
            doPokemon2Attack()
            pokemon2CumulativeSpeed -= pokemon1().speed
        }

        if (selectedPokemonMetadata.left.hp <= 0) {
            alert(`${pokemon1().name} fainted! \r${pokemon2().name} at ${selectedPokemonMetadata.right.hp}/${pokemon2().hp} HP`)
        }
        if (selectedPokemonMetadata.right.hp <= 0) {
            alert(`${pokemon2().name} fainted! \r${pokemon1().name} at ${selectedPokemonMetadata.left.hp}/${pokemon1().hp} HP`)
        }
        i++;
    }

    const doBattle = () => {
        console.log('doBattle', selectedPokemonMetadata.left.hp, selectedPokemonMetadata.right.hp, selectedPokemonMetadata.left.power, selectedPokemonMetadata.right.power)
        while (selectedPokemonMetadata.left.hp > 0 && selectedPokemonMetadata.right.hp > 0) {
            doRound()
        }
    }

    const doPokemon1Attack = () => {
        const movePower = selectedPokemonMetadata.left.power / 12;
        const damage = Math.round((pokemon1().attack/pokemon2().defense) * movePower);
        setSelectedPokemonMetadata('left', 'hp', selectedPokemonMetadata.left.hp - damage)
        setPokemon1History((arg) => {
            const newArr = arg.slice();
            newArr.push(`${pokemon1().name} attacks ${pokemon2().name} for ${damage} damage!`)
            return newArr;
        })
        console.log(`${pokemon1().name} attacks ${pokemon2().name} for ${damage} damage!`)
        console.log(`${pokemon2().name} has ${selectedPokemonMetadata.right.hp}/${pokemon2().hp} HP left`)
    }

    const doPokemon2Attack = () => {
        const movePower = selectedPokemonMetadata.right.power / 12;
        const damage = Math.round((pokemon2().attack/pokemon1().defense) * movePower);
        setSelectedPokemonMetadata('right', 'hp', selectedPokemonMetadata.right.hp - damage)
        setPokemon2History((arg) => {
            const newArr = arg.slice();
            newArr.push(`${pokemon2().name} attacks ${pokemon1().name} for ${damage} damage!`)
            return newArr;
        })
        console.log(`${pokemon2().name} attacks ${pokemon1().name} for ${damage} damage!`)
        console.log(`${pokemon1().name} has ${selectedPokemonMetadata.left.hp}/${pokemon1().hp} HP left`)
    }

    return (
        <>
        <div class="relative top-[20px]">
            {pokemon1().name} vs {pokemon2().name}
            <div>
                <button
                    onClick={doBattle}
                    type="button"
                    class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Start battle
                </button>
            </div>
                <ol
                    class="relative border-l border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t w-[900px] top-[20px]">
                    <For each={pokemon1history}>{
                        item => <li>
                            <div class="flex-start flex items-center pt-2 md:block md:pt-0">
                                <div
                                    class="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
                                <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                                    {item}
                                </p>
                            </div>

                        </li>
                    }</For>

                </ol>
                <ol
                    class="relative border-l border-neutral-300 dark:border-neutral-500 md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t w-[900px] top-[50px]">
                    <For each={pokemon2history}>{
                        item => <li>
                            <div class="flex-start flex items-center pt-2 md:block md:pt-0">
                                <div
                                    class="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500 md:-mt-[5px] md:ml-0 md:mr-0"></div>
                                <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                                    {item}
                                </p>
                            </div>

                        </li>
                    }</For>

                </ol>

        </div>


        </>
    )
}
