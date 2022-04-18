// import React from 'react'
// import { doc ,getDoc} from "firebase/firestore"; 
// import {db} from "./firebase"



// function ViewOne() {

    
// const handelFetch = async() => {
// const docRef = doc(db, "cities", "inlBHxpiyEVqn3E2JlsY4");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   console.log("No such document!");
// }

// };


//   return (
      
//        <>
//     <div>Fetch</div>
 
//     <button onClick={handelFetch}>fetch Data</button>

//       </>

//   )
// }

// export default ViewOne


import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { doc ,getDoc} from "firebase/firestore"; 
import {db} from "./firebase"
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1100,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ViewOne() {
    const [data,setData]=useState()
    let { id } = useParams();
  const classes = useStyles();
    
const handelFetch = async() => {
    const docRef = doc(db, "cities", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data())
    } else {
      console.log("No such document!");
    }
    
    };

    useEffect(()=>{
        if(id){
            handelFetch()

        }
    },[])
    

  return (
    <>{!data?<h1>Loading...</h1>:
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={data?data.imageUrl:""} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {data?data.name:""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {data?data.description:""}
                </Typography>
              </Grid>
            </Grid>
           
          </Grid>
        </Grid>
      </Paper>
    </div>
    }
    </>
  );
}
