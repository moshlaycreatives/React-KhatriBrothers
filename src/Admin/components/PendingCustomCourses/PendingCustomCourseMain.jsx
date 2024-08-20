// import { useTheme } from '@emotion/react';
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Paper,
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useDispatch } from 'react-redux';
// import { getAllCourse, deleteSingleData } from '../../../store/actions/courseActions';
// import ViewCustomCourse from './components/ViewCustomCourse';

// const PendingCustomCoursesMain = () => {
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [currentRowId, setCurrentRowId] = useState(null);
//   const [isAddingCourse, setIsAddingCourse] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [courseData, setCourseData] = useState([]);
//   const [customCourseData, setCustomCourseData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await dispatch(getAllCourse());
//       const data = res.data.data;
//       const filteredCourses = data.filter(
//         (course) => course.courseType === 'bhajjan' && course.addedBy === 'admin'
//       );
//       const filterCustomCourses = data.filter(
//         (course) =>
//           course.addedBy === 'user' &&
//           course.courseType === 'bhajjan' &&
//           (!course.ukPrice ||
//             !course.indianPrice ||
//             !course.usaPrice ||
//             !course.australiaPrice ||
//             !course.ugandaPrice ||
//             !course.uaePrice


//           )
//       );

//       setCourseData(filteredCourses);
//       setCustomCourseData(filterCustomCourses);
//     } catch (err) {
//       console.error('Failed to fetch advanced courses:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [dispatch]);

//   const handleMenuClick = (event, id) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentRowId(id);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDeleteClick = () => {
//     setConfirmDialogOpen(true);
//     handleMenuClose();
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await dispatch(deleteSingleData(currentRowId));
//       setConfirmDialogOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error('Failed to delete course:', err);
//     }
//   };

//   const handleAddCourseClick = () => {
//     setIsAddingCourse(true);
//   };

//   const handleBackClick = () => {
//     setIsAddingCourse(false);
//     setIsEditing(false);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//     handleMenuClose();
//   };

//   return (
//     <Box>
//       {isAddingCourse ? (
//         // Add your component or logic for adding a course here
//         <></>
//       ) : isEditing && currentRowId ? (
//         <>
//           <Button variant='outlined' onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
//             &lt; Back to Courses
//           </Button>
//           <ViewCustomCourse courseId={currentRowId} />
//         </>
//       ) : (
//         <>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography
//               sx={{
//                 color: theme.palette.primary.main,
//                 fontWeight: '550',
//                 fontSize: '2rem',
//               }}
//             >
//               Custom Courses
//             </Typography>
//           </Box>
//           <br />
//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
//               <Table size='small' aria-label='a dense table'>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Course Name</TableCell>
//                     <TableCell>Student Name</TableCell>
//                     {/* <TableCell>Lecture Duration</TableCell> */}
//                     <TableCell>Course Fee</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {customCourseData.map((row) => (
//                     <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell component='th' scope='row' sx={{ color: 'grey' }}>
//                         {row.customList[0]}
//                       </TableCell>
//                       <TableCell sx={{ color: 'grey' }}>{row.addedById.firstName} {row.addedById.lastName}</TableCell>
//                       {/* <TableCell sx={{ color: 'grey' }}>{row.lectureDuration} hours</TableCell> */}
//                       <TableCell sx={{ color: 'grey' }}>₹ {row.indianPrice}</TableCell>
//                       <TableCell>
//                         <IconButton onClick={(event) => handleMenuClick(event, row._id)}>
//                           <MoreVertIcon />
//                         </IconButton>
//                         <Menu
//                           anchorEl={anchorEl}
//                           open={Boolean(anchorEl)}
//                           onClose={handleMenuClose}
//                         >
//                           <MenuItem onClick={handleEditClick}>View</MenuItem>
//                           <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
//                         </Menu>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </>
//       )}

//       <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Are you sure you want to delete this course?</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDialogOpen(false)} color='primary'>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color='secondary'>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default PendingCustomCoursesMain;




import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  List,
  ListItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { getAllCourse, deleteSingleData } from '../../../store/actions/courseActions';
import ViewCustomCourse from './components/ViewCustomCourse';
import { FaCircle } from "react-icons/fa";

const PendingCustomCoursesMain = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [customCourseData, setCustomCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSongDialog, setOpenSongDialog] = useState(false);
  const [selectedCustomList, setSelectedCustomList] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllCourse());
      const data = res.data.data;
      const filteredCourses = data.filter(
        (course) => course.courseType === 'bhajjan' && course.addedBy === 'admin'
      );
      const filterCustomCourses = data.filter(
        (course) =>
          course.addedBy === 'user' &&
          course.courseType === 'bhajjan' &&
          (!course.ukPrice ||
            !course.indianPrice ||
            !course.usaPrice ||
            !course.australiaPrice ||
            !course.ugandaPrice ||
            !course.uaePrice)
      );

      setCourseData(filteredCourses);
      setCustomCourseData(filterCustomCourses);
    } catch (err) {
      console.error('Failed to fetch advanced courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setConfirmDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteSingleData(currentRowId));
      setConfirmDialogOpen(false);
      fetchData();
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  const handleAddCourseClick = () => {
    setIsAddingCourse(true);
  };

  const handleBackClick = () => {
    setIsAddingCourse(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleCourseNameClick = (customList) => {
    setSelectedCustomList(customList);
    setOpenSongDialog(true);
  };

  const handleCloseSongDialog = () => {
    setOpenSongDialog(false);
  };

  return (
    <Box>
      {isAddingCourse ? (
        // Add your component or logic for adding a course here
        <></>
      ) : isEditing && currentRowId ? (
        <>
          <Button variant="outlined" onClick={handleBackClick} sx={{ marginBottom: '1rem' }}>
            &lt; Back to Courses
          </Button>
          <ViewCustomCourse courseId={currentRowId} />
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: '550',
                fontSize: '2rem',
              }}
            >
              Custom Courses
            </Typography>
          </Box>
          <br />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ padding: '1rem 1rem', boxShadow: '10px 0px 20px 1px rgba(0, 0, 0, 0.1)' }}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Course Fee</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customCourseData.map((row) => (
                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: 'grey', cursor: 'pointer' }}
                        onClick={() => handleCourseNameClick(row.customList)}
                      >
                        {row.customList[0]}
                      </TableCell>
                      <TableCell sx={{ color: 'grey' }}>
                        {row.addedById.firstName} {row.addedById.lastName}
                      </TableCell>
                      <TableCell sx={{ color: 'grey' }}>₹ {row.indianPrice}</TableCell>
                      <TableCell>
                        <IconButton onClick={(event) => handleMenuClick(event, row._id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                          <MenuItem onClick={handleEditClick}>View</MenuItem>
                          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this course?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for displaying the song list */}
      <Dialog open={openSongDialog} onClose={handleCloseSongDialog}>
        <DialogTitle>Custom Songs</DialogTitle>
        <DialogContent>
          <List>
            {selectedCustomList.map((song, index) => (
              <ListItem key={index} sx={{fontSize:'1.2rem'}}><FaCircle style={{fontSize:'0.7rem', color:theme.palette.primary.main}}/> {song}</ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSongDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingCustomCoursesMain;
