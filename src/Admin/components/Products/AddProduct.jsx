// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import { addProduct } from '../../../store/actions/productActions';
// import { getAllCategories } from '../../../store/actions/categoriesActions';
// import { useDispatch } from 'react-redux';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const AddProduct = () => {
//     const dispatch = useDispatch();
//     const [editorHtml, setEditorHtml] = useState('');

//     const [productData, setProductData] = useState({
//         title: '',
//         category: '',
//         primaryCategoryId: '',
//         description: '',
//         contact: '',
//         price: '',
//         quantity: '',
//         address: '',
//         images: [], // Array to store uploaded images
//     });
//     const handleEditorChange = (html) => {
//         setEditorHtml(html);
//         setProductData({ ...productData, description: html });
//     };


//     const [categories, setCategories] = useState([]);
//     const getAllCategory = () => {
//         dispatch(getAllCategories()).then((res) => {
//             setCategories(res.data.data);
//         }).catch((err) => {
//             console.error(err);
//         });
//     };

//     useEffect(() => {
//         getAllCategory();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "category") {
//             const selectedCategory = categories.find(cat => cat.title === value);
//             if (selectedCategory) {
//                 setProductData({ ...productData, [name]: value, primaryCategoryId: selectedCategory.uid });
//             }
//         } else {
//             setProductData({ ...productData, [name]: value });
//         }
//     };

//     const handlePhoneChange = (value) => {
//         setProductData({ ...productData, contact: value });
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         setProductData({ ...productData, images: [file] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (
//             !productData.title ||
//             !productData.category ||
//             !productData.description ||
//             !productData.contact ||
//             !productData.price ||
//             !productData.address ||

//             !productData.quantity
//         ) {
//             console.error('Please fill out all required fields.');
//             return;
//         }

//         try {
//             // Create a new FormData object
//             const formData = new FormData();

//             // Append product data fields to FormData
//             formData.append('title', productData.title);
//             formData.append('primaryCategoryId', productData.primaryCategoryId);
//             formData.append('description', productData.description);
//             formData.append('contact', productData.contact);
//             formData.append('price', productData.price);
//             formData.append('quantity', productData.quantity);
//             formData.append('address', productData.address);


//             // Append the image file to FormData if it exists
//             if (productData.images && productData.images.length > 0) {
//                 formData.append('image', productData.images[0]); // Only the first image is appended
//             } else {
//                 console.error('Please provide an image.');
//                 return;
//             }

//             // Await the result of dispatch
//             const response = await dispatch(addProduct(formData));

//             if (response && response.data && response.data.message) {
//                 alert(response.data.message);
//             } else {
//                 console.error('Unexpected response format:', response);
//             }

//         } catch (error) {
//             console.error('There was an error adding the product:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
//                 <TextField
//                     fullWidth
//                     label="Title"
//                     id="title"
//                     name="title"
//                     value={productData.title}
//                     onChange={handleChange}
//                     sx={{ mb: 2 }}
//                 />
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField
//                         select
//                         labelId="category-label"
//                         id="category"
//                         name="category"
//                         value={productData.category}
//                         onChange={handleChange}
//                         SelectProps={{ native: true }}
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((category) => (
//                             <option key={category.uid} value={category.title}>
//                                 {category.title}
//                             </option>
//                         ))}
//                     </TextField>
//                 </FormControl>
//                 {/* <TextField
//                     fullWidth
//                     label="Description"
//                     id="description"
//                     name="description"
//                     multiline
//                     rows={4}
//                     value={productData.description}
//                     onChange={handleChange}
//                     sx={{ mb: 2 }}
//                 /> */}
//                 <ReactQuill
// placeholder='Description'
//     value={editorHtml}
// style={{marginBottom:'1rem'}}
//     onChange={handleEditorChange}
//     modules={{
//         toolbar: [
//             [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//             [{size: []}],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{'list': 'ordered'}, {'list': 'bullet'},
//              {'indent': '-1'}, {'indent': '+1'}],
//             ['link', 'image', 'video'],
//             ['clean']
//         ],
//     }}
//     formats={[
//         'header', 'font', 'size',
//         'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent',
//         'link', 'image', 'video'
//     ]}
// />

// <TextField
//                     fullWidth
//                     label="Address"
//                     id="address"
//                     name="address"
//                     multiline
//                     rows={4}
//                     value={productData.address}
//                     onChange={handleChange}
//                     sx={{ mb: 2 }}
//                 />

// <label>Phone</label>
//                 <PhoneInput
//                     country="US"
//                     label='Contact'
//                     name='contact'
//                     value={productData.contact}
//                     onChange={handlePhoneChange}
//                     sx={{ mb: 2 }}
//                 />
//                 <TextField
//                     fullWidth
//                     type="number"
//                     label="Price"
//                     id="price"
//                     name="price"
//                     value={productData.price}
//                     onChange={handleChange}
//                     sx={{ mb: 2, mt:2 }}
//                 />
//                 <TextField
//                     fullWidth
//                     type="number"
//                     label="Quantity"
//                     id="quantity"
//                     name="quantity"
//                     value={productData.quantity}
//                     onChange={handleChange}
//                     sx={{ mb: 2 }}
//                 />
//                 <input type="file" onChange={handleImageUpload} />
//                 <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//                     Submit
//                 </Button>
//             </Box>
//         </form>
//     );
// };

// export default AddProduct;



import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { addProduct } from '../../../store/actions/productActions';
import { getAllCategories } from '../../../store/actions/categoriesActions';
import { useDispatch } from 'react-redux';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [editorHtml, setEditorHtml] = useState('');

    const [productData, setProductData] = useState({
        title: '',
        category: '',
        primaryCategoryId: '',
        description: '',
        contact: '',
        price: '',
        quantity: '',
        address: '',
        images: [], // Array to store uploaded images
    });

    const handleEditorChange = (html) => {
        setEditorHtml(html);
        setProductData({ ...productData, description: html });
    };

    const [categories, setCategories] = useState([]);
    const getAllCategory = () => {
        dispatch(getAllCategories()).then((res) => {
            setCategories(res.data.data);
        }).catch((err) => {
            console.error(err);
        });
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "category") {
            const selectedCategory = categories.find(cat => cat.title === value);
            if (selectedCategory) {
                setProductData({ ...productData, [name]: value, primaryCategoryId: selectedCategory.uid });
            }
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const handlePhoneChange = (value) => {
        setProductData({ ...productData, contact: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setProductData({ ...productData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !productData.title ||
            !productData.category ||
            !productData.description ||
            !productData.contact ||
            !productData.price ||
            !productData.address ||
            !productData.quantity ||
            productData.images.length === 0
        ) {
            console.error('Please fill out all required fields.');
            return;
        }

        try {
            // Create a new FormData object
            const formData = new FormData();

            // Append product data fields to FormData
            formData.append('title', productData.title);
            formData.append('primaryCategoryId', productData.primaryCategoryId);
            formData.append('description', productData.description);
            formData.append('contact', productData.contact);
            formData.append('price', productData.price);
            formData.append('quantity', productData.quantity);
            formData.append('address', productData.address);

            // Append all image files to FormData
            productData.images.forEach((image, index) => {
                formData.append('images', image);
            });

            // Await the result of dispatch
            const response = await dispatch(addProduct(formData));

            if (response && response.data && response.data.message) {
                alert(response.data.message);
            } else {
                console.error('Unexpected response format:', response);
            }

        } catch (error) {
            console.error('There was an error adding the product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
                <TextField
                    fullWidth
                    label="Title"
                    id="title"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        SelectProps={{ native: true }}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.uid} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </TextField>
                </FormControl>
                <ReactQuill
                    placeholder="Description"
                    value={editorHtml}
                    style={{ marginBottom: '1rem' }}
                    onChange={handleEditorChange}
                    modules={{
                        toolbar: [
                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                            [{ size: [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' },
                            { 'indent': '-1' }, { 'indent': '+1' }],
                            ['link', 'image', 'video'],
                            ['clean']
                        ],
                    }}
                    formats={[
                        'header', 'font', 'size',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image', 'video'
                    ]}
                />
                <TextField
                    fullWidth
                    label="Address"
                    id="address"
                    name="address"
                    multiline
                    rows={4}
                    value={productData.address}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <label>Phone</label>
                <PhoneInput
                    country="US"
                    label="Contact"
                    name="contact"
                    value={productData.contact}
                    onChange={handlePhoneChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    sx={{ mb: 2, mt: 2 }}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    id="quantity"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <input type="file" multiple onChange={handleImageUpload} />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default AddProduct;
