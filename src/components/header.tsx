import React, {useContext, useRef, useState} from 'react'
import {hooksContext} from '../store/store'
import {ADD_TODOS, ENTER_KEY} from '../store/constants'

export default () => {
    const {state, dispatch} = useContext(hooksContext);
    const input: any = useRef(null);
    const [text, setText] = useState<string>('');
    const handleChange = (): void => {
        setText(input.current.value)
    };
    const handleKeyDown = (e: any): void => {
        if (e.which !== ENTER_KEY) {
            return;
        }
        if (text) {
            dispatch({
                type: ADD_TODOS,
                payload: {
                    id: state.Todo.todos.length + 1,
                    title: text.trim(),
                    completed: false
                }
            });
            setText('')
        }
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                ref={input}
                value={text}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
        </header>
    )
}