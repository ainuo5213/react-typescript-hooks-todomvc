import React from 'react'
import {withContext} from './store/store'
import {TododefaultState, CountDefaultState} from './store/reducer'
import {Todo} from './store/todoStore/reducer'
import {Count} from './store/counterReducer/reducer'
import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'
const App = () => {
    return (
        <div className="todoapp" >
            <Header/>
            <Main />
            <Footer />
        </div>
    )
};

export default withContext(
    {
        Todo, 
        Count
    },
    {
        Todo: TododefaultState, 
        Count: CountDefaultState
    })(App)