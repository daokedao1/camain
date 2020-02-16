import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { makeAllReducer } from './reducers';

const enhancers = [];
//react - redux 数据监控 chrome 插件 存在 触发插件 不存在 无碍
if (window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development') {
    const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : f => f
    if (typeof reduxDevtools === 'function') {
        enhancers.push(reduxDevtools())
    }
}

export default (initialState = {}, initialReducer = {}) => {
    const middlewares = [thunk];

    const store = createStore(
        makeAllReducer(initialReducer),
        initialState,
        compose(
            applyMiddleware(...middlewares),
            ...enhancers
        )
    );

    store.asyncReducers = {
        ...initialReducer
    };

    return store;
}
