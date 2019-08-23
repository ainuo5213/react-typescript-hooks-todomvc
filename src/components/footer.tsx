import React, {useContext} from 'react'
import {TodoInterface} from '../store/todoStore/reducer'
import {hooksContext} from '../store/store'
import {
    ALL_TODOS,
    ACTIVE_TODOS,
    COMPLETED_TODOS,
    FILTER_TODOS,
    CLEAR_ALL_COMPLETED
} from '../store/constants'

export default (): JSX.Element => {
    const {state, dispatch} = useContext(hooksContext);
    const {todos, nowShowing} = state.Todo;
    const activeTodoCount: number = todos.reduce((total: number, todo: TodoInterface): number => todo.completed ? total : total + 1, 0);
    const display: string = todos.length ? 'block' : 'none';
    const changeNowShowing: Function = (nowShowing: string): void => dispatch({
        type: FILTER_TODOS,
        payload: nowShowing
    });
    const clearAllCompleted = (): void => dispatch({type: CLEAR_ALL_COMPLETED});
    return (
        <footer className="footer" style={{display}}>
                <span className="todo-count">
                    <strong>{activeTodoCount}</strong> item{activeTodoCount === 1 ? '' : 's'} left
                </span>
            <ul className="filters">
                <li>
                    <span
                        className={nowShowing === ALL_TODOS ? 'selected' : ''}
                        onClick={(): void => {
                            changeNowShowing(ALL_TODOS)
                        }}
                    >All</span>
                </li>
                {' '}
                <li>
                    <span
                        className={nowShowing === ACTIVE_TODOS ? 'selected' : ''}
                        onClick={() => {
                            changeNowShowing(ACTIVE_TODOS)
                        }}
                    >Active</span>
                </li>
                {' '}
                <li>
                    <span
                        className={nowShowing === COMPLETED_TODOS ? 'selected' : ''}
                        onClick={() => {
                            changeNowShowing(COMPLETED_TODOS)
                        }}
                    >Completed</span>
                </li>
            </ul>

            <button
                className="clear-completed"
                onClick={clearAllCompleted}
            >
                Clear completed
            </button>
        </footer>
    )
}