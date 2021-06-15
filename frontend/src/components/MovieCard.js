import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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
  }
}));

const MovieCard = ({movies}) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(movies);
  }, [movies])

    return (
        <>
          {movies.map( movie => (
                <Grid item key={movie._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <img src={movie.image} alt="Profile Pic" style={{width: '100%', height: "200px"}}></img>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.movieName}
                    </Typography>
                    <Typography>
                      YEAR: {movie.yearRelease}
                    </Typography>
                    <Typography>
                      Language: {movie.language}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    
                    <RouterLink style={{color: 'red', textDecoration: 'none', width: '100%'}} to={`/edit/${movie._id}`}>
                    <Button size="medium" color="primary" fullWidth>
                      EDIT
                    </Button>
                    </RouterLink>
                  </CardActions>
                </Card>
              </Grid>
          ))}
            
        </>
    )
}

export default MovieCard
