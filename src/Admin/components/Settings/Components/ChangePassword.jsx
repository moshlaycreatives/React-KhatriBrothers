import { Box, Button, Card, TextField, Typography, useTheme } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { changePassword } from '../../../../store/actions/authActions';

const ChangePassword = () => {
    const initialValues = {
        oldPassword: "",
        password: "",
        confirmPassword: "",

      };

      const { enqueueSnackbar } = useSnackbar();

      const theme = useTheme();
      const navigate = useNavigate();

      const dispatch = useDispatch();

      const [formValues, setFormValues] = useState(initialValues);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
      const handleLoginSubmit = (e) => {
        e.preventDefault();

        dispatch(changePassword(formValues))
          .then((res) => {
            enqueueSnackbar(res.data.message, { variant: "success" });

            // alert(res.data.message, 'response')
            setFormValues(initialValues);
            // navigate('/seller/dashboard')
          })
          .catch((err) => {
            enqueueSnackbar("Please enter valid email password", {
              variant: "error",
            });

            console.log(err);
          });
      };
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
Change Password
          </Typography>
</Box>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'75vh'}}>

            <Card sx={{boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",padding:'1rem', width:'45%', }}>

       <form onSubmit={handleLoginSubmit}>
       <Box>
            <Typography>Old Password</Typography>
            <TextField placeholder='Enter your old password' fullWidth size='small'


                      id="oldPassword"
                      name="oldPassword"
                      type="text"
                      value={formValues.oldPassword}
                      onChange={handleChange}


            />
        </Box>
        <br/>

        <Box>
            <Typography>New Password</Typography>
            <TextField placeholder='Enter your New password' fullWidth size='small'

id="password"
                      name="password"
                      type="text"
                      value={formValues.password}
                      onChange={handleChange}
            />
        </Box>
        <br/>

        <Box>
            <Typography>Re-Type Password</Typography>
            <TextField placeholder='Enter your re-type password' fullWidth size='small'

id="confirmPassword"
                      name="confirmPassword"
                      type="text"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
            />
        </Box>
        <br/>


        <Button variant='contained' type='submit' sx={{textTransform:'none', width:'100%', borderRadius:'0px', fontWeight:'400'}}> Save Password</Button>
       </form>

        </Card>
        </Box>
    </>
  )
}

export default ChangePassword