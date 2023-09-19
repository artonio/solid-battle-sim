import {MoveItem, PokemonItem} from "./App";
import {createEffect, createSignal, onMount} from "solid-js";
import {destructure} from "@solid-primitives/destructure";

export type BattleProps = {
    pokemon1: PokemonItem,
    pokemon2: PokemonItem,
    // move1: MoveItem,
    // move2: MoveItem,
}

export const BattleTimeline = (props: BattleProps) => {

    onMount(() => {
        // console.log('BattleTimeline props.pokemon1: ', pokemon1)
        // console.log('BattleTimeline props.pokemon2: ', pokemon2)
        // console.log('BattleTimeline props.pokemon1.hp: ', pokemon1.hp)
        // console.log('BattleTimeline props.pokemon2.hp: ', pokemon2.hp)
    });

    const {
        pokemon1,
        pokemon2,
    } = destructure(props)

    // current HP
    const [currentHP1, setCurrentHP1] = createSignal(pokemon1().hp);
    const [currentHP2, setCurrentHP2] = createSignal(pokemon2().hp);
    // init cumulative HP
    let pokemon1CumulativeSpeed = 0;
    let pokemon2CumulativeHP = 0;

    // reset whenever pokemon changes
    createEffect(() => {
        setCurrentHP1(pokemon1().hp)
        setCurrentHP2(pokemon2().hp)
    })

    // each round uses the speed stat to "charge" the attack, so the pokemon can perform the attack
    // once the attack is done the speed stat is exhausted and the pokemon must wait until it is charged again
    const doRound = () => {
        // Increase the cumulative speed for each Pokémon
        pokemon1CumulativeSpeed += pokemon1().hp;
        pokemon2CumulativeHP += pokemon2().hp;
        // Determine who attacks based on cumulative speed
        if (pokemon1CumulativeSpeed >= pokemon2().speed) {
            doPokemon1Attack()
            pokemon1CumulativeSpeed -= pokemon2().speed
        }
        if (pokemon2CumulativeHP >= pokemon1().speed) {
            doPokemon2Attack()
            pokemon2CumulativeHP -= pokemon1().speed
        }

        if (currentHP1() <= 0) {
            alert(`${pokemon1().name} fainted! \r${pokemon2().name} at ${currentHP2()}/${pokemon2().hp} HP`)
        }
        if (currentHP2() <= 0) {
            alert(`${pokemon2().name} fainted! \r${pokemon1().name} at ${currentHP1()}/${pokemon1().hp} HP`)
        }
    }

    const doBattle = () => {
        console.log('doBattle', currentHP1(), currentHP2())
        while (currentHP1() > 0 && currentHP2() > 0) {
            doRound()
        }
    }

    const doPokemon1Attack = () => {
        const damage = Math.round((pokemon1().attack/pokemon2().defense) * 5);
        setCurrentHP2(currentHP2() - damage);
        console.log(`${pokemon1().name} attacks ${pokemon2().name} for ${damage} damage!`)
        console.log(`${pokemon2().name} has ${currentHP2()}/${pokemon2().hp} HP left`)
    }

    const doPokemon2Attack = () => {
        const damage = Math.round((pokemon2().attack/pokemon1().defense) * 5);
        setCurrentHP1(currentHP1() - damage);
        console.log(`${pokemon2().name} attacks ${pokemon1().name} for ${damage} damage!`)
        console.log(`${pokemon1().name} has ${currentHP1()}/${pokemon1().hp} HP left`)
    }

    return (
        <>
        <div>
            {pokemon1().name} vs {pokemon2().name}
        </div>
        <div>
            <button onClick={doBattle}>Start battle</button>
        </div>
        </>
    )
}
