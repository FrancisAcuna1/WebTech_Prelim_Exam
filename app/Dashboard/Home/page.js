"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { Card, CardActionArea, CardContent, Grid, Typography, ListItemIcon, CardHeader, Skeleton } from "@mui/material";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import PhotoCameraFrontOutlinedIcon from '@mui/icons-material/PhotoCameraFrontOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Chart from 'react-apexcharts';



const Home = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([{
        id: null,
        name: null,
        email: null,
        body: null
    
    }]);
    const [comment, setComment] = useState ([]);
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        const fetchPosts = () => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(json => {
                    setPosts(json);
                    setLoading(false);
                });
                
        };
        fetchPosts();

        
    }, []);

    useEffect(() => {
        const fetchUsers = () => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                setUser(json);
                setLoading(false);
            });
        }
        fetchUsers();
    },[])

    useEffect(() => {
        const fetchComments = () => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(json => {
                setComment(json);
                setLoading(false);
            });
        }
        fetchComments();
    },[])

    useEffect(() => {
        const fetchTodo = () => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                setTodo(json);
                setLoading(false);
            });
        }
        fetchTodo();
    },[])

    const todoCountPerUser = {};
    todo.forEach((task) => {

      if (todoCountPerUser[task.userId]) {
        todoCountPerUser[task.userId]++;
      } else {
        todoCountPerUser[task.userId] = 1;
      }
    });

    const usersTodo = user.map(users => users.name)
    const todoCounts = Object.values(todoCountPerUser);

    const optionsBar = {
      chart: {
        id: "bar-chart",
      },
      xaxis: {
        categories: usersTodo,
      },
    };
  
    // Bar chart series
    const seriesBar = [
      {
        name: "Todo Tasks",
        data: todoCounts,
      },
    ];

    

    return ( <>
        <Navbar/>
        <Grid container spacing={2}>
           <Grid xs={12} sm={6} md={4} lg={3}>
                <Card Card sx={{ maxWidth: 340, marginTop: '20px', justifyContent: "center", alignItems: "center", borderRadius: 5 }} elevation={3}>
                    <CardActionArea  >
                         <ListItemIcon
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Align to the left
                            marginTop: '-6px',
                            }}
                        >
                                <CardHeader
                                title="Users"
                                component="div"
                                sx={{ color: 'Gray', fontSize: '10px', height: '5px', marginTop: '20px', marginLeft: 2 }}
                                />
                                <GroupOutlinedIcon color="primary" sx={{ fontSize: 30, marginRight: '8px', marginTop:2, marginLeft: 22}} />
                        </ListItemIcon>
                        <CardContent>
                          
                            { loading ? (
                                <Skeleton animation="wave" height={30} width="80%" />
                            ):(
                                <CardContent>
                                    <Typography variant="h5" color="text.dark" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
                                        Total User: {user.length}
                                    </Typography>
                                </CardContent>
                            )

                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
           </Grid>
           <Grid xs={12} sm={6} md={4} lg={3}>
                <Card Card sx={{ maxWidth: 340, marginTop: '20px', justifyContent: "center", alignItems: "center", borderRadius: 5}} elevation={3}>
                    <CardActionArea  >
                         <ListItemIcon
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Align to the left
                            marginTop: '-6px',
                            }}
                        >
                                <CardHeader
                                title="Post"
                                component="div"
                                sx={{ color: 'Gray', fontSize: '10px', height: '5px', marginTop: '20px', marginLeft: 2 }}
                                />
                                <PhotoCameraFrontOutlinedIcon color="primary" sx={{color:'#E23C29', fontSize: 30, marginRight: '8px', marginTop:2, marginLeft: 24}} />
                        </ListItemIcon>
                        <CardContent>
                            {loading ? (
                                <Skeleton animation="wave" height={30} width="80%" />
                                ):(
                                    <CardContent>
                                        <Typography variant="h5" color="text.dark" sx={{fontWeight: 'bold', display: 'flex', alignItems: 'start', justifyContent: 'start',}}>
                                            Total Post: {posts.length}
                                        </Typography>
                                    </CardContent>
                                )
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
           </Grid>
           <Grid xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 340, marginTop: '20px', justifyContent: "center", alignItems: "center", borderRadius: 5}} elevation={3}>
                    <CardActionArea  >
                         <ListItemIcon
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Align to the left
                            marginTop: '-6px',
                            }}
                        >
                                <CardHeader
                                title="Comments"
                                component="div"
                                sx={{ color: 'Gray', fontSize: '10px', height: '5px', marginTop: '20px', marginLeft: 2 }}
                                />
                                <QuestionAnswerOutlinedIcon color="primary" sx={{ color: '#DAE244', fontSize: 30, marginRight: '8px', marginTop:2, marginLeft: 15}} />
                        </ListItemIcon>
                        <CardContent>
                            {loading ? (
                                    <Skeleton animation="wave" height={30} width="80%" />
                                ):(
                                    <CardContent>
                                        <Typography variant="h5" color="text.dark" sx={{fontWeight: 'bold', display: 'flex', alignItems: 'start', justifyContent: 'start',}}>
                                            Total Comment: {comment.length}
                                        </Typography>
                                    </CardContent>
                                )   
                            } 
                        </CardContent>
                    </CardActionArea>
                </Card>
           </Grid>
           <Grid xs={12} sm={6} md={4} lg={3}>
                 <Card sx={{ maxWidth: 340, marginTop: '20px', justifyContent: "center", alignItems: "center", borderRadius: 5 }} elevation={3}>
                    <CardActionArea>
                            <ListItemIcon
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start', // Align to the left
                                marginTop: '-6px',
                                }}
                            >
                                <CardHeader
                                title="Todo"
                                component="div"
                                sx={{ color: 'Gray', fontSize: '10px', height: '5px', marginTop: '20px', marginLeft: 2 }}
                                />
                                <AddTaskOutlinedIcon color="primary" sx={{ color: '#1FE2AF', fontSize: 30, marginRight: '8px', marginTop:2, marginLeft: 23}} />
                            </ListItemIcon>
                        <CardContent>
                            {loading ? (
                                <Skeleton animation="wave" height={30} width="80%" />
                                ):(
                                    <CardContent>
                                <Typography variant="h5" color="text.dark" sx={{fontWeight: 'bold', display: 'flex', alignItems: 'start', justifyContent: 'start',}}>
                                        Total Comment: {todo.length}
                                    </Typography>
                                    </CardContent>
                                )   
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item sm={11}>
                <Card height={450} MaxWidth={900}  overflow="auto"   sx={{  marginTop: '20px',  justifyContent: "center", alignItems: "center", }} elevation={3}>
                    {
                    <Chart
                        options={optionsBar}
                        series={seriesBar}
                        type="bar"
                        MaxWidth={620}
                        height={410}
                    />
                    } 
                </Card>
            </Grid>
          
        </Grid>
    </>);
}
 
export default Home;