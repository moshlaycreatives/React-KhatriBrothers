import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

const AdvanceCoursesCard = () => {
  const theme = useTheme();

  const advanceData = [
    {
        image:'advancecourse.png',
        desc:'Lorem ipsum dolor sit amet.',
    },
    {
        image:'advancecourse.png',
        desc:'Lorem ipsum dolor sit amet.',
    },{
        image:'advancecourse.png',
        desc:'Lorem ipsum dolor sit amet.',
    },
  ]


  return (
    <>
      <Box sx={{ padding: "3rem 10%" }}>
        <Grid container>


{advanceData.map((val, ind)=>(
    <Grid key={ind} item lg={4} md={4} sm={12} xs={12}>
            <Box>
              <img src={val.image} alt="alt image" width={"80%"} />
            </Box>
            <Box>
              <Typography sx={{ color: "grey" }}>
{val.desc}
              </Typography>
              <br/>
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.primary.main,
                  textTransform: "none",
                borderRadius:'0px',
                fontSize:'1.1rem'
                }}
              >
                Learn More &rarr;
              </Button>
            </Box>
          </Grid>
))}

        </Grid>
      </Box>
    </>
  );
};

export default AdvanceCoursesCard;
