import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import useStyles from "./PopupStyle"
import { useNavigate } from "react-router-dom";
import axios from "axios";





const DeleteClass = ({ open, onClose, SendID, StudentIDs, InStructorIDs, onDeleteSuccess }) => {
    const classes = useStyles();


    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log("this is token", token)
    }, [])


    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://m7fgzfrz-4545.inc1.devtunnels.ms/api/v1/deleteClass/${SendID}/${InStructorIDs}/${StudentIDs}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDeleteSuccess();
            onClose(); // Close the popup
        } catch (error) {
            console.error("Error deleting class:", error);

        }
    };


    console.log("this ia main id", SendID)
    console.log("this ia StudentIDs", StudentIDs)
    console.log("this ia InStructor IDs", InStructorIDs)


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="popup-modal-title"
            aria-describedby="popup-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                className={classes.Poproot}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >

                <img className={classes.img}
                    src="/DeleteImage.png"
                    alt="popup image"
                />
                <h6 className={classes.heading}>
                    Are you sure you want to delete this Class? This action cannot be undone.
                </h6>
                <Box className={classes.btns}>
                    <Button
                        variant="outlined"
                        style={{
                            border: "1px solid rgba(154, 25, 21, 1)",
                            color: "rgba(154, 25, 21, 1)",
                            textTransform: "none",
                            width: "90px",
                            height: "30px"
                        }}
                    onClick={onClose}
                    >Cancel</Button>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "rgba(184, 25, 24, 1)",
                            textTransform: "none",
                            margin: "0px 0px 0px 10px",
                            width: "90px",
                            height: "30px"
                        }}
                        onClick={handleDelete}
                    >Delete</Button>
                </Box>
            </Box>

        </Modal>
    );
};

export default DeleteClass;



