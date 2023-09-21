import {MoveItem, PokemonItem} from "./App";
import {createEffect, createMemo, createResource, createSignal, on, onMount} from "solid-js";
import {destructure} from "@solid-primitives/destructure";
import {getMove} from "./GetMove";
import {selectedMoveObject} from "./solid-store";

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

    // move data
    const [move1Data] = createResource(move1Memo, getMove);
    const [move2Data] = createResource(move2Memo, getMove);

    // reset whenever pokemon changes
    createEffect(on([pokemon1, pokemon2, move1Memo, move2Memo], () => {
        setCurrentHP1(pokemon1().hp)
        setCurrentHP2(pokemon2().hp)
    }))

    // each round uses the speed stat to "charge" the attack, so the pokemon can perform the attack
    // once the attack is done the speed stat is exhausted and the pokemon must wait until it is charged again
    const doRound = () => {
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
    }

    const doBattle = () => {
        console.log('doBattle', currentHP1(), currentHP2(), move1Data()!.power, move2Data()!.power)
        while (currentHP1() > 0 && currentHP2() > 0) {
            doRound()
        }
    }

    const doPokemon1Attack = () => {
        const movePower = move1Data()!.power / 12;
        const damage = Math.round((pokemon1().attack/pokemon2().defense) * movePower);
        setCurrentHP2(currentHP2() - damage);
        console.log(`${pokemon1().name} attacks ${pokemon2().name} for ${damage} damage!`)
        console.log(`${pokemon2().name} has ${currentHP2()}/${pokemon2().hp} HP left`)
    }

    const doPokemon2Attack = () => {
        const movePower = move2Data()!.power / 12;
        const damage = Math.round((pokemon2().attack/pokemon1().defense) * movePower);
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
