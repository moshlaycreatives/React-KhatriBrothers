import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Login_Main from './Login/Login_Main';
import Signup_Main from './Signup/Signup_Main';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };



const Main = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
    <>


<Box

sx={{

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem 5%',
  flexDirection: 'column',
}}
>

<Box gap={2} sx={{marginTop:'1rem'}}>
<img src='/Logo Ok.png' alt='vector1' width={'50%'}/>

</Box>


<Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{width:'100%'}}>
    <Tab label="Login" />
    <Tab label="Signup" />
  </Tabs>
</Box>
<CustomTabPanel value={value} index={0}>



  <Login_Main/>



</CustomTabPanel>
<CustomTabPanel value={value} index={1}>

<Signup_Main/>

</CustomTabPanel>
</Box>

    </>
  )
}

export default Main