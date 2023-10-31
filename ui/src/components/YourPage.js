import { Button, Card, CardContent, Container, Modal, Typography, Box, TextField, Switch, FormGroup, FormControlLabel, FormControl,InputLabel } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { submitAttendance, submitGrade, submitReportType } from '../store/actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';


const YourPage = () => {

const [modalFlag, setModalFlag] = useState(false);
const [modalFlagGrade, setModalFlagGrade] = useState(false);

const [checked, setChecked] = useState(true);
const [dateValue, setDateValue] = useState(null);
const [AttendanceData, setAttendanceData] = useState({studentID: null, classID: null, date: null, status: "Present", datestring: ''})
const [GradeData, setGradeData] = useState({studentID: null, courseID: null, grade: null})
const [ReportType, setReportType] = React.useState('');

const reportRows = useSelector(state => state.schoolstore.report_rows)
const userdetails = useSelector(state => state.schoolstore.user_details)



const AttendanceColumns = [
    {
      field: 'FirstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'LastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'StudentID',
      headerName: 'Student ID',
      type: 'number',
      width: 110,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
    },
    {
        field: 'attendance_percentage',
        headerName: 'Attendance Percentage',
        width: 190,
    },
    {
        field: 'ClassName',
        headerName: 'Class Name',
        width: 110,
    },
  ];

  const GradeColumns = [
    {
      field: 'FirstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'LastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'StudentID',
      headerName: 'Student ID',
      type: 'number',
      width: 110,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
    },
    {
        field: 'Grade',
        headerName: 'Grade',
        width: 190,
    },
    {
        field: 'CourseName',
        headerName: 'Course Name',
        width: 110,
    },
  ];

const rows = []

const handleChangeAction = (event) => {
  setReportType(event.target.value);
};

const defaultDate = dayjs().add(1, 'day');

const dispatch = useDispatch()

const handleChange = (event) => {
    setChecked(event.target.checked);
    setAttendanceData(prevData => ({...prevData, status: event.target.checked ? "Present" : "Absent"}))
};


const handleClose = () => {
    setModalFlag(false)
}

const handleCloseGrade = () => {
    setModalFlagGrade(false)
}

const onSubmit = () => {
    console.log("Submit Data: ", AttendanceData)
    dispatch(submitAttendance(AttendanceData))
}

const onSubmitGrade = () => {
    console.log("Submit Data: ", GradeData)
    dispatch(submitGrade(GradeData))
}

const handleReport = () => {
    if(userdetails.role === "student"){
        dispatch(submitReportType(ReportType, userdetails.StudentID))
    }else{
        dispatch(submitReportType(ReportType, ""))
    }
    
}

 return(
    <React.Fragment>
        <Container style={{padding: 0, margin: 0}}>
            <Card style={{width: '50rem', margin: '1rem', borderRadius: '1.5rem', boxShadow: '5px 5px 20px 4px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                <CardContent>
                    <Typography variant="subtitle1">Name: {userdetails.FirstName} {userdetails.LastName} </Typography>
                    <Typography variant="subtitle1">Role: {userdetails.role} </Typography>
                    <Typography variant="subtitle1">Email: {userdetails.email}</Typography>
                    <Typography variant="subtitle1">Phone: {userdetails.ContactNo}</Typography>
                </CardContent>
            </Card>
            {(userdetails.role === "staff" || userdetails.role === "admin") && <>
            <Button variant='contained' style={{margin: '0 1rem', background: '#6e45a4'}} onClick={() => setModalFlag(true)}>Mark Attendance</Button>
            <Button variant='contained' style={{margin: '0 1rem', background: '#6e45a4'}} onClick={() => setModalFlagGrade(true)}>Assign Grades</Button>
            </> }
            <FormControl fullWidth style={{margin: '2rem 1rem', width: 'auto'}}>
                <Box style={{width: '50rem'}}>
                    <InputLabel id="demo-simple-select-label" style={{ margin: '-0.3rem 0rem'}}>Report type</InputLabel>
                    <Select
                    style={{width: '20rem', height: '3rem'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ReportType}
                    label="Report type"
                    onChange={handleChangeAction}
                    >
                    <MenuItem value={'Attendance'}>Attendance</MenuItem>
                    <MenuItem value={'Grade'}>Grade</MenuItem>
                    </Select>
                    <Box fullWidth>
                        <Button variant='contained' style={{margin: '1rem 0', background: '#6e45a4', width: '15rem'}} onClick={handleReport}>{userdetails.role === "student" ? "View Details" : "View Students Details"}</Button>
                    </Box>
                </Box>
                <Box sx={{ height: 400, width: 1000 }}>
                    <DataGrid
                        rows={reportRows}
                        columns={ReportType === "Attendance" ? AttendanceColumns : GradeColumns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        getRowId={(row) => ReportType === "Attendance"? row.StudentID : row.GradeID}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </FormControl>
        </Container>

        <Modal
            open={modalFlag}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ width: '40rem', height: '50rem', margin: '10rem 20rem'}}
            >
            <Box style={{background: 'white', padding: '2rem', borderRadius: '0.6rem', display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6">Mark Attendance</Typography>
                <TextField id="outlined-basic" label="StudentID" value={AttendanceData.studentID} onChange={(event) => setAttendanceData(prevData => ({...prevData, studentID: event.target.value}))} variant="outlined" style={{margin: '1rem 0'}} />
                <TextField id="outlined-basic" label="ClassID" value={AttendanceData.classID} onChange={(event) => setAttendanceData(prevData => ({...prevData, classID: event.target.value}))} variant="outlined" style={{marginBottom: '1rem'}} />
                <DatePicker value={AttendanceData.date} onChange={(newValue) => setAttendanceData(prevData => ({...prevData, date: newValue, datestring: newValue.$d.toLocaleDateString()}))} noValidate/>
                <FormGroup style={{margin: '1rem 0'}}>
                    <FormControlLabel control={
                    <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} 
                    label={checked ? "Present" : "Absent"}
                />
                </FormGroup>
                
                <Button variant='contained' style={{background: '#6e45a4', width: '10rem', marginTop: '1rem', alignSelf: 'center'}} onClick={onSubmit}>Submit</Button>
                <Button variant='contained' style={{background: '#6e45a4', width: '10rem', marginTop: '1rem', alignSelf: 'center'}} onClick={handleClose}>Close</Button>
            </Box>
        </Modal>

        <Modal
            open={modalFlagGrade}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ width: '40rem', height: '50rem', margin: '10rem 20rem'}}
            >
            <Box style={{background: 'white', padding: '2rem', borderRadius: '0.6rem', display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6">Assign Grades</Typography>
                <TextField id="outlined-basic" label="StudentID" value={GradeData.studentID} onChange={(event) => setGradeData(prevData => ({...prevData, studentID: event.target.value}))} variant="outlined" style={{margin: '1rem 0'}} />
                <TextField id="outlined-basic" label="CourseID" value={GradeData.courseID} onChange={(event) => setGradeData(prevData => ({...prevData, courseID: event.target.value}))} variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField id="outlined-basic" label="Grade" value={GradeData.grade} onChange={(event) => setGradeData(prevData => ({...prevData, grade: event.target.value}))} variant="outlined" style={{marginBottom: '1rem'}} />
                
                <Button variant='contained' style={{background: '#6e45a4', width: '10rem', marginTop: '1rem', alignSelf: 'center'}} onClick={onSubmitGrade}>Submit</Button>
                <Button variant='contained' style={{background: '#6e45a4', width: '10rem', marginTop: '1rem', alignSelf: 'center'}} onClick={handleCloseGrade}>Close</Button>
            </Box>
        </Modal>
    </React.Fragment>
 )   
}

export default YourPage