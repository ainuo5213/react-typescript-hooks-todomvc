export interface Action {
    type: string,
    payload?: string
}

export interface Counter {
    count: number
}

export const Count = (state: Counter , action: Action): Counter => {
    switch (action.type) {
        default:
            return state;
    }
};