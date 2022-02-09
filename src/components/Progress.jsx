import React from 'react';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';
import { Fade } from '@material-ui/core';

const theme = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles({
  root: {
    height: '4px',
    '&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)': {
      backgroundColor: '#f1ded4',
    },
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: '#f6ce95',
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#ed702d',
    },
    '& .MuiLinearProgress-dashedColorPrimary': {
      backgroundImage:
        'radial-gradient(#f6ce95 0%, #f6ce95 16%, transparent 42%)',
    },
  },
});

const Progress = (props) => {
  const classes = useStyles();
  return (
    <div style={{ ...props.style }}>
      <ThemeProvider theme={theme}>
        <Fade in={props.progress === 100 ? false : true}>
          <LinearProgress
            variant="determinate"
            valueBuffer={40}
            value={props.progress}
            color="primary"
            classes={{
              root: classes.root,
            }}
          />
        </Fade>
      </ThemeProvider>
    </div>
  );
};

export default Progress;
