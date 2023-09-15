import { Accessor, batch, Component, createEffect, createMemo, createSignal, For, JSX, on, Setter, Show } from 'solid-js';

export const Select: Component<{
    text: Accessor<string>,
    setText: Setter<string>,
    options: Array<string>
}> = (props) => {
    const [show, setShow] = createSignal(false);
    const [selected, setSelected] = createSignal(0);

    const filteredOptions = () => props.options.filter(el => el.toLowerCase().includes(props.text().toLowerCase()));

    const isVisible = createMemo(() => {
        return show() && (filteredOptions().length > 1 || filteredOptions()[0] !== props.text());
    });

    createEffect(on(props.text, () => {
        setSelected(0);
    }));

    const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
        props.setText(event.currentTarget.value);
    };

    const handleKeydown: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (event) => {
        if (event.code === 'ArrowUp') {
            setSelected(prev => prev === 0 ? (filteredOptions().length - 1) : prev - 1);
        } else if (event.code === 'ArrowDown') {
            setSelected(prev => prev + 1 === filteredOptions().length ? 0 : prev + 1);
        } else if (event.code === 'Enter') {
            props.setText(filteredOptions()[selected()]);
        };
    }

    return (
        <div>
            <input
                type="text"
                value={props.text()}
                onInput={handleInput}
                onKeyDown={handleKeydown}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
            />
            <Show when={isVisible()}>
                <ul style={`display: block; width: 100%; list-style: none; margin: 0; padding: 0`}>
                    <For each={filteredOptions()}>
                        {(item, i) => <li style={{ color: selected() === i() ? 'red': 'inherit'}}>{item}</li>}
                    </For>
                </ul>
            </Show>
        </div>
    );
};
