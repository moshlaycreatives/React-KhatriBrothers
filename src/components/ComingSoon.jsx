import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';

const ComingSoon = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1); // Set deadline to one month from now

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px 0',
  };

  const countdownItemStyle = {
    margin: '0 8px',
    minWidth: '60px',
    minHeight: '60px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    padding:'0.5rem 2rem',
    fontWeight: 'bold',
  };

  return (
    <div style={{ minHeight: '92vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '24px', textAlign: 'center',
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 30.2%, rgb(0,0, 0, 0.5) 90.9%),url(/banner1.jpeg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "none",



     }}>
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
          <Box>


          <Box>
            <img src="/Logo Ok.png" alt="Logo" width='5%' />

          </Box>
          <Typography variant="h2" gutterBottom sx={{color:'white', fontWeight:600}}>
             Ex Furniture

            </Typography>
          </Box>


          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{color:'white'}}>
              We are launching soon!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box style={countdownStyle}>
              <div style={countdownItemStyle}>
                <Typography>{countdown.days}</Typography>
                <Typography>Days</Typography>
              </div>
              <div style={countdownItemStyle}>
                <Typography>{countdown.hours}</Typography>
                <Typography>Hours</Typography>
              </div>
              <div style={countdownItemStyle}>
                <Typography>{countdown.minutes}</Typography>
                <Typography>Minutes</Typography>
              </div>
              <div style={countdownItemStyle}>
                <Typography>{countdown.seconds}</Typography>
                <Typography>Seconds</Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ComingSoon;
