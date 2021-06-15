import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { movieListReducer, movieCreateReducer, movieUpdateReducer } from './reducers/movieReducers'

const reducer = combineReducers({
    movieList: movieListReducer,
    movieCreate: movieCreateReducer,
    movieUpdate: movieUpdateReducer
})



const initialState = {
    
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;