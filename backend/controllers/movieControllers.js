import asyncHandler from 'express-async-handler';   //Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import Movie from '../models/Movie.js';


// @desc      Get All Movie Names
// @route     GET  /api/movies
// @access    Public
const getAllMovies = asyncHandler (async (req, res) => {

    const movies = await Movie.find({}).sort({createdAt:-1});

    res.json(movies);
})


// @desc      Add New Movie
// @route     POST  /api/movies
// @access    Public
const addNewMovie = asyncHandler (async (req, res) => {

    const { movieName, yearRelease, image, video, language } = req.body;

    const movie = new Movie({
        movieName: movieName,
        yearRelease: yearRelease,
        image: image,
        video: video,
        language: language
    });

    const newMovie = await movie.save();

    res.status(201).json(newMovie);
})



// @desc      Update a Movie
// @route     PUT  /api/movies/:id
// @access    Public
const updateMovie = asyncHandler(async(req, res) => {

    const { movieName, yearRelease, image, video, language } = req.body;

    const movie = await Movie.findById(req.params.id);


    if(movie) {
        movie.movieName = movieName;
        movie.yearRelease = yearRelease;
        movie.image = image;
        movie.video = video;
        movie.language = language;

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } else {
        res.status(404);
        throw new Error('Movie Not Found');
    }
})



// @desc      Fetch Single Movie
// @route     GET  /api/movies/:id
// @access    Public
const getMovieById = asyncHandler(async(req, res) => {

    const movie = await Movie.findById(req.params.id)
    
    if(movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie Not Found' });
    }
})

export {
    getAllMovies, addNewMovie, updateMovie, getMovieById
}