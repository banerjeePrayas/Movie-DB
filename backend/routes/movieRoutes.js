import express from 'express';
const router = express.Router();
import { getAllMovies, addNewMovie, updateMovie, getMovieById } from '../controllers/movieControllers.js';


router.route('/').get(getAllMovies).post(addNewMovie);
router.route('/:id').put(updateMovie).get(getMovieById);

export default router;