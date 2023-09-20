import {createStore} from "solid-js/store";
import { v4 as uuidv4 } from 'uuid';

export const [selectedMove, setSelectedMove] = createStore([
    {id: uuidv4(), name: ""},
    {id: uuidv4(), name: ""}
]);
