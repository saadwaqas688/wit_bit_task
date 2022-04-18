import { useEffect, useState } from 'react'
import { collection ,getDocs,deleteDoc,doc} from "firebase/firestore"; 
import {db} from "./firebase"
import { Link as RouterLink} from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewAll() {

  const [rows,setRows]=useState([])

  const handelDelete = async (id) => {
  await deleteDoc(doc(db, "cities", id));

  const result =rows.filter((item)=>item.id!=id)

  setRows(result)

  console.log('result++++',result)

};

  const handelFetch = async() => {
  let list=[];



const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  list.push({id:doc.id,...doc.data()})


  // console.log(doc.id, " => ", doc.data());
});

setRows(list)

};

useEffect(()=>{
  handelFetch()
},[])

  return (
    <>{rows.length==0?<h1>Loading....</h1>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.description.slice(0,20)+'...'}</StyledTableCell>
              <StyledTableCell align="right">
              <label htmlFor="raised-button-file">
              <Button variant="contained"  href={`/edit/${row.id}`} component={Link}>
      
               Edit
              </Button>
              </label> 
              </StyledTableCell>
              <StyledTableCell align="right">
              <label htmlFor="raised-button-file">
             <Button variant="contained" component="span" onClick={()=>{handelDelete(row.id)}}>
                   Delete
              </Button>
              </label> 
              </StyledTableCell>
              <StyledTableCell align="right">
                <RouterLink to={`/${row.id}`}>
                  <img   
                  style={{    
                   width: "50px",
                   height: "50px"
                   }} 
                   src={row.imageUrl}  
                   alt="complex"
                   />
                </RouterLink>

             </StyledTableCell>
            </StyledTableRow>
                   ))}
           </TableBody>
         </Table>
        </TableContainer>
}
    </>
  );
}
