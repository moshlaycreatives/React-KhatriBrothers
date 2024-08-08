import { useTheme } from '@emotion/react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";


const TermsConditionsMain = () => {
  const theme = useTheme()
  const rows =[
    {
        coursename:'Hindustani vocal advanced A series',
        teacher:'Faraz',
        date:'12-3-2024',
        time:'11AM -12AM',
        lecture:'01',
    },
    {
        coursename:'Hindustani vocal advanced A series',
        teacher:'Faraz',
        date:'12-3-2024',
        time:'11AM -12AM',
        lecture:'02',
    },
    {
        coursename:'Hindustani vocal advanced A series',
        teacher:'Faraz',
        date:'12-3-2024',
        time:'11AM -12AM',
        lecture:'03',
    },
    {
        coursename:'Hindustani vocal advanced A series',
        teacher:'Faraz',
        date:'12-3-2024',
        time:'11AM -12AM',
        lecture:'04',

    },
    {
        coursename:'Hindustani vocal advanced A series',
        teacher:'Faraz',
        date:'12-3-2024',
        time:'11AM -12AM',
        lecture:'05',
    },
  ]

    return (
    <>

<Box>


<Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "550",
            fontSize: "2rem",
          }}
        >
          Group Details
        </Typography>

<br/>



<TableContainer component={Paper} sx={{padding:'1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",}}>
      <Table sx={{ }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell >Student Name</TableCell>
            <TableCell >Course Type</TableCell>
            <TableCell >Gender</TableCell>
            <TableCell >Country</TableCell>
            <TableCell >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{color:'grey'}}>
                {row.coursename}
              </TableCell>
              <TableCell sx={{color:'grey'}}>{row.teacher}</TableCell>
              <TableCell sx={{color:'grey'}}>{row.date}</TableCell>
              <TableCell sx={{color:'grey'}}>{row.time}</TableCell>
              <TableCell sx={{color:'grey'}}>{row.lecture}</TableCell>
              <TableCell sx={{ }}>
                  <FaEye
                    style={{ fontSize: '1.5rem', cursor: 'pointer', color:theme.palette.primary.main, marginRight:'.5rem' }}
                    onClick={() => handleViewClick(row._id)} // Pass the course ID to the handler
                  />
                  <FaRegEdit style={{ fontSize: '1.5rem', cursor: 'pointer',color:'green', marginRight:'.5rem' }} />
                  <RiDeleteBin6Line style={{ fontSize: '1.5rem', cursor: 'pointer', color:'red' }}/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


</Box>



    </>
  )
}

export default TermsConditionsMain