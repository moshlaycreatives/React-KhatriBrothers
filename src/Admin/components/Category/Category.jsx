import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Add } from '@mui/icons-material';
import { deletePrimaryCategory, getAllCategories, updatePrimaryCategory } from '../../../store/actions/categoriesActions';
import { Helmet } from 'react-helmet';
import AddCategory from './Component/AddCategory';
import { confirmAlert } from 'react-confirm-alert';

const initialValues = {
    name: "",
};

const Category = () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_URL;
    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [updateData, setUpdateData] = useState(initialValues);
    const [category, setCategory] = useState([]);
    const [formValues, setFormValues] = useState(initialValues);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormValues(initialValues); // Reset form values when closing
    };

    const handleCloseUpdate = () => {
        setUpdateOpen(false);
        setUpdateData(initialValues); // Reset update data when closing
    };

    const getAllCategory = () => {
        dispatch(getAllCategories()).then((res) => {
            setCategory(res.data.data);
        }).catch((err) => {
            console.error(err);
        });
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleDelete = (val) => {
        dispatch(deletePrimaryCategory(val.uid)).then((res) => {
            alert(res.data.message);
            getAllCategory();
        }).catch((err) => {
            console.error(err);
        });
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleUpdateFieldChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Your form submission logic here
    };

    const handleUpdateCategory = async (val) => {
        setUpdateData({ id: val.uid, name: val.title });
        setUpdateOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(updatePrimaryCategory(updateData)).then((res) => {
            alert(res.data.message);
            getAllCategory();
            handleCloseUpdate();
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <div>
            <Helmet>
                <meta name="robots" content="noindex, nofollow"></meta>
            </Helmet>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <Typography variant='h2' fontWeight="bold" mb={3} >
                    All Categories
                </Typography>
                <Button
                    onClick={handleOpen}
                    variant='outlined'
                    endIcon={
                        <Add />
                    }
                >
                    Add Category
                </Button>
            </Box>

            {/* Dialogue box for adding category */}
            <Dialog open={open} fullWidth onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add Category</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label="Add Category"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Dialogue box for updating category */}
            <Dialog open={updateOpen} fullWidth onClose={handleCloseUpdate}>
                <form onSubmit={handleUpdate}>
                    <DialogTitle>Update Category</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label="Category Name"
                                    name="name"
                                    value={updateData.name}
                                    onChange={handleUpdateFieldChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUpdate} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Grid container spacing={2}>
                {category?.map((val, ind) => (
                    <Grid item key={ind} xs={12} md={12} lg={12}>
                        <Box sx={{ height: '100%', mb:1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display:'flex', alignItems:'center' , justifyContent:'space-between'}}>
                                    <Typography variant="h4" mt={2} fontWeight="bold" sx={{fontSize:'1.3rem'}}>
                                        {val.title}
                                    </Typography>
<Box sx={{display:'flex'}}>
<Button variant="contained" color="error" onClick={() => handleDelete(val)}>
                                        Delete
                                    </Button>
                                    <Button sx={{marginLeft:'1rem'}} variant="contained" onClick={() => handleUpdateCategory(val)}>
                                        Edit
                                    </Button>
</Box>
                                </Box>


                            </Box>
                        </Box>
<Divider/>


                    </Grid>
                ))}
            </Grid>

            <AddCategory
                open={open}
                close={handleClose}
                createSuccess={getAllCategory}
            />
        </div>
    );
};

export default Category;
