import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import { Link } from 'react-router-dom';
import { Button, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    // gridTemplateColumns: 'repeat(12, 1fr)',
    // gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),

  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function CssGrid({...props}) {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={1}>
      <Grid item xs={3}>
          <Paper className={classes.paper}>
       
               <Button variant="contained"  href="/view_all" component={Link}>
      
                View All
               </Button>
             </Paper>
            <Paper className={classes.paper}>
             <Button variant="contained"  href="/add" component={Link}>
                 Add New
               </Button>
              </Paper>
        </Grid>
        <Grid item xs={9} className={classes.paper}>
          {props.children}
        </Grid>
        
      </Grid>
    </div>
  );
}
