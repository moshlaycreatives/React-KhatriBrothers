import { Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material';
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


  console.log(courseId, 'course id for instructore')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getAllStudentClassDetails(courseId));
        const data = res.data;
        setLectureData(data);
      } catch (err) {
        console.error("Failed to fetch advanced courses:", err);
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
        {lectureData.map((val, ind) => (
          <Box key={ind} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography>Course Name</Typography>
              <Typography>{val.courseId.title}</Typography>
            </Box>
            <Box>
              <Typography>Course Fee</Typography>
              <Typography>{val.courseId.indianPrice}</Typography>
            </Box>
            <Box>
              <Typography>Duration</Typography>
              <Typography>{val.courseId.courseDuration}</Typography>
            </Box>
          </Box>
        ))}

        <br />
        <br />

        <Typography>PDFs</Typography>
        <Box>
          <Grid container spacing={2}>
            {pdfFiles.map((pdfFile, index) => {
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
                      <Link to={fullUrl} variant="body2" color="secondary">
                        View File
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <br />

        <Typography>Video Lectures</Typography>
        <Grid container spacing={2}>
          {videoFiles.map((videoFile, index) => {
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
                        image="https://via.placeholder.com/150" // Placeholder thumbnail
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
                    <Typography variant="body2" color="textSecondary">
                      {`Video Lecture ${index + 1}`} {/* Placeholder title */}
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



// import { Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllStudentClassDetails } from '../../../../store/actions/courseActions';
// import { useDispatch } from 'react-redux';

// const ViewLecturesMain = ({ courseId }) => {
//   const base = 'https://zh0k2dcj-4545.euw.devtunnels.ms'
//   const theme = useTheme();
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [lectureData, setLectureData] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await dispatch(getAllStudentClassDetails(courseId));
//         const data = res.data;
//         setLectureData(data);
//       } catch (err) {
//         console.error("Failed to fetch advanced courses:", err);
//       }
//     };

//     fetchData();
//   }, [courseId, dispatch]);

//   // Function to normalize file path separators and check file extension
//   const normalizePath = (path) => path.replace(/\\/g, '/');
//   const isPDF = (url) => normalizePath(url).endsWith('.pdf');
//   const isVideo = (url) => normalizePath(url).endsWith('.mp4');

//   const handleVideoClick = (index) => {
//     setPlayingIndex(index === playingIndex ? null : index);
//   };

//   const handleContextMenu = (event) => {
//     event.preventDefault();
//   };

//   // Separate PDFs and videos from lectureData
//   const pdfFiles = lectureData.flatMap(item => item.classContent.filter(isPDF));
//   const videoFiles = lectureData.flatMap(item => item.classContent.filter(isVideo));
//   const encodeSpacesAndSpecialChars = (str) => {
//     // Ensure str is a string
//     const stringifiedStr = String(str);

//     // Replace spaces with '%20' and backslashes with '/'
//     return stringifiedStr
//       .replace(/ /g, '%20')    // Replace spaces with '%20'
//       .replace(/\\/g, '/');    // Replace backslashes with '/'
//   };



//   const encodedVideoFileName = encodeSpacesAndSpecialChars(videoFiles);
//   const fullVideoUrl = `${base}${encodedVideoFileName}`;
// console.log(fullVideoUrl, 'video url')



// const encodedFileName = encodeSpacesAndSpecialChars(pdfFiles);
// const fullUrl = `${base}${encodedFileName}`;
// console.log(fullUrl, 'ok url')

//   return (
//     <>
//       <Typography
//         sx={{
//           color: theme.palette.primary.main,
//           fontWeight: "550",
//           fontSize: "2rem",
//         }}
//       >
//         Course Details
//       </Typography>

//       <Card sx={{ padding: '2rem' }}>
//         {lectureData.map((val, ind) => (
//           <Box key={ind} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box>
//               <Typography>Course Name</Typography>
//               <Typography>{val.courseId.title}</Typography>
//             </Box>
//             <Box>
//               <Typography>Course Fee</Typography>
//               <Typography>{val.courseId.indianPrice}</Typography>
//             </Box>
//             <Box>
//               <Typography>Duration</Typography>
//               <Typography>{val.courseId.courseDuration}</Typography>
//             </Box>
//           </Box>
//         ))}

//         <br />
//         <br />

//         <Typography>PDFs</Typography>
//         <Box>
//           <Grid container spacing={2}>
//             {pdfFiles.map((pdfUrl, index) => (
//               <Grid item xs={12} sm={4} key={index}>
//                 <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: 2 }}>
//                   <CardMedia
//                     component="img"
//                     sx={{ width: 30, height: 40,marginLeft:'1rem' }}
//                     image="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
//                     alt="PDF icon"
//                   />
//                   <CardContent>

//                     <Link to={fullUrl} variant="body2" color="secondary">
//                       View File
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <br />

//         <Typography>Video Lectures</Typography>
//         <Grid container spacing={2}>
//           {videoFiles.map((videoUrl, index) => (
//             <Grid item xs={12} sm={3} key={index}>
//               <Card variant="outlined">
//                 {playingIndex === index ? (
//                   <CardMedia
//                     component="video"
//                     controls
//                     controlsList="nodownload"
//                     onContextMenu={handleContextMenu}
//                     autoPlay
//                     src={fullVideoUrl}
//                     onClick={() => handleVideoClick(index)}
//                   />
//                 ) : (
//                   <Box onClick={() => handleVideoClick(index)} sx={{ position: 'relative', cursor: 'pointer' }}>
//                     <CardMedia
//                       component="img"
//                       image="https://via.placeholder.com/150" // Placeholder thumbnail
//                       alt="Video thumbnail"
//                       sx={{ height: 140 }}
//                     />
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         color: 'white',
//                         fontSize: '2rem',
//                       }}
//                     >
//                       ▶️
//                     </Box>
//                   </Box>
//                 )}
//                 <CardContent>
//                   <Typography variant="body2" color="textSecondary">
//                     {`Video Lecture ${index + 1}`} {/* Placeholder title */}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Card>
//     </>
//   );
// };

// export default ViewLecturesMain;


