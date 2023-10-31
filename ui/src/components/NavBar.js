import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import {Box, Typography, List, ListItem, ListItemButton, ListItemText} from "@mui/material"
import Home from "./Home"
import {BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Profile from "./Profile"
import YourPage from "./YourPage"

const NavBar = () => {

  const[selectedState, setSelectedState] = useState(false)
  const[selectedPath, setSelectedPath] = useState("");
  const userdetails = useSelector(state => state.schoolstore.user_details)

  let url = window.location.href
  let path = url.split("/");

  console.log("URL path loist:", path)

  useEffect(() => {
    let url = window.location.href
    let path = url.split("/");
    console.log("path: ", path[3])
    setSelectedPath(path[3])

  },[selectedState])
 return (
    <React.Fragment>
    <Router>
    <Box style={{backgroundColor: '#6e45a4', margin: "0px !important", padding: "0.2rem", color: "white", display: 'flex'}}>
    <Box style={{width: '85%'}}>
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
            margin: '0.7rem 0.5rem',
            paddingTop: '0.4rem'
        }}
        >
        SCHOOL MANAGEMENT
        </Typography>
        </Box>
        <Box>
        <List style={{display: 'flex', flexDirection: 'row'}}>
          <ListItem disablePadding>
           {selectedPath === "" ?
            <ListItemButton selected="true" style={{border: '1px solid #6e45a4', background: 'white', color: '#6e45a4', borderRadius: '2rem'}} onClick={() => setSelectedState(!selectedState)}>
                <Link to="/" style={{textDecoration: 'none'}}>Home</Link>
            </ListItemButton> : 
            <ListItemButton  onClick={() => setSelectedState(!selectedState)}>
                <Link to="/" style={{textDecoration: 'none', color: '#ffff'}}>Home</Link>
            </ListItemButton>
           }
          </ListItem>
          {userdetails.role === "admin" &&
          <ListItem disablePadding>
          {selectedPath === "Admin" ?
            <ListItemButton selected="true" style={{border: '1px solid #6e45a4', background: 'white', color: '#6e45a4', borderRadius: '2rem'}} onClick={() => setSelectedState(!selectedState)}>
                <Link to="/Admin" style={{textDecoration: 'none'}}>Admin</Link>
            </ListItemButton> : 
            <ListItemButton onClick={() => setSelectedState(!selectedState)}>
                <Link to="/Admin" style={{textDecoration: 'none', color: '#ffff'}}>Admin</Link>
            </ListItemButton>
          }
          </ListItem>
          }
          <ListItem disablePadding>
          {selectedPath === "About" ?
            <ListItemButton selected="true" style={{border: '1px solid #6e45a4', background: 'white', color: '#6e45a4', borderRadius: '2rem'}} onClick={() => setSelectedState(!selectedState)}>
                <Link to="/About" style={{textDecoration: 'none'}}>About</Link>
            </ListItemButton> : 
            <ListItemButton onClick={() => setSelectedState(!selectedState)}>
                <Link to="/About" style={{textDecoration: 'none', color: '#ffff'}}>About</Link>
            </ListItemButton>
          }
          </ListItem>
          <ListItem disablePadding>
          {selectedPath === "Help" ?
            <ListItemButton selected="true" style={{border: '1px solid #6e45a4', background: 'white', color: '#6e45a4', borderRadius: '2rem'}} onClick={() => setSelectedState(!selectedState)}>
                <Link to="/Help" style={{textDecoration: 'none'}}>Help</Link>
            </ListItemButton> : 
            <ListItemButton onClick={() => setSelectedState(!selectedState)}>
                <Link to="/Help" style={{textDecoration: 'none', color: '#ffff'}}>Help</Link>
            </ListItemButton>
          }
          </ListItem>
          <ListItem disablePadding>
          {selectedPath === "YourPage" ?
            <ListItemButton selected="true" style={{border: '1px solid #6e45a4', background: 'white', color: '#6e45a4', borderRadius: '2rem'}} onClick={() => setSelectedState(!selectedState)}>
                <Link to="/YourPage" style={{textDecoration: 'none'}}>Profile</Link>
            </ListItemButton> : 
            <ListItemButton onClick={() => setSelectedState(!selectedState)}>
                <Link to="/YourPage" style={{textDecoration: 'none', color: '#ffff'}}>Profile</Link>
            </ListItemButton>
          }
          </ListItem>
        </List>
        </Box>
    </Box>
    <Routes> 
      <Route exact path='/' element={<Home />}></Route> 
      <Route exact path='/Admin' element={<Profile />}></Route>
      <Route exact path='/YourPage' element={<YourPage />}></Route> 
    </Routes> 
    </Router>
    </React.Fragment>
 )
}

export default NavBar;
