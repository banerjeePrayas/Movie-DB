import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { listMovies, addMovie } from '../actions/movieActions'
import MovieCard from '../components/MovieCard'
import PaginationBar from '../components/Pagination'
import { MOVIE_CREATE_RESET } from '../constants/movieConstants'
import Loader from '../components/Loader';

  
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  
  

const Home = ({ history }) => {
    const classes = useStyles();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
      setLoading(false);
      }, 2000)
  }, []);

    const dispatch = useDispatch();

    // const movieList = useSelector((state) => state.movieList)
    // const { loading, error, movies } = movieList;

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState();

    const movieCreate = useSelector((state) => state.movieCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, movie: createdMovie } = movieCreate;
    useEffect(() => {
      // dispatch(listMovies());

      if(successCreate) {
            console.log('Created');
            dispatch({ type:MOVIE_CREATE_RESET })
            history.push(`/edit/${createdMovie._id}`)
        } else {
          fetch('/api/movies')
          .then((res) => res.json())
          .then((movies) => {
            setMovies(movies);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });

        }
    }, [createdMovie, dispatch, history, successCreate])

  //   const createProductHandler = () => {
  //     dispatch(addMovie());
  // }


  // Get Current movies
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost)

  // Chnage Page
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  // }
  const paginate = (event, value) => {
    setCurrentPage(value)
  }

  const setPerPage = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

    return (
        <React.Fragment>
        <CssBaseline />
        { loading ? ( <Loader /> ) : (
          <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Movies
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Get to Know about All Latest Movie Releases.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      <RouterLink style={{color: 'white', textDecoration: 'none'}} to="/add">
                    ADD MOVIE
                  </RouterLink>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
             
                <MovieCard movies={currentPosts} />
            </Grid>

          </Container>
          <PaginationBar postsPerPage={postsPerPage} totalPosts={movies.length} paginate={paginate} />
          {/* <PaginationBar totalPosts={movies.length} paginate={paginate} /> */}

        </main>
        ) }
        
        
      </React.Fragment>
    )
}

export default Home
