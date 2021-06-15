import { 
    MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, MOVIE_UPDATE_REQUEST, MOVIE_UPDATE_SUCCESS, 
    MOVIE_UPDATE_FAIL, MOVIE_UPDATE_RESET, MOVIE_CREATE_REQUEST, MOVIE_CREATE_SUCCESS, 
    MOVIE_CREATE_FAIL, MOVIE_CREATE_RESET
 } from '../constants/movieConstants';



 export const movieListReducer = ( state = { movies: [] }, action ) => {

    switch (action.type) {
        case MOVIE_LIST_REQUEST:
            return { loading: true, movies: [] }
        
        case MOVIE_LIST_SUCCESS:
            return { loading: false, 
                movies: action.payload.movies, 
            }

        case MOVIE_LIST_FAIL:
            return { loading: false, error: action.payload }
    
        default:
            return state; 
    }

}


export const movieCreateReducer = ( state = {}, action ) => {

    switch (action.type) {
        case MOVIE_CREATE_REQUEST:
            return { loading: true }
        case MOVIE_CREATE_SUCCESS:
            return { loading: false, success: true, movie: action.payload }
        case MOVIE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case MOVIE_CREATE_RESET:
            return { state: {} }
        default:
            return state; 
    }

}



export const movieUpdateReducer = ( state = { movie: {} }, action ) => {

    switch (action.type) {
        case MOVIE_UPDATE_REQUEST:
            return { loading: true }
        case MOVIE_UPDATE_SUCCESS:
            return { loading: false, success: true, movie: action.payload }
        case MOVIE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case MOVIE_UPDATE_RESET:
            return { movie: {} }
        default:
            return state; 
    }

}