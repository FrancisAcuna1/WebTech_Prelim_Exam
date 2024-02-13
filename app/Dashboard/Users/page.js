"use client"
import React, { useSyncExternalStore } from "react";
import Navbar from "../navbar";
import { useState, useEffect } from "react";
import { CardActionArea, CardContent, CardHeader, Grid, Card, Typography, Avatar, ListItemIcon, Button, IconButton, Skeleton} from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const User = () => {
    const [user, setUser] = useState([{
        id: null,
        name: null,
        email: null,
        address: {
            street: null,
            suite: null,
            city: null,
            zipcode: null,
            geo: {
            lat: null,
            lng: null,
            },
        },
        phone: null,
        website: null,
        company: {
            name: null,
            catchPhrase: null,
            bs: null,
        },
    }]);
    const [loading, setLoading] = useState(false)

    useEffect (() => {
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


    return ( <>
        <Navbar/>
        <Grid container spacing={4}>
            {user.map((users, index) => {
                return (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                        <Card sx={{ maxWidth: 340, justifyContent: "center", alignItems: "center", borderRadius:4}} elevation={4}>
                            <CardActionArea>
                                {loading ? (
                                    <Skeleton animation="wave" height={30} width="80%" />
                                ):(
                                    <>
                                        <ListItemIcon
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start', // Align to the left
                                            marginTop: '-6px',
                                            marginLeft: "12px"
                                            }}
                                    >
                                        <AccountCircleOutlinedIcon fontSize="large" color="error" />
                                    
                                        <CardHeader  title={users.name} style={{ color: 'black' }} />
                                    </ListItemIcon>
                                            
                                    <CardContent>   
                                    <Typography variant="body2">
                                            {`Email: ${users.email}`}
                                            <br/>
                                            {`Address: ${users.address.street} ${users.address.suite}, ${users.address.city}`}
                                            <br/>
                                            {`Zip Code: ${users.address.zipcode}`}
                                    </Typography>
                                    </CardContent>

                                    <CardContent>   
                                    <Typography variant="body1" gutterBottom>
                                            {`Phone no.:  ${users.phone}`}
                                            <br/>
                                            {`Website: ${users.website}`}
                                            <br/>
                                            {`Company Name: ${users.company.name}`}
                                    </Typography>
                                    <Button variant="outlined" href={"/Dashboard/Todo?userId="+users.id} gutterBottom sx={{marginTop:'20px'}}>View User's Todo's</Button>
                                    </CardContent>
                                    
                                    </>
                                )}
                                
                                
                            </CardActionArea>
                            
                        </Card>
                    </Grid>
                );
            })}
        
        </Grid>
        
    </> );
}
 
export default User;