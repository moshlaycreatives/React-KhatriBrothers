import { Button, Card, Typography, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  getSingleCourse } from "../../../../store/actions/courseActions";
import EditAdvanceCourse from "./EditBhajjanCourse";

const ViewBhajjanCourse = ({courseId}) => {
  const base = "https://zh0k2dcj-4545.euw.devtunnels.ms";

  console.log(courseId, 'dddddddddddddddddddd')
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const res = await dispatch(getSingleCourse(courseId));
        console.log(res.data.data, "hahahahhaaa");
        setCourseData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch advance courses:", err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if an error occurs
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
    // Add logic to navigate back to the courses list or handle the back action
  };
  console.log(isEditing, 'editinggggg')

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>


{isEditing ? (
        <>
          <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Courses
          </Button>
          <EditAdvanceCourse courseData={courseData}/>
        </>
      ) : (
        <Card sx={{ padding: "1rem", marginBottom: "1rem" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Name
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.title}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Overview
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.overview}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Prerequisites
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.prerequisites}
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Topics Covered
          </Typography>

          {courseData.topics.map((topic, index) => (
            <Typography key={index} sx={{ marginTop: "0.2rem", color: "grey" }}>
              {topic}
            </Typography>
          ))}


          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Indian Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          ₹ {courseData.indianPrice}

          </Typography>


          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            USA Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          $ {courseData.usaPrice}
          </Typography>




          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Canada Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          C$ {courseData.canadaPrice}
          </Typography>




          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          Australia Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          A$ {courseData.ukPrice}
          </Typography>




          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            UAE Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          د.إ {courseData.uaePrice}
          </Typography>



          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            UK Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          £ {courseData.ukPrice}
          </Typography>


          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Kenya Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          KSh {courseData.kenyaPrice}
          </Typography>



          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Uganda Price
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
          USh {courseData.ugandaPrice}
          </Typography>


          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Course Duration
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.courseDuration} weeks
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Lecture Duration
          </Typography>
          <Typography sx={{ marginTop: "0.2rem", color: "grey" }}>
            {courseData.lectureDuration} hour
          </Typography>

          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Image
          </Typography>

          <img
            src={`${base}${courseData.image.replace(/ /g, "%20")}`}
            alt={courseData.title}
            width={"20%"}
          />

          <br />
          <Button
            variant="contained"
            sx={{ borderRadius: "0px", width: "30%" }}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </Card>
      )}

    </>
  );
};

export default ViewBhajjanCourse;
