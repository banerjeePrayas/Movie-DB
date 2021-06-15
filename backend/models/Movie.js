import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    yearRelease: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
    },
    language: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
})



const Movie = mongoose.model('Movie', movieSchema);

export default Movie;