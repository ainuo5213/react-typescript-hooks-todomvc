import React, { createContext, useReducer, Context } from 'react';

export const hooksContext: Context<any> = createContext('context');



const Provider = hooksContext.Provider;

function combineReducers(reducers: any) {
    return function (state = {}, action: any) {
        return Object.keys(reducers).reduce((newState: any, key: string) => {
            newState[key] = reducers[key]((state as any)[key], action);
            return newState;
        }, {});
    }
}

export const withContext = (reducer: object | Function, initialState: object): Function => {
    let stateKeysLength: number = Object.keys(initialState).length;
    let reducerKeysLength: number = typeof reducer === 'function' ? 1 : Object.keys(reducer).length;
    if (stateKeysLength !== reducerKeysLength) {
        throw Error('The length of reducer is not equal the length of initialState')
    }
    let combinedReducer = combineReducers(reducer);
    return (InnerComp: React.FC | React.ComponentClass) => {
        return () => {
            const [state, dispatch] = useReducer<any>(combinedReducer, initialState);
            return (
                <Provider value={{ state, dispatch }}>
                    <InnerComp />
                </Provider>
            )
        }
    }
};