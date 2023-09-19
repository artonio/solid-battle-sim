import {MoveItem, PokemonItem} from "./App";
import {createSignal} from "solid-js";
import {destructure} from "@solid-primitives/destructure";

export type BattleProps = {
    pokemon1: PokemonItem,
    pokemon2: PokemonItem,
    // move1: MoveItem,
    // move2: MoveItem,
}

export const BattleTimeline = (props: BattleProps) => {

    // current HP
    const [currentHP1, setCurrentHP1] = createSignal(props.pokemon1.hp);
    const [currentHP2, setCurrentHP2] = createSignal(props.pokemon2.hp);

    // init cumulative HP
    let pokemon1CumulativeSpeed = 0;
    let pokemon2CumulativeHP = 0;

    // each round uses the speed stat to "charge" the attack, so the pokemon can perform the attack
    // once the attack is done the speed stat is exhausted and the pokemon must wait until it is charged again
    const doRound = () => {
        // Increase the cumulative speed for each Pokémon
        pokemon1CumulativeSpeed += props.pokemon1.hp;
        pokemon2CumulativeHP += props.pokemon2.hp;

        // Determine who attacks based on cumulative speed
        if (pokemon1CumulativeSpeed >= props.pokemon2.speed) {
            doPokemon1Attack()
            pokemon1CumulativeSpeed -= props.pokemon2.speed
        }
        if (pokemon2CumulativeHP >= props.pokemon1.speed) {
            doPokemon2Attack()
            pokemon2CumulativeHP -= props.pokemon1.speed
        }

        if (currentHP1() <= 0) {
            alert(`${props.pokemon1.name} fainted!`)
        }
        if (currentHP2() <= 0) {
            alert(`${props.pokemon2.name} fainted!`)
        }
    }

    const doBattle = () => {
        while (currentHP1() > 0 && currentHP2() > 0) {
            doRound()
        }
    }

    const doPokemon1Attack = () => {
        const damage = (props.pokemon1.attack/props.pokemon2.defense) * 50;
        setCurrentHP2(currentHP2() - damage);
        console.log('{selectedLeft} attacks {selectedRight} for {damage} damage!')
    }

    const doPokemon2Attack = () => {
        const damage = (props.pokemon2.attack/props.pokemon1.defense) * 50;
        setCurrentHP1(currentHP1() - damage);
        console.log('{selectedRight} attacks {selectedLeft} for {damage} damage!')
    }

    return (
        <div>
            {props.pokemon1.name} vs {props.pokemon2.name}
            <button onClick={doBattle}>Start battle</button>
        </div>
    )
}
