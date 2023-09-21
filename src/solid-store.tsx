import {createStore} from "solid-js/store";
import { v4 as uuidv4 } from 'uuid';


// store with custom object with unique keys
export const [selectedMoveObject, setSelectedMoveObject] = createStore({
    left: {id: uuidv4(), url: "", power: 0},
    right: {id: uuidv4(), url: "", power: 0},
});

export const findKeyInObjectById = (object: any, id: any) => {
    // Get all the keys of the object.
    const keys = Object.keys(object);

    // Find the key that matches the given ID.
    const key = keys.find((key) => object[key].id === id);

    // Return the key, or undefined if no match is found.
    return key;
}
