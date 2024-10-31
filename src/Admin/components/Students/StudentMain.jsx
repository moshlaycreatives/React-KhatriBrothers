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
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
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
import { Circle } from "@mui/icons-material";

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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // For opening dialog
  const [currentCustomList, setCurrentCustomList] = useState([]);
  const [currencyType, setCurrencyType] = useState(''); // Loading status

  // Loading status
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getStudentData(currentPage));
      setStudentData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / ITEMS_PER_PAGE)); // Calculate total pages
      console.log("Student data:", res.data);
      setCurrencyType(res.data.data);

    } catch (error) {
      console.error("Failed to fetch student data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage]);

  // Fetch instructor data after coming back from AddInstructor
  useEffect(() => {
    if (!isEdited) {
      fetchData(); // Trigger the API call again
    }
  }, [isEdited]);

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

  };

  const handleEditClick = () => {
    setIsEdited(true);
    handleMenuClose();
  };

  const handleBackClick = () => {
    setIsEdited(false);
    setCurrentRowId(null);
  };


  const handleOpenDialog = (customList) => {
    if (customList.length > 0) {
      setCurrentCustomList(customList);
      setOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };




  const getFeeByCurrency = (course, currency) => {
    switch (currency) {
      case currencyType.USD:
        return course.amount;
      case currencyType.INR:
        return course.indianPrice;
      case currencyType.GB:
        return course.ukPrice;
      case currencyType.KE:
        return course.kenyaPrice;
      case currencyType.UG:
        return course.ugandaPrice;
      case currencyType.AE:
        return course.uaePrice;
      case currencyType.CAN:
      case currencyType.CA:
        return course.canadaPrice;
      case currencyType.AU:
      case currencyType.AUS:
        return course.australiaPrice;
      default:
        return course.indianPrice; // Default to Indian Price if currency type is unrecognized
    }
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
                        <TableCell>Payment Status</TableCell>
                        <TableCell>Instructor Status</TableCell>

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
                            sx={{ color: "grey" }}
                          >
                            {`${row.studentId.firstName} ${row.studentId.lastName}`}
                          </TableCell>
                          <TableCell sx={{ color: "gray", cursor:'pointer' }}
onClick={() => handleOpenDialog(row.courseId.customList)}
                          >
                            {row.courseId.title}
                          </TableCell>
                          <TableCell sx={{ color: "gray" }}>
                            {row.courseId.courseType === 'bhajjan' ? 'Bhajan' : row.courseId.courseType}
                          </TableCell>
                          <TableCell sx={{ color: "gray" }}>
                            {row.classType}
                          </TableCell>
                          <TableCell sx={{ color: "gray" }}>
                            {row.amount} {row.currency}
                            {/* {getFeeByCurrency(row.courseId, row.currency)} {row.currency} */}
                          </TableCell>

                          <TableCell sx={{ color: row.payment ? 'green' : "red" }}>
                             {row.payment === true ? 'Paid':'Unpaid'}
                          </TableCell>

                          <TableCell>
                            {row.instructorId ? (
                              <>
                                <Typography sx={{ color: "green" }}>
                                  Assigned
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography sx={{ color: "red" }}>
                                  Pending
                                </Typography>
                              </>
                            )}
                          </TableCell>

                          <TableCell>
                            <IconButton
                              onClick={(events) =>
                                handleMenuClick(events, row._id)
                              }
                            >


                              <BsEye
                                style={{ color: theme.palette.primary.main }}
                              />
                            </IconButton>

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



          <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Customized course List</DialogTitle>
        <DialogContent>
          {currentCustomList.length > 0 ? (
            <List>
              {currentCustomList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No customized course data available</Typography>
          )}
        </DialogContent>
      </Dialog>



        </Box>
      )}
    </>
  );
};

export default StudentMain;
