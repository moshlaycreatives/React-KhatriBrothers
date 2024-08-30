

import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const FAQHeroSection = () => {
  const theme  = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>

<Box
        sx={{
          padding:isSmall ? "6rem 10% 3rem 10% ": "5rem 10%",
          background: "linear-gradient(to bottom, #901953, #000000)",
        }}
      >
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" fontWeight="550" color="white">
              FAQ's
            </Typography>
            <Box>
              <Typography sx={{ color: "white" }}>
              Have questions about our services, pricing, or team? Find the answers you need here. If you can't find the information you're looking for, feel free to contact us directly. Our team is available to assist you with queries.

              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  mt: 4,
                  color: "#8d1851",
                  borderRadius: "0px",
                  padding: "0.8rem 2rem",
                  textTransform: "none",
                  fontSize: "0.8rem",
                }}
              >
                Start Learning
              </Button>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ padding: isSmall ? "2rem 0rem 0rem 0rem": "3rem" }}>
              <img src="/faqimage.png" alt="image" width={"100%"} />
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>
  )
}

export default FAQHeroSection