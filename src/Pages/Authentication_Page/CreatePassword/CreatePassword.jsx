import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Page from "../../../components/Page/Page";
import { Link } from "react-router-dom";

const CreatePassword = () => {
  const theme = useTheme();
  return (
    <>
      <Page title="create-password">
        <Box>
          <Grid container spacing={5}>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Box
                sx={{
                  backgroundImage: "url(/sign-in-up.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  width: "100%",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"flex-end",
                  padding:"1rem 1rem 6rem 1rem"
                }}
              >
                <Typography sx={{color:"white"}} >
                
                </Typography>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} xs={12} sm={12}>
              <Box
                sx={{ display: "flex", alignItems: "center",justifyContent:"center", width: "100%" }}
              >
                <Box sx={{ width: "90%" }}>
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      fontWeight: "600",
                      marginTop: "2rem",
                    }}
                  >
                    logo{" "}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      marginTop: "6rem",
                      marginBottom: "1rem",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Create New Password
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      marginBottom: "1rem",
                    }}
                  >
                    Your new password must be different from previously used
                    password.
                  </Typography>

                  <Box sx={{ marginBottom: ".5rem" }}>
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: "400" }}>
                      Password
                    </Typography>
                    <TextField placeholder="Paasword" fullWidth size="small" />
                  </Box>
                  <Box sx={{ marginBottom: ".5rem" }}>
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: "400" }}>
                      Comfirm Password
                    </Typography>
                    <TextField
                      placeholder="Comfrim password"
                      fullWidth
                      size="small"
                    />
                  </Box>

                  <Button
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      marginTop: "2rem",

                      width: "100%",
                      marginBottom: ".5rem",
                    }}
                  >
                    Save Password
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  );
};

export default CreatePassword;
