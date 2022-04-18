import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import {  Box, Button, TextField  } from '@material-ui/core';
import { makeStyles,  createMuiTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import {storage} from "./firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection,  addDoc } from "firebase/firestore"; 
import {db} from "./firebase"
const theme = createMuiTheme({
    spacing: 4,
});

const useStyles = makeStyles({
    root: {
        background: '#FAF3EC',
        width: 'auto',
        position: 'absolute',
        // top: 'px',
        left: '600px',
        margin:'auto'
    },
    formImage : {
        boxShadow: '0 0 10px' ,
        backgroundColor: 'white',
        width: '500px',
        height: '500px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    divForm: {
        width: '90%',
    },

    
    image: {
        width: "90%",
        height: "35%",
        margin_left: "50px",
    },
    paperRoot: {
        maxWidth: 345,
    }

});

function Add() {
    const classes = useStyles();
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [check, setCheck] = useState(true);

    	const [selectedFile, setSelectedFile] = useState();
	const [url, setUrl] = useState();
  const navigate = useNavigate();  
  async function  handelclick() {
    const res =await addDoc(collection(db, "cities"), {
      name:name, 
      description:description,
      imageUrl:url});
      navigate("/view_all");
  }
  useEffect(()=>{
    if(selectedFile){
    const name= new Date().getTime() + "" +selectedFile?.name
    console.log('name+++++',name)
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    if(progress==100){
        setCheck(false)
    }
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        break;
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setUrl(downloadURL)
    });
  }
);
    }

  },[selectedFile])



const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
          let url = URL.createObjectURL(event.target.files[0]);
        setFile(url)
        console.log(url)
};

    return(
        <Box component="main"  className={classes.root} width="auto" height="auto">
            <Box className={classes.formImage}>


                <div className={classes.divForm}>

                    <h1 style={{ margin: 8 }}>
                        Add New Record
                    </h1>

                    <TextField
                        id="outlined-full-width"
                        label="Text"
                        style={{ margin: 8 }}
                        placeholder="Enter Text For Image waqas"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"

                        onChange={event => setName(event.target.value)}
                    />

                 <TextField
                        id="outlined-full-width"
                        label="Text"
                        style={{ margin: 8 }}
                        placeholder="Enter Text For Image junaid"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"

                        onChange={event => setDescription(event.target.value)}
                    />

                    <TextField
                        id="outlined-full-width"
                        label="Image Upload"
                        style={{ margin: 8 }}
                        name="upload-photo"
                        type="file"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={ changeHandler}
                    />
                    {
                        file.length > 0 &&

                        <Card className={classes.paperRoot}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    width="500"
                                    image={file}
                                    title="Contemplative Reptile"
                                />
                            </CardActionArea>
                         </Card>
                    }
                     <label htmlFor="raised-button-file">
                  <Button disabled={check} variant="contained" component="span" onClick={handelclick}>
                      Submit
                   </Button>
                     </label> 
                </div>

            </Box>
        </Box>
    )
}

export default Add;