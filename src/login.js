import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase"
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Login=()=>{

    const paperStyle={padding :50,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  
  function change1(e){
    setEmail(e.target.value)
  }
  
  function change2(e){
    setPassword(e.target.value)
  }
  
  function submit(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("session", JSON.stringify(user));
      console.log(user)
      navigate("/view_all");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error',error.message)
      // ..
    });
  }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required onChange={change1}/><br></br><br></br>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={change2}/><br></br><br></br>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={submit}>Sign in</Button>
                </Paper>
        </Grid>
    )
}

export default Login