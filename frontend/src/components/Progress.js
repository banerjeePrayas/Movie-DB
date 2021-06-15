import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Progress = ({ percentage }) => {
    return (
        <Box display="flex" alignItems="center">
      <Box width={percentage} mr={1}>
        <LinearProgress variant="determinate" {...percentage} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          percentage)}%`}
        </Typography>
      </Box>
    </Box>
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default Progress
