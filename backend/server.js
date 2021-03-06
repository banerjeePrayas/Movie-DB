import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import movieRoutes from './routes/movieRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import videoUploadRoutes from './routes/videoUploadRoutes.js';

dotenv.config();

connectDB();

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_DEV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('API is Running.....');
// });


app.use('/api/movies', movieRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/video-upload', videoUploadRoutes);

// To Make uploads folder Static so that it's accsesible in Browser
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/videoUploads', express.static(path.join(__dirname, '/videoUploads')))


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is Running.....');
    });
}



const PORT = process.env.PORT || 8500;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_DEV} on Port ${PORT}`));
