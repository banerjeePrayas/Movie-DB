import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Video } from 'cloudinary-react';
import Typography from '@material-ui/core/Typography';

const VideoPlay = ({ match }) => {
    const movieId = match.params.id;
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState();
    const [video, setVideo] = useState('');

    useEffect(() => {
            fetch(`/api/movies/${movieId}`)
            .then((res) => res.json())
            .then((movie) => {
              setMovies(movie);
              console.log(movie.video);
              setVideo(movie.video);
              console.log(video);
            })
            .catch((err) => {
              setError(err);
            })
            // .finally(() => {
            //   setLoading(false);
            // });
      }, [movieId, video])
    return (
        <div>
            {/* <ReactPlayer width='100%' height='500px' controls cloudName="the-covid-ease" publicId={`https://res.cloudinary.com/the-covid-ease/video/upload/v1623869709/${video}`} /> */}
            
            {/* <Video cloudName="the-covid-ease" publicId='https://res.cloudinary.com/the-covid-ease/video/upload/v1623869709/movieDb/ycxbzmc3krfcswbbwzk4.mp4'> */}
              {/* <Transformation overlay="text:arial_60:watchme" gravity="north" y="20" /> */}
            {/* </Video> */}
            <video controls="true" width='100%' height='500px' style={{textAlign: 'center', margin: '0 auto'}}>
              <source src={`https://res.cloudinary.com/the-covid-ease/video/upload/v1623869709/${video}`} type="video/webm"></source>
              <source src={`https://res.cloudinary.com/the-covid-ease/video/upload/v1623869709/${video}`} type="video/mp4"></source>
              <source src={`https://res.cloudinary.com/the-covid-ease/video/upload/v1623869709/${video}`} type="video/ogg"></source>
            </video>
            <Typography gutterBottom variant="h3" component="h2" align="center">
                      {movies.movieName}
            </Typography>
            {/* <video controls width="250">

            <source src={video}
                    type="video/webm"></source>

            <source src={video}
                    type="video/mp4"></source>

            Sorry, your browser doesn't support embedded videos.
        </video> */}
        </div>
    )
}

export default VideoPlay
