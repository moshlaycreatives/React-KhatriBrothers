import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  Pagination,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleStudent,
  getStudentData,
  sendSearchTerm,
} from "../../../store/actions/courseActions";
import ViewStudent from "./component/ViewStudent";
import { BsEye } from "react-icons/bs";

const ITEMS_PER_PAGE = 10; // Number of items per page

const StudentMain = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [loading, setLoading] = useState(true); // Loading status
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getStudentData(currentPage));
      setStudentData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / ITEMS_PER_PAGE)); // Calculate total pages
      console.log("Student data:", res.data);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage]);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        fetchData();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);




  const handleSearch = () => {
    const userType = "user";

    if (!searchTerm.trim()) {
      return fetchData();
    }

    dispatch(sendSearchTerm(searchTerm, userType))
      .then((res) => {
        setStudentData(res?.data?.data);
        setTotalPages(Math.ceil(res?.data?.total / ITEMS_PER_PAGE)); // Update total pages based on search results
      })
      .catch((error) => {
        console.error("Failed to send searchTerm", error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenMenu = (events) => {
    setAnchorEl(events.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (events, id) => {
    // setAnchorEl(events.currentTarget);
    setCurrentRowId(id);
    setIsEdited(true);

    console.log("current student id:", currentRowId);
  };

  const handleEditClick = () => {
    setIsEdited(true);
    handleMenuClose();
  };

  const handleBackClick = () => {
    setIsEdited(false);
    setCurrentRowId(null);
  };

  return (
    <>
      {isEdited && currentRowId ? (
        <>
          <Button
            variant="outlined"
            onClick={handleBackClick}
            sx={{ marginBottom: "1rem" }}
          >
            &lt; Back to Students
          </Button>
          <ViewStudent student_Id={currentRowId} />
        </>
      ) : (
        <Box>
          <Box>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontSize: "2rem",
                fontWeight: 550,
              }}
            >
              Students
            </Typography>
          </Box>
          <Box>
            <TableContainer
              component={Paper}
              sx={{
                padding: "1rem",
                boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiSearch />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  startIcon={<CiSearch />}
                >
                  Search
                </Button>
              </Box>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Course Name</TableCell>
                        <TableCell>Course Type</TableCell>
                        <TableCell>Class Type</TableCell>
                        <TableCell>Course Fee</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentData.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row "
                            sx={{ color: "gray" }}
                          >
                            {`${row.studentId.firstName} ${row.studentId.lastName}`}
                          </TableCell>
                          <TableCell sx={{ color: "gray" }}>
                            {row.courseId.title}
                          </TableCell>
                          <TableCell sx={{ color: "gray" }}>
                            {row.courseId.courseType}
                          </TableCell>
                          <TableCell sx={{ color: "gray" }}>Group</TableCell>
                          <TableCell sx={{ color: "gray" }}>
                            ₹ {row.courseId.indianPrice}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(events) =>
                                handleMenuClick(events, row._id)
                              }
                            >
                              {/* <MoreVertIcon /> */}

                              <BsEye style={{color:theme.palette.primary.main}}/>
                            </IconButton>
                            {/* <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={handleEditClick}>
                                View
                              </MenuItem>
                            </Menu> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "1rem",
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>
                </>
              )}
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StudentMain;
