import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Paper,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery,
  IconButton,
  Drawer,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllConversations } from "../../../store/actions/authActions";
import { adminMessageSearch } from "../../../store/actions/courseActions";
import { CiSearch } from "react-icons/ci";
import MenuIcon from "@mui/icons-material/Menu";

const ViewAllChats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const endOfMessagesRef = useRef(null);
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [allConversation, setAllConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        fetchData();
        console.log("first");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = () => {
    // const userType = "user";
    if (!searchTerm.trim()) {
      return fetchData();
    }

    dispatch(adminMessageSearch(searchTerm))
      .then((res) => {
        // setStudentData(res?.data?.data);
        setAllConversation(res.data.data);
      })
      .catch((error) => {
        console.error("Failed to send searchTerm", error);
      });
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = () => {
    dispatch(getAllConversations())
      .then((res) => {
        setAllConversation(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const getParticipantNames = (participants) => {
    const otherParticipants = participants.filter(
      (participant) => participant._id !== userId
    );
    const currentUser = participants.find(
      (participant) => participant._id === userId
    );
    return `${currentUser?.firstName} with ${otherParticipants
      .map((p) => p.firstName)
      .join(", ")}`;
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) setDrawerOpen(false);
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView();
    }
  }, [selectedConversation]);

  const renderUsersList = () => (
    <>
      {allConversation?.map((conversation) => (
        <Box
          key={conversation._id}
          onClick={() => handleConversationClick(conversation)}
          sx={{
            padding: "8px",
            cursor: "pointer",

            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar />
            <Box sx={{ marginLeft: "0.5rem" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                {getParticipantNames(conversation.participants)}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ margin: "8px 0" }} />
        </Box>
      ))}
    </>
  );

  return (
    <>
      <Box display="flex" width={"100%"} sx={{}}>
        <Box
          width="20%"
          sx={{
            width: "20%",
            padding: "8px",
            height: "70vh",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
          }}
        >
          {isMobile && (
            <>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  alignSelf: "flex-start",
                  color: theme.palette.primary.main,
                  mt: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}

          {isMobile ? (
            <>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ padding: "6rem 0.5rem 0rem 0.5rem" }}>
                  <Box
                    sx={{
                      marginBottom: "2rem",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleChange}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CiSearch />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {renderUsersList()}
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Box
                sx={{
                  marginBottom: "2rem",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiSearch />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {allConversation?.map((conversation) => (
                <Box
                  key={conversation._id}
                  onClick={() => handleConversationClick(conversation)}
                  sx={{
                    padding: "8px",
                    cursor: "pointer",

                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar />
                    <Box sx={{ marginLeft: "0.5rem" }}>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                      >
                        {getParticipantNames(conversation.participants)}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ margin: "8px 0" }} />
                </Box>
              ))}
            </>
          )}
        </Box>

        <Box width="80%" sx={{ maxWidth: "80%", padding: "16px" }}>
          {selectedConversation ? (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                {/* Chat between{" "} */}

                {getParticipantNames(selectedConversation.participants)}
              </Typography>
              <Paper
                sx={{ padding: "16px", height: "60vh", overflowY: "auto" }}
              >
                {selectedConversation.messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent:
                        msg.senderId === userId ? "flex-end" : "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    {/* {msg.senderId !== userId && (
                      <Avatar sx={{ marginRight: "8px" }} />
                    )} */}

                    <Box
                      sx={{
                        backgroundColor:
                          msg.senderId === userId ? "#cce5ff" : "#f8d7da",
                        color: msg.senderId === userId ? "#004085" : "#721c24",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        maxWidth: "60%",
                        wordWrap: "break-word",
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "right",
                          marginTop: "4px",
                        }}
                      >
                        {msg.createdAt}
                      </Typography>
                    </Box>

                    {/* {msg.senderId === userId && (
                      <Avatar sx={{ marginLeft: "8px" }} />
                    )} */}
                  </Box>
                ))}

                <div ref={endOfMessagesRef} />
              </Paper>
            </>
          ) : (
<>


<Paper sx={{minHeight:'60vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
<Typography sx={{fontSize: isMobile ? '0.9rem':'1.5rem', fontWeight:600, textAlign:'center', color:theme.palette.primary.main}}>
              Select a conversation to view messages
            </Typography>
</Paper>


</>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ViewAllChats;
