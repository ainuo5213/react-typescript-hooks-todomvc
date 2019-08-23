import { State } from './todoStore/reducer'
import { Counter} from './counterReducer/reducer'
import {ALL_TODOS} from './constants';

export function combineReducers(reducers: any) {
    return function (state = {}, action: any) {
        return Object.keys(reducers).reduce((newState: any, key: string) => {
            newState[key] = reducers[key]((state as any)[key], action);
            return newState;
        }, {});
    }
}

export const TododefaultState: State = {
    nowShowing: ALL_TODOS,
    todos: [
        {
            id: 1, 
            title: 'sad2', 
            completed: false
        }
    ]
};

export const CountDefaultState: Counter = {
    count: 0
};
export const initialState = { Todo: TododefaultState, Count: CountDefaultState };