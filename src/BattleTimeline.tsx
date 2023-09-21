import {MoveItem, PokemonItem} from "./App";
import {createEffect, createMemo, createResource, createSignal, For, on, onMount} from "solid-js";
import {destructure} from "@solid-primitives/destructure";
import {getMove} from "./GetMove";
import {selectedMoveObject} from "./solid-store";
import {createStore} from "solid-js/store";

export type BattleProps = {
    pokemon1: PokemonItem,
    pokemon2: PokemonItem,
}




export const BattleTimeline = (props: BattleProps) => {

    onMount(() => {

    });

    const {
        pokemon1,
        pokemon2,
    } = destructure(props)

    // current HP
    const [currentHP1, setCurrentHP1] = createSignal(pokemon1().hp);
    const [currentHP2, setCurrentHP2] = createSignal(pokemon2().hp);
    // init cumulative speed
    let pokemon1CumulativeSpeed = 0;
    let pokemon2CumulativeSpeed = 0;

    const move1Memo = createMemo(() => selectedMoveObject.left.url)
    const move2Memo = createMemo(() => selectedMoveObject.right.url)
    //
    // // move data
    // const [move1Data] = createResource(move1Memo, getMove);
    // const [move2Data] = createResource(move2Memo, getMove);


    const [pokemon1history, setPokemon1History] = createStore<string[]>([])
    const [pokemon2history, setPokemon2History] = createStore<string[]>([])

    // reset whenever pokemon changes
    createEffect(on([pokemon1, pokemon2, move1Memo, move2Memo], () => {
        setCurrentHP1(pokemon1().hp)
        setCurrentHP2(pokemon2().hp)
    }))

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

        if (currentHP1() <= 0) {
            alert(`${pokemon1().name} fainted! \r${pokemon2().name} at ${currentHP2()}/${pokemon2().hp} HP`)
        }
        if (currentHP2() <= 0) {
            alert(`${pokemon2().name} fainted! \r${pokemon1().name} at ${currentHP1()}/${pokemon1().hp} HP`)
        }
        i++;
    }

    const doBattle = () => {
        // console.log('doBattle', currentHP1(), currentHP2(), move1Data()!.power, move2Data()!.power)
        console.log('doBattle', currentHP1(), currentHP2(), selectedMoveObject.left.power, selectedMoveObject.right.power)
        while (currentHP1() > 0 && currentHP2() > 0) {
            doRound()
        }
    }

    const doPokemon1Attack = () => {
        // const movePower = move1Data()!.power / 12;
        const movePower = selectedMoveObject.left.power / 12;
        const damage = Math.round((pokemon1().attack/pokemon2().defense) * movePower);
        setCurrentHP2(currentHP2() - damage);
        setPokemon1History((arg) => {
            const newArr = arg.slice();
            newArr.push(`${pokemon1().name} attacks ${pokemon2().name} for ${damage} damage!`)
            return newArr;
        })
        console.log(`${pokemon1().name} attacks ${pokemon2().name} for ${damage} damage!`)
        console.log(`${pokemon2().name} has ${currentHP2()}/${pokemon2().hp} HP left`)
    }

    const doPokemon2Attack = () => {
        const movePower = selectedMoveObject.right.power / 12;
        const damage = Math.round((pokemon2().attack/pokemon1().defense) * movePower);
        setCurrentHP1(currentHP1() - damage);
        setPokemon2History((arg) => {
            const newArr = arg.slice();
            newArr.push(`${pokemon2().name} attacks ${pokemon1().name} for ${damage} damage!`)
            return newArr;
        })
        console.log(`${pokemon2().name} attacks ${pokemon1().name} for ${damage} damage!`)
        console.log(`${pokemon1().name} has ${currentHP1()}/${pokemon1().hp} HP left`)
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
