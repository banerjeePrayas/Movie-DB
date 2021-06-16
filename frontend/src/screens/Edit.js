import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import MovieIcon from '@material-ui/icons/Movie';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { updateMovie } from '../actions/movieActions'
import { Form } from 'react-bootstrap'
import { MOVIE_UPDATE_RESET } from '../constants/movieConstants'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Progress from '../components/Progress';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    backgroundColor: "white"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Edit = ({ history, match }) => {
    const classes = useStyles();

    const movieId = match.params.id;

    const dispatch = useDispatch()

    const [movieName, setMovieName] = useState('')
    const [yearRelease, setYearRelease] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [language, setLanguage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)

    const movieUpdate = useSelector((state) => state.movieUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = movieUpdate
    let loading = false;


    // const [state, setState] = React.useState({
    //   age: ''
    // });
  
    // const handleChange = (event) => {
    //   const name = event.target.name;
    //   setState({
    //     ...state,
    //     [name]: event.target.value,
    //   });
    // };


    useEffect(() => {
      if(successUpdate) {
        setMessage('File Uploaded');
        dispatch({ type:MOVIE_UPDATE_RESET })
        history.push('/')
    } else {
        loading = true;
        fetch(`/api/movies/${movieId}`)   
        .then((res) => res.json())
        .then((movie) => {
            setMovieName(movie.movieName)
            setLanguage(movie.language)
            setImage(movie.image)
            setVideo(movie.video)
            setYearRelease(movie.yearRelease)
            loading= false;
        })
        
        .catch((err) => {
            console.log(err);
            setMessage('There was a problem with Server. Kindly try again Later')
        });
    }
    }, [dispatch, history, successUpdate])


    // const uploadFileHandler = async (e) => {
    //   const file = e.target.files[0]
    //   // console.log(file);
    //   const formData = new FormData()
    //   formData.append('image', file)
    //   setUploading(true)
  
    //   try {
    //     const config = {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       onUploadProgress: progressEvent => {
    //         setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
    //         // Clear Percentage
    //         setTimeout(() => setUploadPercentage(0), 10000);
    //       }
    //     }
  
    //     const { data } = await axios.post('/api/upload', formData, config)
    //     console.log(data);  
  
    //     setImage(data)
    //     setUploading(false)
    //   } catch (error) {
    //     console.error(error)
    //     setUploading(false)
    //   }
    // }


    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      // console.log(file);
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", "movieDb")
      setUploading(true)
  
      try {
        // const config = {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   onUploadProgress: progressEvent => {
        //     setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
        //     // Clear Percentage
        //     setTimeout(() => setUploadPercentage(0), 10000);
        //   }
        // }
  
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/the-covid-ease/image/upload', formData)
        console.log(data);  
  
        setImage(data.public_id)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
      }
    }



    // const uploadVideoHandler = async (e) => {
    //     const file = e.target.files[0]
    //     // console.log(file);
    //     const formData = new FormData()
    //     formData.append('video', file)
    //     setUploading(true)
    
    //     try {
    //       const config = {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //         onUploadProgress: progressEvent => {
    //           setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
    //           // Clear Percentage
    //           setTimeout(() => setUploadPercentage(0), 10000);
    //         }
    //       }
    
    //       const { data } = await axios.post('/api/video-upload', formData, config)
    //       console.log(data);  
    
    //       setVideo(data)
    //       setUploading(false)
    //     } catch (error) {
    //       console.error(error)
    //       setUploading(false)
    //     }
    //   }

    const uploadVideoHandler = async (e) => {
      const file = e.target.files[0]
      // console.log(file);
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", "movieDb")
      // setUploading(true)
      loading = true;

      try {
        setTimeout(() => {
          setUploading(true)
      }, 8000)
      const { data } = await axios.post('https://api.cloudinary.com/v1_1/the-covid-ease/video/upload', formData)
        console.log(data);  
  
        setVideo(data.public_id)
        setTimeout(() => {
        setUploading(false);
        loading = false;
      }, 5000)
      } catch (error) {
        console.error(error)
        setUploading(false)
        loading = false;
      }
    }
  

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateMovie({ _id: movieId, movieName, yearRelease, image, video, language }));
    }


  return (
    
    <Container component="main" maxWidth="lg">
      {/* { loadingUpdate && <Loader /> } */}
      { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
      <CssBaseline />
      { message ? <Message variant='danger'>{message}</Message> : null }
      { loading ? <Loader />  : (
        <div className={classes.paper}>
        <MovieIcon style={{ fontSize: 60 }} className={classes.icon}>
          {/* <LockOutlinedIcon /> */}
        </MovieIcon>
        <Typography component="h1" variant="h5">
          EDIT MOVIE
        </Typography>
        <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                <Form.Label>Movie Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='price'>
                <Form.Label>Year</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Year of Release'
                    value={yearRelease}
                    onChange={(e) => setYearRelease(e.target.value)}
                ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    type='file'
                    name='image'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  <Typography style={{color: 'red'}} variant="caption" display="block" gutterBottom>
                    *Only jpg|jpeg|png
                  </Typography>
                </Form.Group>
                  {uploading && <Loader />}

                <Form.Group controlId='video'>
                  <Form.Label>Trailer Video</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Video url'
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='video-file'
                    type='file'
                    name='video'
                    label='Choose File'
                    custom
                    onChange={uploadVideoHandler}
                  ></Form.File>
                  <Typography variant="caption" style={{color: 'red'}} display="block" gutterBottom>
                    *Only mp4|gif|mkv
                  </Typography>
                </Form.Group>
                  {uploading && <Loader />}

                <Form.Group controlId='brand'>
                <Form.Label>Language</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Language'
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                ></Form.Control>
                </Form.Group>
                <Progress percentage={uploadPercentage} />
                
                    <Button style={{margin: '0 2rem 0 0'}} type='submit' variant='primary'>
                    Update
                    </Button>
                    <a href='#'>
                      <RouterLink to='/'>Go Back</RouterLink>
                    </a>
                </Form>
      </div>
      ) }
      
      
    </Container>
  );
}

export default Edit