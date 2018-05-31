import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import {LOCALSTORAGE_PREFIX, MOVE, SHUFFLE} from '../const/const';

const storage = store => next => action => {
    const state = store.getState();

    switch(action.type) {
        case MOVE:
            localStorage.setItem(`${LOCALSTORAGE_PREFIX}${state.step}`, JSON.stringify(state.fields));
            break;
        case SHUFFLE:
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