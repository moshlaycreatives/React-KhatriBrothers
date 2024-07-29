import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedCourse, setSelectedCourse] = useState('');
  const [isAdding, setIsAdding] = useState(false); // State to toggle between form and table view

  const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleAddTestimonial = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const rows = [
    {
      coursename: "Hindustani vocal advanced A series",
      teacher: "Faraz",
      image: "/ggg.png",
    },
  ];

  return (
    <Box>
      {!isAdding ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "550",
                fontSize: isMobile ? '1.5rem' : "2rem",
              }}
            >
              Testimonial
            </Typography>

            <Box>
              <Button
                variant="outlined"
                onClick={handleAddTestimonial}
                sx={{
                  textTransform: "none",
                  borderRadius: "0px",
                  fontWeight: 400,
                  fontSize: isMobile ? '0.8rem' : "1.2rem",
                }}
              >
                + Add Testimonial
              </Button>
            </Box>
          </Box>

          <br />

          <TableContainer
            component={Paper}
            sx={{
              padding: "1rem 1rem",
              boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Course name</TableCell>
                  <TableCell>Video</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      paddingBottom: "1rem",
                      alignItems: "start",
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: "grey" }}>
                      {row.coursename}
                    </TableCell>
                    <TableCell sx={{ color: "grey" }}>{row.teacher}</TableCell>
                    <TableCell sx={{ color: "grey" }}>
                      <Box>
                        <img src={row.image} alt="" width={"50px"} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Card
          sx={{
            boxShadow: "10px 0px 20px 1px rgba(0, 0, 0, 0.1)",
            position: 'relative', // Position relative for the close button
          }}
        >
          <CloseIcon
            onClick={handleCancel}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              cursor: 'pointer',
            }}
          />

          <Box sx={{ padding: "1.2rem" }}>
            <Typography sx={{ fontWeight: '600' }}>Add Details</Typography>
            <br />

            <form>
              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Title
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Enter your title"
                sx={{ borderRadius: "0px", marginBottom: "0.8rem" }}
              />

              <br />

              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Course Name
              </Typography>

              <FormControl fullWidth size="small" sx={{ marginBottom: "0.8rem" }}>
                <Select
                  value={selectedCourse}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  {courses.map((course, index) => (
                    <MenuItem key={index} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />

              <Typography sx={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                Add Video
              </Typography>

              <Box sx={{ width: '100%', border: '1px solid #7c7c7c', borderRadius: '3px', color: 'grey', padding: '0.5rem' }}>
                <input type="file" />
              </Box>

              <br />
              <br />

              <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  fullWidth
                  sx={{
                    borderRadius: "0px",
                    padding: "0.7rem 0rem",
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "0px",
                    textTransform: "none",
                    fontWeight: "400",
                    padding: "0.7rem 0rem",
                  }}
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Testimonials;
