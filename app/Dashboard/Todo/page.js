"use client"

import Navbar from "../navbar";
import { Card, CardActionArea, CardContent, Grid, Modal, Box, CardHeader, Typography, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme, useMediaQuery, styled, IconButton, ListItemIcon, Skeleton } from "@mui/material";
import { red } from '@mui/material/colors';
import { useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";

const Todo = () => {
    const [todo, setTodo] = useState([]);
    const [user, setUser] = useState([]);
    const search = useSearchParams();
    const userId = search.get('userId');

    useEffect(() => {
        const fetchUserTodo = () => {
            fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/todos')
                .then(response => response.json())
                .then(json => {
                    setTodo(json);
                });
        }
        fetchUserTodo()

        const fetchUsers = () => {
            fetch('https://jsonplaceholder.typicode.com/users/'+userId)
                .then(response => response.json())
                .then(json => {
                    setUser(json);
                });
        }
        fetchUsers();
    }, [])



    return ( <>
        <Navbar/>
        <Button variant="contained" color="success" href="/Dashboard" sx={{marginTop:'100px', marginLeft: '40px'}}>Back</Button>
        <Typography variant="h4" sx={{fontWeight:'bold', marginTop:'30px', marginLeft:'40px'}}>Todo Section</Typography>
        <Grid container spacing={4} marginTop={"8px"}>
                {todo.map((todos, index) => {
                   
                    return(
                        <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                            <Card sx={{ maxWidth: 380, justifyContent: "center", alignItems: "center", borderRadius:4, marginLeft: '40px', marignButton: '10px'}} elevation={4} > 
                                <CardActionArea >                            
                                    <CardContent>
                                            <Typography variant="body1" color="primary" fontSize={"15px"}>{`Todo ID: ${todos.id}`} </Typography>
                                            <Typography variant="h5" fontWeight={"bold"}>{user.name}</Typography>
                                            <Typography variant="body1" fontSize={"20px"}>{`Title: ${todos.title}`} </Typography>
                                            <Typography variant="body1">{`Task Status: ${todos.completed}`} </Typography>
                                      
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            
                        </Grid>
                    );
                })}
            </Grid>
    </> );
}
 
export default Todo;