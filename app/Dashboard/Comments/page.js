"use client"

import Navbar from "../navbar";
import { Card, CardActionArea, CardContent, Grid, Modal, Box, CardHeader, Typography, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme, useMediaQuery, styled, IconButton, ListItemIcon, Skeleton } from "@mui/material";
import { red } from '@mui/material/colors';
import { useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const comments = () => {
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState([]);
    const search = useSearchParams();
    const postId = search.get('postId');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCommnet = () => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/posts/'+postId+'/comments')
                .then(response => response.json())
                .then(json => {
                    setLoading(false);
                    setComment(json);
                });
        };
        fetchCommnet();

        const fetchUsers = () => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/posts/'+postId)
                .then(response => response.json())
                .then(json => {
                    setLoading(false);
                    setUser(json);
                });
        }
        fetchUsers();
    }, []);
    return ( <>
        <Navbar/>
        <Button variant="contained" color="success" href="/Dashboard" sx={{marginTop:'100px', marginLeft: '40px'}}>Back</Button>
        <Typography variant="h4" sx={{fontWeight:'bold', marginTop:'30px', marginLeft:'40px'}}>Comment Section</Typography>
        <Grid container spacing={4} marginTop={"8px"}>
                {comment.map((item, index) => {
                   
                    return(
                        <Grid item lg={3} md={4} sm={6} xs={12} key={index.id}>
                            
                            <Card sx={{ maxWidth: 380, justifyContent: "center", alignItems: "center", borderRadius:4, marginLeft: '40px'}} elevation={4} > 
                                <CardActionArea >                            
                                    <CardContent>
                                        
                                        <ListItemIcon
                                            sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start', // Align to the left
                                            marginTop: '-6px',
                                            }}
                                        >
                                           
                                            <CardHeader  title={`Name: ${item.name}`} subheader={`Email: ${item.email}`}  style={{ color: 'black' }} />
                                        </ListItemIcon>
                                        
                                    </CardContent>
                                    
                                </CardActionArea>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="body1" color="text.dark" sx={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}>
                                            {item.body}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            
                        </Grid>
                    );
                })}
            </Grid>

    </> );
}
 
export default comments;