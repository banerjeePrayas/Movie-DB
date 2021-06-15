import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MovieIcon from '@material-ui/icons/Movie';
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <RouterLink color="inherit" href="https://www.linkedin.com/in/prayas-banerjee/">
          Prayas Banerjee
        </RouterLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      }
  }));

const Footer = () => {
    const classes = useStyles();

    return (
        <>
           {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Movie DB
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Assignment Purpose
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
        </>
    )
}

export default Footer
