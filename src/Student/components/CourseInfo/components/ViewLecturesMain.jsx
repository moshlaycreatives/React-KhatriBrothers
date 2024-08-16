import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudentClassDetails } from '../../../../store/actions/courseActions';
import { useDispatch } from 'react-redux';
import { CleaningServices } from '@mui/icons-material';

const ViewLecturesMain = ({ courseId }) => {
  const base = 'https://zh0k2dcj-4545.euw.devtunnels.ms';
  const theme = useTheme();
  const [playingIndex, setPlayingIndex] = useState(null);
  const [lectureData, setLectureData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  console.log(courseId, 'course id for instructore')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getAllStudentClassDetails(courseId));
        const data = res.data;

        setLectureData(data);
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
        setLoading(false)
      }finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, [courseId, dispatch]);

  // Function to normalize file path separators and check file extension
  const normalizePath = (path) => path.replace(/\\/g, '/');
  const isPDF = (url) => normalizePath(url).endsWith('.pdf');
  const isVideo = (url) => normalizePath(url).endsWith('.mp4');






  const encodeSpacesAndSpecialChars = (str) => {
    // Ensure str is a string
    const stringifiedStr = String(str);
    // Replace spaces with '%20' and backslashes with '/'
    return stringifiedStr
      .replace(/ /g, '%20')    // Replace spaces with '%20'
      .replace(/\\/g, '/');    // Replace backslashes with '/'
  };

  const handleVideoClick = (index) => {
    setPlayingIndex(index === playingIndex ? null : index);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  // Separate PDFs and videos from lectureData
  const pdfFiles = lectureData.flatMap(item => item.classContent.filter(isPDF));
  const videoFiles = lectureData.flatMap(item => item.classContent.filter(isVideo));




  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  return (
    <>
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "550",
          fontSize: "2rem",
        }}
      >
        Course Details
      </Typography>

      <Card sx={{ padding: '2rem' }}>
        {/* {lectureData.map((val, ind) => (

        ))} */}


        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography sx={{fontWeight:600}}>Course Name</Typography>
              <br/>
              <Typography>{lectureData[0].courseId.title}</Typography>
            </Box>
            <br/>
            <Box>

              <Typography sx={{fontWeight:600}}>Course Fee</Typography>
              <Typography>

              {lectureData[0].courseId.indianPrice}
              </Typography>
            </Box>
            <br/>
            <Box>
              <Typography sx={{fontWeight:600}}>Duration</Typography>
              <Typography>

              {/* {val.courseId.courseDuration} */}

              {lectureData[0].courseId.courseDuration}
              </Typography>
            </Box>


            <Box>
              <Typography sx={{fontWeight:600}}></Typography>
              <Typography>

              {/* {val.courseId.courseDuration} */}

              </Typography>
            </Box>
          </Box>

        <br />
        <br />

        <Typography sx={{fontWeight:600, fontSize:'1.1rem', mb:1}}>PDFs</Typography>
        <Box>
          <Grid container spacing={2}>
            {pdfFiles.map((pdfFile, index) => {


              const fileName = pdfFile.split('/').pop(); // Gets the full file name with timestamp

// Remove the timestamp part from the file name
// Assuming the timestamp part ends with "-",
// split by "-" and join from the second element onward
const [dateTimePrefix, ...nameParts] = fileName.split('-');
const fileNameWithoutDate = nameParts.join('-');

// Remove the extra characters after the file name (if necessary)
const cleanFileName = fileNameWithoutDate.replace(/.*T\d+.*Z-/, '');




              const encodedFileName = encodeSpacesAndSpecialChars(pdfFile);
              const fullUrl = `${base}${encodedFileName}`;
              return (
                <Grid item xs={12} sm={4} key={index}>
                  <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 30, height: 40, marginLeft: '1rem' }}
                      image="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                      alt="PDF icon"
                    />
                    <CardContent>
                    <Typography variant="body1">
      {cleanFileName}
    </Typography>
<br/>
                      <Link to={fullUrl} variant="body2" color="secondary" style={{textDecoration:'none', color:theme.palette.primary.main, fontWeight:600}}>
                        Download File
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <br />

        <Typography sx={{fontWeight:600, fontSize:'1.1rem', mb:1}}>Video Lectures</Typography>
        <Grid container spacing={2}>
          {videoFiles.map((videoFile, index) => {


            const fileName = videoFile.split('/').pop(); // Gets the full file name with timestamp

// Remove the timestamp part from the file name
// Assuming the timestamp part ends with "-",
// split by "-" and join from the second element onward
const [dateTimePrefix, ...nameParts] = fileName.split('-');
const fileNameWithoutDate = nameParts.join('-');

// Remove the extra characters after the file name (if necessary)
const cleanFileName = fileNameWithoutDate.replace(/.*T\d+.*Z-/, '');





            const encodedFileName = encodeSpacesAndSpecialChars(videoFile);
            const fullVideoUrl = `${base}${encodedFileName}`;
            console.log(fullVideoUrl, 'video url')
            return (
              <Grid item xs={12} sm={3} key={index}>
                <Card variant="outlined">
                  {playingIndex === index ? (
                    <CardMedia
                      component="video"
                      controls
                      controlsList="nodownload"
                      onContextMenu={handleContextMenu}
                      autoPlay
                      src={fullVideoUrl}
                      onClick={() => handleVideoClick(index)}
                    />
                  ) : (
                    <Box onClick={() => handleVideoClick(index)} sx={{ position: 'relative', cursor: 'pointer' }}>
                      <CardMedia
                        component="img"
                        image="/videothumbnail.png" // Placeholder thumbnail
                        alt="Video thumbnail"
                        sx={{ height: 140 }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontSize: '2rem',
                        }}
                      >
                        ▶️
                      </Box>
                    </Box>
                  )}
                  <CardContent>

                  <Typography>
                    {cleanFileName}
                  </Typography>

                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </>
  );
};

export default ViewLecturesMain;