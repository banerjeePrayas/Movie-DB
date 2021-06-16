import axios from 'axios'
import { 
    MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, MOVIE_UPDATE_REQUEST, 
    MOVIE_UPDATE_SUCCESS, MOVIE_UPDATE_FAIL, MOVIE_CREATE_REQUEST, MOVIE_CREATE_SUCCESS, MOVIE_CREATE_FAIL
 } from '../constants/movieConstants';


export const listMovies = () => async (dispatch) => {

    try {
        dispatch({ type: MOVIE_LIST_REQUEST })

        const { data } = await axios.get(`/api/movies`);
        console.log(data);

        dispatch({
            type: MOVIE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MOVIE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const addMovie = (movie) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MOVIE_CREATE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post(
        `/api/movies/`, movie, config
      )
  
      dispatch({
        type: MOVIE_CREATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: MOVIE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }




  export const updateMovie = (movie) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MOVIE_UPDATE_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.put(
        `/api/movies/${movie._id}`, movie, config
      )
  
      dispatch({
        type: MOVIE_UPDATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: MOVIE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
