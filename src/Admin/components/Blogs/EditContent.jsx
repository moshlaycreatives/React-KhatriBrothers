import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { DeleteForeverOutlined, Edit } from '@mui/icons-material';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { deleteContent, getBlogs } from '../../../../store/actions/blogsActions';
import EditAllContent from './EditAllContent';
import { Helmet } from 'react-helmet';

const EditContent = () => {
    const [openEdit, SetopenEdit] = useState(false)
    const [editData, setEditData] = useState('')
    const [blogs, setBlogs] = useState([])
    const { state } = useLocation()
    const dispatch = useDispatch()


    const handleOpenEdit = (data) => {
        SetopenEdit(true)
        setEditData(data)
    }

    const handleCloseEdit = () => {
        SetopenEdit(false)
        setEditData('')

    }
    // const getAllBlogs = async () => {
    //     try {
    //         const res = await dispatch(getBlogs())
    //         // if (res.data.payload && res.data.payload.length > 0) {
    //         // console.log(res.data?.payload[0], 'hiiiiiiii ')
    //         setBlogs(res.data?.payload[0]?.blog_contents)
    //         // }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     getAllBlogs()
    // }, [])

    const handleDelete = (val) => {
        confirmAlert({
            title: 'Delete?',
            message: `Are you sure to delete ?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const res = await dispatch(deleteContent(val.id))
                            alert(res.data.message)
                            // getAllBlogs()
                        } catch (err) {
                            console.error(err);
                        }
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
            <Helmet>
                <meta name="robots" content="noindex, nofollow"></meta>
            </Helmet>
            <Typography sx={{ fontSize: '50px', textAlign: 'center' }}>All Blog Contents</Typography>
            {state.blog_contents.map((blog, index) => (

                <Box key={index}>
                    <Typography sx={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: blog.title }} />
                    <Typography sx={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: blog.description }} />

                    <Box>

                        <Button variant='outlined' endIcon={<Edit />}
                            onClick={() => handleOpenEdit(blog)}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => handleDelete(blog)}
                            variant='contained'
                            color='secondary'
                            sx={{ ml: 2 }}
                            endIcon={<DeleteForeverOutlined />}
                        >
                            Delete
                        </Button>
                    </Box>
                    {/* {console.log(blog, 'blogs')} */}
                </Box>
            ))}

            {state.blog_contents.map((blog, index) => (

                <Box key={index}>

                    <Grid container>
                        {blog?.blog_content_images?.map((image, index) => (
                            <Grid key={index} item lg={image?.length === 1 ? 12 : 6}>
                                <Box sx={{ padding: '10px 20px' }}>
                                    <img
                                        key={index}
                                        src={`${import.meta.env.VITE_REACT_APP_URL}${image?.img}`}
                                        alt={image.link}
                                        style={{
                                            height: '70vh',
                                            width: '100%',
                                            objectFit: image?.length === 1 ? 'contain' : 'cover',
                                        }}
                                        loading="lazy"
                                    />
                                </Box>
                            </Grid>
                        ))}


                    </Grid>
                    <Box>
                        <Button variant='outlined' endIcon={<Edit />}
                            onClick={() => handleOpenEdit(blog)}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => handleDelete(blog)}
                            variant='contained'
                            color='secondary'
                            sx={{ ml: 2 }}
                            endIcon={<DeleteForeverOutlined />}
                        >
                            Delete
                        </Button>
                    </Box>
                    {/* {console.log(blog, 'blogs')} */}
                </Box>
            ))}


            <EditAllContent
                open={openEdit}
                close={handleCloseEdit}
                // createSuccess={getAllBlogs}
                data={editData}
            />
        </>
    )
}

export default EditContent
