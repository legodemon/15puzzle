import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers'

const storage = store => next => action => {
    const state = store.getState();

    switch(action.type) {
        case 'MOVE':
            localStorage.setItem(`15puzzle_${state.step}`, JSON.stringify(state.fields));
            break;
        case 'SHUFFLE':
            localStorage.clear();
            break;
    }
    return next(action)
};

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(storage) );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}