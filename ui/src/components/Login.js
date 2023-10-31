import React, {useState, useEffect} from  'react'
import {useDispatch} from 'react-redux'
import ReactDOM from "react-dom"
import {Box, Typography, TextField, Button} from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { handleAuthLogin } from '../store/actions';

const Login = () => {

    const [userDetails, setUserDetails] = useState({username: '', password: ''})
    const dispatch = useDispatch()

    const handleLoginSubmit = () => {
        dispatch(handleAuthLogin(userDetails))
    }


    return(
        <React.Fragment>
             <Container style={{display: "flex", background: '#6e45a4', height: '97vh'}}>
                <Card sx={{ minWidth: 50 }} style={{alignSelf: 'center', marginLeft: '33%', background: '#ffff',width: '25rem', height: '20rem', marginTop: 20,boxShadow: '-2px 2px 12px 5px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                    <CardContent>
                        <h2 style={{margin: 0 }}>Login</h2>
                        <TextField id="outlined-basic" label="Username" value={userDetails.username} onChange={(event) => setUserDetails(prevData => ({...prevData, username: event.target.value}))} variant="outlined" style={{margin: '1rem 0', width: '20rem'}} />
                        <TextField id="outlined-basic" label="Password" type='password' value={userDetails.password} onChange={(event) => setUserDetails(prevData => ({...prevData, password: event.target.value}))} variant="outlined" style={{margin: '1rem 0', width: '20rem'}} />
                        <Button variant='contained' style={{background: '#6e45a4', width: '10rem', marginTop: '1rem', alignSelf: 'center'}} onClick={handleLoginSubmit}>Login</Button>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default Login;