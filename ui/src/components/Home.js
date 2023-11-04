import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ReactDOM from "react-dom"
import {Box, Typography} from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { getStudentsCount } from '../store/actions';

const Home = () => {
    const StudentCount = useSelector(state => state.schoolstore.count)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStudentsCount());
    }, [])

    return(
        <React.Fragment>
        <Container style={{display: "flex"}}>
            <Card sx={{ minWidth: 50 }} style={{width: '20rem', height: '7rem', marginLeft:'2.5rem',  borderLeft: '5px solid #6e45a4', marginTop: 20,boxShadow: '-2px 2px 12px 5px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                <CardContent>
                    <h2 style={{margin: 0 }}>Students</h2>
                    <h2 style={{marginTop: '1rem' }}>{StudentCount}</h2>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 50 }} style={{width: '20rem', height: '7rem', marginLeft:'2.5rem', borderLeft: '5px solid #6e45a4', marginTop: 20, marginLeft: 40, boxShadow: '-2px 2px 12px 5px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                <CardContent>
                <h2 style={{margin: 0 }}>Staff</h2>
                    <h2 style={{marginTop: '1rem' }}>7000</h2>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 50 }} style={{width: '20rem', height: '7rem', marginLeft:'2.5rem', borderLeft: '5px solid #6e45a4', marginTop: 20, marginLeft: 40, boxShadow: '-2px 2px 12px 5px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                <CardContent>
                <h2 style={{margin: 0 }}>Admin</h2>
                    <h2 style={{marginTop: '1rem' }}>5</h2>
                </CardContent>
            </Card>
        </Container>
        <Container>
            <Box>
                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.02rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    margin: '2rem 2.5rem',
                    paddingTop: '0.4rem'
                }}
                >
                Announcements
                </Typography>
            </Box>
            <Box style={{background: '#6e45a4', padding: '0.2rem 0', margin: '2.5rem', borderRadius: '5px'}}>
            <Card style={{margin: '1rem'}}>
                <CardContent style={{padding: '0 1rem'}}>
                    <h4>General</h4>
                    <h2 style={{margin: 0 }}>EC2 Examination results published</h2>
                    <h4 style={{fontWeight: 'normal' }}>description</h4>
                </CardContent>
            </Card>
            <Card style={{margin: '1rem'}}>
            <CardContent style={{padding: '0 1rem'}}>
                    <h4>Database Design and Analysis</h4>
                    <h2 style={{margin: 0 }}>Project submission date is 4th November</h2>
                    <h4 style={{fontWeight: 'normal' }}>description</h4>
            </CardContent>
            </Card>
            </Box>
        </Container>
        </React.Fragment>
    )
}

export default Home;