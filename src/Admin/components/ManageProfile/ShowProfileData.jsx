// import { Avatar, Box, Button, Card, TextField, Typography, Input } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateProfile } from '../../../store/actions/authActions';
// import { useSnackbar } from 'notistack';


// const ShowProfileData = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     dob: '',
//     whatsappNumber: '',
//     address: '',
//     profilePicture: ''

//   });
//   const [image, setImage] = useState(null);
//   const { enqueueSnackbar } = useSnackbar();

//   const userdata = useSelector((state) => state?.auth?.user);
// console.log(userdata, 'dataaaa')
//   const dispatch = useDispatch();

//   useEffect(() => {

//     if (userdata) {
//       setFormValues({
//         name: userdata.name || '',
//         email: userdata.email || '',
//         phone: userdata.phone || '',
//         dob: userdata.dob || '',
//         whatsappNumber: userdata.whatsappNumber || '',
//         address: userdata.address || ''

//       });
//     }
//   }, [userdata]);

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSubmit = () => {
//     const formData = new FormData();

//     // Append form values
//     Object.entries(formValues).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     // Append image if exists
//     if (image) {
//       formData.append('profilePicture', image);
//     }

//     // Dispatch formData to Redux action
//     dispatch(updateProfile(formData))

//     .then((res) => {

//         enqueueSnackbar(res.data.message, { variant: "success" });
//       })
//       .catch((err) => {
//         console.log(err, 'errorrrrrr');
//         enqueueSnackbar(err.response.data.message, { variant: "error" });
//       });


//     setIsEditing(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues(prevValues => ({
//       ...prevValues,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <Card sx={{ padding: '2rem 3rem', width: '50%' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <Avatar src={image ? URL.createObjectURL(image) : undefined} />
//           <Typography>{formValues.name}</Typography>
//         </Box>

//         {Object.entries({
//           Name: 'name',
//           Email: 'email',
//           Phone: 'phone',
//           'Date Of Birth': 'dob',
//           'Whatsapp Number': 'whatsappNumber',
//           Address: 'address'

//         }).map(([label, key]) => (
//           <Box sx={{ marginBottom: '.5rem' }} key={key}>
//             <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>{label}</Typography>
//             <TextField
//               placeholder={`Enter Your ${label}`}
//               fullWidth
//               size="small"
//               name={key}
//               value={formValues[key] || ''}
//               onChange={handleChange}
//               disabled={!isEditing}
//               sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
//             />
//           </Box>
//         ))}

//         <Box sx={{ marginBottom: '.5rem' }}>
//           <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Profile Picture</Typography>
//           <Input
//             type="file"
//             inputProps={{ accept: 'image/*' }}
//             onChange={handleImageChange}
//             disabled={!isEditing}
//           />
//         </Box>

//         <br />
//         <Button variant='contained' fullWidth onClick={isEditing ? handleSubmit : handleEditClick}>
//           {isEditing ? 'Submit' : 'Edit'}
//         </Button>
//       </Card>
//     </Box>
//   );
// };

// export default ShowProfileData;



import { Avatar, Box, Button, Card, TextField, Typography, Input } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../store/actions/authActions';
import { useSnackbar } from 'notistack';

const ShowProfileData = () => {
  const initialValues = {
    name: '',
    email: 'email@mail.com',
    phone: '',
    dob: '',
    whatsappNumber: '',
    address: '',
    profilePicture: null

  }

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  // const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const userdata = useSelector((state) => state?.auth?.user);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const imageUrlRef = useRef(null);

  // useEffect(() => {
  //   if (userdata) {
  //     setFormValues({
  //       name: userdata.name || '',
  //       email: userdata.email || '',
  //       phone: userdata.phone || '',
  //       dob: userdata.dob || '',
  //       whatsappNumber: userdata.whatsappNumber || '',
  //       address: userdata.address || '',

  //     });
  //   }
  // }, [userdata]);

  useEffect(() => {
    if (userdata) {
      setFormValues((prevState) => ({
        ...prevState,
    name: userdata.name || '',
        email: userdata.email || 'email@mail.com',
        phone: userdata.phone || '',
        dob: userdata.dob || '',
        whatsappNumber: userdata.whatsappNumber || '',
        address: userdata.address || '',
      }));
    }
  }, [userdata]);







  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { profilePicture, ...otherValues } = formValues;
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      console.log(profilePicture, 'ppppp')
      Object.entries(otherValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await dispatch(updateProfile(formData));
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setFormValues(initialValues);
    } catch (error) {
      enqueueSnackbar("Error updating profile", { variant: "error" });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };


  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePicture" && files.length > 0) {
      const selectedFile = files[0];

      setFormValues((prevValues) => ({
        ...prevValues,
        profilePicture: selectedFile,
      }));
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file, 'ddd')
  //   if (file) {
  //     setImage(file); // Set File object
  //   }
  // };

  // console.log(image, 'sdd')

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ padding: '2rem 3rem', width: '50%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar src={selectedImage} /> {/* Use the object URL */}
          <Typography>{formValues.name}</Typography>
        </Box>




        <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Name</Typography>
              <TextField
                name="name"
                placeholder="Name"
                fullWidth
              size="small"
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                value={formValues.name}
                onChange={handleChange}
              />


        <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Email</Typography>
              <TextField
                name="email"
                placeholder="Email"
                fullWidth
              size="small"
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                value={formValues.email}
                disabled
                onChange={handleChange}
              />

<Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Phone</Typography>
              <TextField
                name="phone"
                placeholder="Phone"
                fullWidth
              size="small"
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                value={formValues.phone}
                onChange={handleChange}
              />

<Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Date of Birth</Typography>
              <TextField
                name="dob"
                placeholder="Date of Birth"
                fullWidth
              size="small"
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                value={formValues.dob}
                onChange={handleChange}
              />

        <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Whatsapp Number</Typography>
              <TextField
                name="whatsappNumber"
                placeholder="Whatsapp Number"
                fullWidth
              size="small"
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
                value={formValues.whatsappNumber}
                onChange={handleChange}
              />

<Box sx={{marginBottom:'0.5rem'}}>
<Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Address</Typography>
              <TextField
                name="address"
                placeholder="Address"
               fullWidth
              size="small"
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}

                value={formValues.address}
                onChange={handleChange}
              />
              </Box>





        <Box sx={{ marginBottom: '.5rem' }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Profile Picture</Typography>
          <input
            type="file"
            name='profilePicture'

            inputProps={{ accept: 'image/*' }}
            onChange={handleImageChange}


                          // disabled={!isEditing}
          />
        </Box>

        <br />
        <Button variant='contained' fullWidth onClick={isEditing ? handleSubmit : handleEditClick}>
          {isEditing ? 'Submit' : 'Edit'}
        </Button>
      </Card>
    </Box>
  );
};

export default ShowProfileData;
