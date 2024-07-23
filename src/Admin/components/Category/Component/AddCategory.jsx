import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPrimaryCategory } from '../../../../store/actions/categoriesActions';
import { Helmet } from 'react-helmet';

const initialValues = {
    title: "",
};

const AddCategory = (props) => {
    const [formValues, setFormValues] = useState(initialValues);
    const dispatch = useDispatch();

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(addPrimaryCategory({ title: formValues.title }));
            alert(response.data.message);
            setFormValues(initialValues);
            props.close();
            props.createSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Dialog open={props.open} fullWidth onClose={props.close}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add Category</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Add Category"
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleFieldChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default AddCategory;
