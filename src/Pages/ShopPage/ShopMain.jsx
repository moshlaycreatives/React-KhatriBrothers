import React from 'react'
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import ProductCard from './ProductCard';

const ShopMain = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 30.2%, rgb(0,0, 0, 0.9) 90.9%),url(/banner1.jpeg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "none",
          height: "50vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            color: "white",
            minHeight: "50vh",
            display: "flex",
            textAlign: 'center',
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "@media(max-width:480px)": {
              paddingLeft: "2rem",
              paddingRight: "3rem",
            },
            "@media(min-width:481px) and (max-width:768px)": {
              paddingLeft: "10%",
              paddingRight: "10%",
            },
            "@media(min-width:769px) and (max-width:1024px)": {
              paddingLeft: "10%",
              paddingRight: "10%",
            },
          }}
        >
          <Box
            minHeight={"8rem"}
            sx={{
              "@media(max-width:480px)": {
                minHeight: "12rem",
              },
            }}
          >
            {/* <Typography
              variant="h3"
              fontSize={"2rem"}
              fontWeight={"550"}
              width="100%"
              paddingRight={'15%'}
              sx={{
                "@media(max-width:480px)": {
                  fontSize: "1.2rem",
                  width: "100%",
                  fontWeight: '600',
                  paddingLeft: '0%',
                  paddingRight: '0%',
                },
                "@media(min-width:480px) and (max-width:900px)": {
                  fontSize: "2rem",
                  width: "100%",
                  paddingLeft: '0%',
                  paddingRight: '0%',
                },
                "@media(min-width:901px) and (max-width:1024px)": {
                  fontSize: "2rem",
                  width: "100%",
                  paddingLeft: '0%',
                  paddingRight: '0%',
                },
              }}
            >
              Shop
            </Typography>
            <br />
            <Typography
              sx={{
                fontSize: "1.1rem",
                "@media(max-width:480px)": {
                  fontSize: "1rem",
                },
                "@media(min-width:4810px) and (max-width:900px)": {
                  fontSize: "1.2rem",
                },
              }}
            >
              Crafting your vision, one piece at a time
            </Typography> */}
          </Box>
        </Box>
      </Box>





<ProductCard/>

    </>
  );
}

export default ShopMain;
