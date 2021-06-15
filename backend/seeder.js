import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieData from './data/movieData.js';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';


dotenv.config();

connectDB();

// Import Data into DB
const importData = async () => {
    try {
        // To delete all Past Data in DB
        await Movie.deleteMany();


        const createdMovieData = await Movie.insertMany(movieData);

        console.log('Data Imported');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

// Destroy Data into DB
const destroyData = async () => {
    try {
        // To delete all Past Data in DB
        await Movie.deleteMany();

        console.log('Data Destroyed');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}


if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}