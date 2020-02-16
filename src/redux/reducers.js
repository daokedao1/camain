import { combineReducers } from 'redux';

export const makeAllReducer = (asyncReducers) => combineReducers({
    ...asyncReducers
});

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeAllReducer(store.asyncReducers));
}

export const createReducer = (initialState, ACTION_HANDLES) => (
    (state = initialState, action) => {

        const handler = ACTION_HANDLES[action.type];
        console.log(handler)
        return handler ? handler(state, action) : state;
    }
);  
export let reducer=(state, action)=> {
    
    // 注册 ‘买苹果’ 事件
    // 如果有人买了苹果，加上顾客买的斤数，更新账本
    if (action.type === 'BUY_APPLE') {
      return Object.assign({}, state, {
        apple: state.apple + action.payload.count
      });
    }
    console.log(state)
    if(action.type==="dataList"){
     return   Object.assign({}, state, {
        dataList: action.dataList
      });
    }
    // 没注册的事件不作处理
    // 买咱们店里没有的东西，不更新账本，原样返回
    return state;
  }
