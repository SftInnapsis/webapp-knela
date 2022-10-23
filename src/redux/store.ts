import { createStore, applyMiddleware} from 'redux';
import Reducers from './reducers/index';
// import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'

//const store = createStore(Reducers);
// const middleware = [thunk]

// const initalState = {

// }

// const store = createStore(Reducers, initalState, composeWithDevTools(applyMiddleware(...middleware)))
const store = createStore(Reducers);

export default store;
