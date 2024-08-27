import { Avatar, Box, Button, Card, CircularProgress, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../store/actions/authActions';
import { useSnackbar } from 'notistack';
import Loader from '../../../components/Loader/Loader';


const ShowProfileData = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const base = 'http://16.171.98.198:4545';
  const userData = useSelector((state) => state?.auth?.user);

  // const profilePictureUrl = `${base}${userData.profilePicture.replace(/ /g, '%20')}`;
  const profilePictureUrl = userData.profilePicture
  ? `${base}${userData.profilePicture.replace(/ /g, '%20')}`
  : '';
  const initialValues = {
    firstName: '',
    lastName:'',
    email: '',
    phone: '',
    dob: '',
    whatsappNumber: '',
    address: '',
    profilePicture: null
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const userdata = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userdata) {
      setFormValues((prevState) => ({
        ...prevState,
        firstName: userdata.firstName || '',
        lastName: userdata.lastName || '',

        email: userdata.email || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { profilePicture, ...otherValues } = formValues;
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      Object.entries(otherValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await dispatch(updateProfile(formData));
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setLoading(false)
    } catch (error) {
      enqueueSnackbar("Error updating profile", { variant: "error" });
      setLoading(false)
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

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ padding: '2rem 3rem', width: isSmall ? '100%' : '50%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar
            src={selectedImage || profilePictureUrl}
            onClick={handleAvatarClick}
            sx={{ cursor: 'pointer' }}
          />
          <Typography>{formValues.name}</Typography>
        </Box>

        <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>First Name</Typography>
        <TextField
          name="firstName"
          placeholder="First Name"
          fullWidth
          size="small"
          sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
          value={formValues.firstName}
          onChange={handleChange}
          disabled={!isEditing} // Disable field if not editing
        />

<Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Last Name</Typography>
        <TextField
          name="lastName"
          placeholder="Last Name"
          fullWidth
          size="small"
          sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
          value={formValues.lastName}
          onChange={handleChange}
          disabled={!isEditing} // Disable field if not editing
        />

        <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Email</Typography>
        <TextField
          name="email"
          placeholder="Email"
          fullWidth
          size="small"
          sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
          value={formValues.email}
          disabled // Always disabled
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
          disabled={!isEditing} // Disable field if not editing
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
          disabled={!isEditing} // Disable field if not editing
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
          disabled={!isEditing} // Disable field if not editing
        />

        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: '400' }}>Address</Typography>
          <TextField
            name="address"
            placeholder="Address"
            fullWidth
            size="small"
            sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
            value={formValues.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Box>

        <Box sx={{ marginBottom: '.5rem' }}>

          <input
            type="file"
            name='profilePicture'
            inputProps={{ accept: 'image/*' }}
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </Box>

        <br />
    {loading ? (
<>
  <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
  <CircularProgress/>

  </Box>
</>
    ): (
      <Button variant='contained' fullWidth onClick={isEditing ? handleSubmit : handleEditClick}>
          {isEditing ? 'Submit' : 'Edit'}
        </Button>
    )}
      </Card>
    </Box>
  );
};

export default ShowProfileData;
