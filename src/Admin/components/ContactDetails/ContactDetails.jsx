import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllContacts } from '../../../store/actions/courseActions'
import Paper from '@mui/material/Paper';


const ContactDetails = () => {
    const theme = useTheme()
const dispatch = useDispatch()
const [details, setDetails] = useState([])
const fetchData = async () => {
    try {
        const res = await dispatch(getAllContacts());
setDetails(res.data.data)
        console.log('Contacts fetched successfully:', res);
    } catch (error) {

        console.error('Error fetching contacts:', error);
    }
};



useEffect(() => {

    fetchData();

}, [dispatch]);




    return (
    <>

<Typography
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "550",
          fontSize: "2rem",
        }}
      >
        Contact Details
      </Typography>


<br/>
      <Card sx={{padding:'2rem'}}>


      <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: 'grey' }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.email}</TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.phone}</TableCell>
                <TableCell sx={{ color: 'grey' }}>{row.message}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      </Card>







    </>
  )
}

export default ContactDetails