import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
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
              console.log(movie.movieName);
              setVideo(movie.video);
            })
            .catch((err) => {
              setError(err);
            })
            // .finally(() => {
            //   setLoading(false);
            // });
      }, [movieId])
    return (
        <div>
            <ReactPlayer width='100%' height='500px' controls url={video} />
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
