import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { UpdateContent } from '../../../../store/actions/blogsActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';

const EditAllContent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    // console.log(props)

    const [blogContent, setBlogContent] = useState({
        title: "",
        description: "",
        // imgs: [],
        // link: '',
    });


    useEffect(() => {

        setBlogContent({
            title: props.data.title,
            description: props.data.description,
            imgs: props.data.imgs,
            // link: props.data.link,
        })
    }, [props.data]);
    // console.log(blogContent, 'BBBBBBBBBBBBBBB')
    const handleTitleChange = (value) => {
        setBlogContent((prevValues) => ({
            ...prevValues,
            title: value,
        }));
    };

    const handleDescriptionChange = (value) => {
        setBlogContent((prevValues) => ({
            ...prevValues,
            description: value,
        }));
    };


    // const handleImageChange = (event) => {
    //     const files = event.target.files;
    //     setBlogContent((prevValues) => ({
    //         ...prevValues,
    //         imgs: files,
    //     }));
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            title: blogContent.title,
            description: blogContent.description,
            // imgs: blogContent.imgs,
        };
        dispatch(UpdateContent(props.data.id, body))
            .then((res) => {
                alert(res.data.message);
                navigate('/admin/dashboard');
                props.close();
                props.createSuccess();
            })
            .catch((err) => {
                console.error(err);
            });

    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'table', 'video',],
            ['clean']
        ],
    };
    { console.log(blogContent.title, 'this is title') }
    return (
        <div>
            <Helmet>
                <meta name="robots" content="noindex, nofollow"></meta>
            </Helmet>
            <Dialog open={props.open} fullWidth onClose={props.close}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit Blog Content</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={12}>
                                <ReactQuill
                                    value={blogContent.title}
                                    onChange={handleTitleChange}
                                    theme="snow"
                                    modules={modules}
                                />

                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <ReactQuill
                                    value={blogContent.description}
                                    onChange={handleDescriptionChange}
                                    theme="snow"
                                    modules={modules}
                                />
                            </Grid>
                            {/* <Grid item xs={12} lg={12}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                // alt=''
                                />
                            </Grid> */}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.close} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default EditAllContent;
