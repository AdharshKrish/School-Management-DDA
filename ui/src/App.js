import React from "react"
import ReactDOM from "react-dom"
import {useSelector} from 'react-redux'
import NavBar from "./components/NavBar";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Login from "./components/Login";

const App = () => {

    const userdetails = useSelector(state => state.schoolstore.user_details)

    console.log("userdetails: ", JSON.stringify(userdetails))
    return (
        <React.Fragment>
            {(JSON.stringify(userdetails) === "{}" || userdetails === "") ? 
            <Login /> :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <NavBar />
            </LocalizationProvider>
            }
        </React.Fragment>
    )
}

export default App;