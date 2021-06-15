import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MovieIcon from '@material-ui/icons/Movie';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    typo: {
      color: "white"
    }
  }));

const Header = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="relative">
          <Toolbar>
            <MovieIcon className={classes.icon} />
            <Typography variant="h6" color="white" className={classes.typo} noWrap>
              <RouterLink to='/'>Movie DB</RouterLink>
            </Typography>
          </Toolbar>
        </AppBar>
        </>
    )
}

export default Header
