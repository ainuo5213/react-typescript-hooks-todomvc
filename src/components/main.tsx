import React, {useContext, useRef, useEffect, useState} from 'react'
import {TodoInterface} from '../store/todoStore/reducer'
import {hooksContext} from '../store/store'
import {
    TOGGLE_COMPLETE,
    UPDATE_TODO,
    DESTROY_TODO,
    ENTER_KEY,
    ALL_TODOS,
    ACTIVE_TODOS,
    TOGGLE_ALL,
    COMPLETED_TODOS
} from '../store/constants'

const TodoItem = (props: any) => {
    const {dispatch} = useContext(hooksContext);
    const input: any = useRef(null);
    const todo:TodoInterface = props.todo;
    const [editingText, setEditingText] = useState<string>(todo.title);
    const [editing, setEditing] = useState<boolean>(false);
    let cls: string = (function (): string {
        let cls: string = '';
        if (todo.completed) {
            cls += ' completed'
        }
        if (editing) {
            cls += ' editing'
        }
        return cls
    })();
    const toggleComplete = ():void => {
        dispatch({
            type: TOGGLE_COMPLETE,
            payload: todo.id
        })
    };
    const handleEdit = (): void => {
        setEditing(true)
    };
    useEffect((): void => {
        if (editing) {
            input.current.focus()
        }
    });
    const handleChange = (): void => {
        setEditingText(input.current.value)
    };
    const handleBlur = (): void => {
        const text: string = editingText.trim();
        if (!text) {
            setEditingText(todo.title);
            setEditing(false);
        } else {
            dispatch({
                type: UPDATE_TODO,
                payload: {
                    id: todo.id,
                    title: text
                }
            });
            setEditing(false);
        }
    };
    const handleKeyDown = (e: any): void => {
        if (e.which === ENTER_KEY) {
            handleBlur()
        }
    } ;
    const handleDestroy = (): void => {
        dispatch({
            type: DESTROY_TODO,
            payload: todo.id
        });
    };
    return (
        <li className={cls}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={toggleComplete}
                />
                <label onDoubleClick={handleEdit}>{todo.title}</label>
                <button className="destroy" onClick={handleDestroy}/>
            </div>
            <input
                className="edit"
                value={editingText}
                ref={input}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        </li>
    )
};

export default () => {
    const {state, dispatch} = useContext(hooksContext);
    const {todos, nowShowing} = state.Todo;
    const activeTodos = todos.filter((todo: TodoInterface): boolean => !todo.completed);
    const mappedTodos = (function () {
        if (nowShowing === ALL_TODOS) {
            return todos
        } else if (nowShowing === ACTIVE_TODOS) {
            return todos.filter((todo: TodoInterface): boolean => !todo.completed)
        } else if (nowShowing === COMPLETED_TODOS) {
            return todos.filter((todo: TodoInterface): boolean => todo.completed)
        }
    })();
    const toggleAll = (): void => {
        dispatch({type:TOGGLE_ALL});
    };
    return (
        todos.length ?
            <div className="main">
                <input className="toggle-all" type="checkbox" onChange={toggleAll} checked={activeTodos.length === 0}/>
                <ul className="todo-list">
                    {
                        mappedTodos.map((todo: TodoInterface): JSX.Element => (
                            <TodoItem key={todo.id} todo={todo}/>
                        ))
                    }
                </ul>
            </div> : null
    )
}