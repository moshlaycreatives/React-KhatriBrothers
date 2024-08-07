import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAdvanceCourse } from "../../store/actions/courseActions";
import { useDispatch, useSelector } from "react-redux";

const AdvanceCoursesCard = () => {
  const theme = useTheme();
  const filteredCourses = useSelector((state) =>
    state?.courses?.allCourses?.filter(course => course.courseType === 'advanced')
  );


  console.log(filteredCourses, 'advance cpursesss')
const navigate = useNavigate()

  const handleCardClick = (id) => {
    navigate(`/course-details/${id}`);
  };



  const base = 'https://wv9pfwh9-4545.inc1.devtunnels.ms'

  // const [advanceCourse, setAdvanceCourse] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAdvanceCourse())
  //     .then((res) => {

  //       setAdvanceCourse(res?.data?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, "errorrrrrrrrrr");
  //     });
  // }, [dispatch]);




  // console.log(advanceCourse, "advance coiurse home page");









  return (
    <>
      <Box sx={{ padding: "3rem 10%" }}>
        <Grid container>


{filteredCourses.map((val, ind)=>(
    <Grid key={ind} item lg={4} md={4} sm={12} xs={12} onClick={() => handleCardClick(val._id)}>
            <Box>
              <img src={`${base}${val.image.replace(/ /g, "%20")}`} alt="alt image" width={"80%"} />
            </Box>
            <Box>
              <Typography sx={{ color: "grey" }}>
{val.title}
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
                onClick={() => handleCardClick(val._id)}

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
