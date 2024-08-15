import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa6";

const CategoryBasedCoursesHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          Courses we Offer
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          distinctio maiores minus velit saepe.
        </Typography>
      </Box>

      <Box sx={{ padding: "2rem 10%" }}>
        <Grid container spacing={5}>
          <Grid item lg={2.4} md={2.4} sm={12} xs={12}>
            <Box height={"40vh"}>
              <Card
                sx={{
                  boxShadow: "1px 1px 9px #961a56",
                  minHeight: "35vh",
                  cursor: "pointer",
                  padding: "1rem",
                }}
                onClick={() => handleCardClick("/hindi-vocal-course")}
              >
                <Box>
                  <FaMicrophone
                    style={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <br />
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  Hindi Vocal Courses
                </Typography>

                <Typography>Lorem ipsum dolor sit amet </Typography>

                <br />
                <Button variant="contained" color="primary" sx={{width:'100%'}}>
                  View
                </Button>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={2.4} md={2.4} sm={12} xs={12}>
            <Box height={"40vh"}>
              <Card
                sx={{
                  boxShadow: "1px 1px 9px #961a56",
                  minHeight: "35vh",
                  cursor: "pointer",
                  padding: "1rem",
                }}
                onClick={() => handleCardClick("/tabla-course")}
              >
                <Box>
                  <FaMicrophone
                    style={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <br />
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  Tabla
                </Typography>

                <Typography>
                  Lorem, ipsum dolor. cLorem, ipsum dolor.
                </Typography>

                <br />

                <Button variant="contained" color="primary" sx={{width:'100%'}}>
                  View
                </Button>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={2.4} md={2.4} sm={12} xs={12}>
          <Box height={"40vh"}>
              <Card
                sx={{
                  boxShadow: "1px 1px 9px #961a56",
                  minHeight: "35vh",
                  cursor: "pointer",
                  padding: "1rem",
                }}
                onClick={() => handleCardClick("/bhajjan-course")}
              >
                <Box>
                  <FaMicrophone
                    style={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <br />
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                Bhajjan
                </Typography>

                <Typography>
                  Lorem, ipsum dolor. cLorem, ipsum dolor.
                </Typography>

                <br />

                <Button variant="contained" color="primary" sx={{width:'100%'}}>
                  View
                </Button>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={2.4} md={2.4} sm={12} xs={12}>
          <Box height={"40vh"}>
              <Card
                sx={{
                  boxShadow: "1px 1px 9px #961a56",
                  minHeight: "35vh",
                  cursor: "pointer",
                  padding: "1rem",
                }}
                onClick={() => handleCardClick("/ghazal-course")}
              >
                <Box>
                  <FaMicrophone
                    style={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <br />
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  Ghazal
                </Typography>

                <Typography>
                  Lorem, ipsum dolor. cLorem, ipsum dolor.
                </Typography>

                <br />


                <Button variant="contained" color="primary" sx={{width:'100%'}}>
                  View
                </Button>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={2.4} md={2.4} sm={12} xs={12}>
          <Box height={"40vh"}>
              <Card
                sx={{
                  boxShadow: "1px 1px 9px #961a56",
                  minHeight: "35vh",
                  cursor: "pointer",
                  padding: "1rem",
                }}
                onClick={() => handleCardClick("/bollywood-course")}
              >
                <Box>
                  <FaMicrophone
                    style={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <br />
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  Bollywood Songs
                </Typography>

                <Typography>
                  Lorem, ipsum dolor. cLorem, ipsum dolor.
                </Typography>

                <br />

                <Button variant="contained" color="primary" sx={{width:'100%'}}>
                  View
                </Button>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CategoryBasedCoursesHome;
