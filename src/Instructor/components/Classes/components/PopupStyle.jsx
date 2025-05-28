import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  Poproot: {
    width: "420px",
    height: "270px",
    transform: "translate(-70%, -50%)",
    border: "1px solid rgba(154, 25, 21, 1)",
    borderRadius: "30px",
    margin: "0px 0px 40px 220px",
    // [theme.breakpoints.down("sm")]: {
    //   width: "350px",
    //   transform: "translate(-50%, -50%)",
    //   margin: "0px 0px 0px 0px",
    // },
  },
  img: {
    width: "60px",
    margin: "15px 0px 0px 150px",
    // [theme.breakpoints.down("sm")]: {
    //   margin: "30px 0px 5px 125px",
    // },
  },
  heading: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: "15px",
    textAlign: "center",
    lineHeight: "15px",
    color: "rgba(0, 0, 0, 1)",
    margin: "20px 0px 30px 0px",
    // [theme.breakpoints.down("sm")]: {
    //   margin: "0px 0px 0px 30px",
    // },
  },
  btns: {
    margin: "15px 0px 0px 88px",
    // [theme.breakpoints.down("sm")]: {
    //   margin: "15px 0px 0px 60px",
    // },
  },
  graph: {
    backgroundColor: "rgb(255,255,255)",
    border: "1px solid rgb(235,235,235)",
    borderRadius: "5.8px",
    boxShadow: "0px 4px 2px rgba(0, 0, 0, 0.1)",
    margin: "25px 0px 0px 0px",
    padding: "0px 22px 22px 22px",
  },
  our: {
    padding: "10px 0px 10px 20px",
  },
}));



export default useStyles;