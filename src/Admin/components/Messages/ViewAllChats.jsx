// import React, { useEffect, useState } from "react";
// import { Box, Typography, Divider, Avatar, Paper } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllConversations } from "../../../store/actions/authActions";

// const ViewAllChats = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state?.auth?.user?._id);
//   const [allConversation, setAllConversation] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);

//   useEffect(() => {
//     dispatch(getAllConversations())
//       .then((res) => {
//         setAllConversation(res.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching conversations:", error);
//       });
//   }, []);

//   const getParticipantNames = (participants) => {
//     const otherParticipants = participants.filter(
//       (participant) => participant._id !== userId
//     );
//     const currentUser = participants.find((participant) => participant._id === userId);
//     return `${currentUser?.firstName} with ${otherParticipants.map(p => p.firstName).join(', ')}`;
//   };

//   const handleConversationClick = (conversation) => {
//     setSelectedConversation(conversation);
//   };

//   return (
//     <Box display="flex">
//       <Box width="30%" sx={{ padding: "8px", borderRight: "1px solid #ddd" }}>
//         {allConversation.map((conversation) => (
//           <Box
//             key={conversation._id}
//             onClick={() => handleConversationClick(conversation)}
//             sx={{
//               padding: "8px",
//               cursor: "pointer",
//               "&:hover": { backgroundColor: "#f0f0f0" },
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Avatar />
//               <Box sx={{ marginLeft: '0.5rem' }}>
//                 <Typography sx={{ fontWeight: "bold", fontSize: '0.9rem' }}>
//                   {getParticipantNames(conversation.participants)}
//                 </Typography>
//               </Box>
//             </Box>
//             <Divider sx={{ margin: "8px 0" }} />
//           </Box>
//         ))}
//       </Box>

//       <Box width="70%" sx={{ padding: "16px" }}>
//         {selectedConversation ? (
//           <>
//             <Typography variant="h6" sx={{ marginBottom: "16px" }}>
//               Chat between {getParticipantNames(selectedConversation.participants)}
//             </Typography>
//             <Paper sx={{ padding: "16px", height: "60vh", overflowY: "auto" }}>
//               {selectedConversation.messages.map((msg, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: "flex",
//                     justifyContent: msg.senderId === userId ? "flex-end" : "flex-start",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       backgroundColor: msg.senderId === userId ? "#cce5ff" : "#f8d7da",
//                       color: msg.senderId === userId ? "#004085" : "#721c24",
//                       padding: "8px 12px",
//                       borderRadius: "12px",
//                       maxWidth: "60%",
//                       wordWrap: "break-word",
//                     }}
//                   >
//                     <Typography variant="body2">{msg.text}</Typography>
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         display: "block",
//                         textAlign: "right",
//                         marginTop: "4px",
//                       }}
//                     >
//                       {msg.createdAt}
//                     </Typography>
//                   </Box>
//                 </Box>
//               ))}
//             </Paper>
//           </>
//         ) : (
//           <Typography variant="body1">Select a conversation to view messages</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ViewAllChats;



import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Avatar, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllConversations } from "../../../store/actions/authActions";

const ViewAllChats = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [allConversation, setAllConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    dispatch(getAllConversations())
      .then((res) => {
        setAllConversation(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, [dispatch]);

  const getParticipantNames = (participants) => {
    const otherParticipants = participants.filter(
      (participant) => participant._id !== userId
    );
    const currentUser = participants.find((participant) => participant._id === userId);
    return `${currentUser?.firstName} with ${otherParticipants.map(p => p.firstName).join(', ')}`;
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <Box display="flex" width={'100%'}>
      <Box width="30%" sx={{ maxWidth:'20%', padding: "8px", borderRight: "1px solid #ddd",}}>
        {allConversation.map((conversation) => (
          <Box
            key={conversation._id}
            onClick={() => handleConversationClick(conversation)}
            sx={{
              padding: "8px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar />
              <Box sx={{ marginLeft: '0.5rem' }}>
                <Typography sx={{ fontWeight: "bold", fontSize: '0.9rem' }}>
                  {getParticipantNames(conversation.participants)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ margin: "8px 0" }} />
          </Box>
        ))}
      </Box>

      <Box width="70%"  sx={{ maxWidth:'60%', padding: "16px" }}>
        {selectedConversation ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: "16px" }}>
              Chat between {getParticipantNames(selectedConversation.participants)}
            </Typography>
            <Paper sx={{ padding: "16px", height: "60vh", overflowY: "auto" }}>
              {selectedConversation.messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.senderId === userId ? "flex-end" : "flex-start",
                    marginBottom: "8px",
                  }}
                >
                    {/* Message Avatar */}
                  {msg.senderId !== userId && (
                    <Avatar sx={{ marginRight: "8px" }} />
                  )}

                  <Box
                    sx={{
                      backgroundColor: msg.senderId === userId ? "#cce5ff" : "#f8d7da",
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

                    {/* Avatar at end if sender is current user */}
                  {msg.senderId === userId && (
                    <Avatar sx={{ marginLeft: "8px" }} />
                  )}
                </Box>
              ))}
            </Paper>
          </>
        ) : (
          <Typography variant="body1">Select a conversation to view messages</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewAllChats;
