import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact, getContact } from '../../../store/actions/blogsActions'
import { Delete } from '@mui/icons-material';
import { confirmAlert } from 'react-confirm-alert';
const User = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const [user, setUser] = useState()
    const getAllUser = () => {
        dispatch(getContact()).then((res) => {
            console.log(res.data.payload, 'hh')
            setUser(res.data.payload)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getAllUser()
    }, [])

    const handleDelete = (val) => {
        confirmAlert({
            title: 'Delete?',
            message: `Are you sure to delete ?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(deleteContact(val.id)).then((result) => {
                            alert(result.data.message)
                            getAllUser()
                        }).catch((err) => {
                            console.log(err)
                        });
                    }
                },
                {
                    label: 'No',
                }

            ]
        })


    }
    return (
        <>
            <Typography sx={{ fontSize: '30px', fontWeight: 600 }}>All User Data</Typography>
            <Grid container  >
                {user?.map((val, ind) => (
                    <Grid key={ind} lg={4} sx={{ marginTop: '20px' }} sm={12} xs={12} md={6}>
                        <Box sx={{ border: '1px solid gray', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px', padding: '20px', backgroundColor: 'transparent', color: 'gray', borderRadius: '10px', }}>
                            <Typography>Name: {val.name}</Typography>
                            <Typography>email: {val.email}</Typography>
                            <Typography>phone: {val.phone}</Typography>
                            <Typography>Message: {val.message}</Typography>
                            <Box>
                                <Button variant="contained" color="error" sx={{ mt: 2 }}
                                    endIcon={
                                        <Delete />
                                    }
                                    onClick={() => handleDelete(val)}
                                >
                                    Delete
                                </Button>
                            </Box>
                            <Typography>{val.created_at}</Typography>
                        </Box>


                    </Grid>
                ))}

            </Grid>

        </>
    )
}

export default User