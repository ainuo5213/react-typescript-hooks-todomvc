import {
    ADD_TODOS,
    TOGGLE_COMPLETE,
    UPDATE_TODO,
    DESTROY_TODO,
    CLEAR_ALL_COMPLETED,
    FILTER_TODOS,
    TOGGLE_ALL
} from '../constants'

export interface Action {
    type: string,
    payload?: any
}

export interface TodoInterface {
    id: number,
    title: string,
    completed: boolean
}

export interface State {
    nowShowing: string,
    todos: TodoInterface[]
}

export const Todo = (state: State, action: Action): State => {
    switch (action.type) {
        case ADD_TODOS:
            return {...state, todos: [...state.todos, action.payload]};
        case TOGGLE_COMPLETE:
            return {
                ...state,
                todos: state.todos.map((todo: TodoInterface): TodoInterface => todo.id === action.payload ? {
                    ...todo,
                    completed: !todo.completed
                } : todo)
            };
        case DESTROY_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo: TodoInterface): boolean => todo.id !== action.payload)
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo: TodoInterface): TodoInterface => todo.id === action.payload.id ? {
                    ...todo,
                    title: action.payload.title
                } : todo)
            };
        case TOGGLE_ALL:
            const completedTodos: TodoInterface[] = state.todos.filter((todo: TodoInterface): boolean => todo.completed);
            // 只完成了一些，变成全部完成
            if (completedTodos.length >= 1 && completedTodos.length < state.todos.length) {
                return {
                    ...state,
                    todos: state.todos.map((todo: TodoInterface): TodoInterface => ({...todo, completed: true}))
                };
                // 全部完成了，变成全部未完成
            } else if (completedTodos.length === state.todos.length) {
                return {
                    ...state,
                    todos: state.todos.map((todo: TodoInterface): TodoInterface => ({...todo, completed: false}))
                }
            }
            // 没有一个完成，全部完成
            return {
                ...state,
                todos: state.todos.map((todo: TodoInterface): TodoInterface =>({...todo, completed: true}))
            };
        case FILTER_TODOS:
            return {
                ...state,
                nowShowing: action.payload
            };
        case CLEAR_ALL_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter((todo: TodoInterface): boolean => !todo.completed)
            };
        default:
            return state;
    }
};