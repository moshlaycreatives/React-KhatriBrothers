import { Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ViewLecturesMain = ({courseId}) => {
    const theme = useTheme()

    const [playingIndex, setPlayingIndex] = useState(null);

    const videoData = [
      {
        title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your video URL
        thumbnail: "https://via.placeholder.com/150", // Replace with your video thumbnail URL
      },
      {
        title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://via.placeholder.com/150",
      },
      {
        title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://via.placeholder.com/150",
      },
      {
        title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail: "https://via.placeholder.com/150",
      },
    ];

    const handleVideoClick = (index) => {
      setPlayingIndex(index === playingIndex ? null : index);
    };
    const pdfData = [
        {
          title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
          link: "#",
        },
        {
          title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
          link: "#",
        },
        {
          title: "Lorem Ipsum Is Simply Dummy Text Of The Printing",
          link: "#",
        },
      ];
      const handleContextMenu = (event) => {
        event.preventDefault();
      };

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


<Card sx={{padding:'2rem'}}>
<Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>

<Box>
            <Typography>Course name</Typography>
            <Typography>Hindustani Vocale</Typography>

        </Box>

        <Box>
            <Typography>Course name</Typography>
            <Typography>Hindustani Vocale</Typography>

        </Box>


        <Box>
            <Typography>Course name</Typography>
            <Typography>Hindustani Vocale</Typography>

        </Box>

        <Box>
            <Typography></Typography>
            <Typography></Typography>

        </Box>

</Box>

<Typography>PDF</Typography>


<Box>

<Grid container spacing={2}>
      {pdfData.map((pdf, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 30, height: 40 }}
              image="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
              alt="PDF icon"
            />
            <CardContent sx={{}}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {pdf.title}
              </Typography>
              <Link href={pdf.link} variant="body2" color="secondary">
                View File
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>



</Box>


<br/>

<Typography>Video Lectures</Typography>



<Grid container spacing={2}>
      {videoData.map((video, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Card variant="outlined">
            {playingIndex === index ? (
              <CardMedia
                component="video"
                controls
                controlsList="nodownload"
                onContextMenu={handleContextMenu}
                autoPlay
                src={video.videoUrl}
                onClick={() => handleVideoClick(index)}
              />
            ) : (
              <Box onClick={() => handleVideoClick(index)} sx={{ position: 'relative', cursor: 'pointer' }}>
                <CardMedia
                  component="img"
                  image={video.thumbnail}
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
                {video.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>


</Card>






    </>
  )
}

export default ViewLecturesMain