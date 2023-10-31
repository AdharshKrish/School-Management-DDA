import express from 'express'
import {getReport, getStudents, getStudentsCount, submitAttendance, submitGrade, loginAuth, getReportByID} from './database.js';

const app = express()

app.use(express.json())

app.get("/test", (req,res) => {
    res.send("Hello test server running at port 8080!!")
})

app.get("/getStudents", async (req,res) => {
    const students = await getStudents();
    res.send(students)
})

app.get("/getStudentsCount", async (req,res) => {
    const students = await getStudentsCount();
    res.send(students)
})

app.post("/submitAttendance", async (req,res) => {
    console.log("Request: ", req.body);
    const Attendance = await submitAttendance(req.body);
    res.send(Attendance)
})

app.post("/submitGrade", async (req,res) => {
    console.log("Request: ", req.body);
    const Grades = await submitGrade(req.body);
    res.send(Grades)
})

app.get("/getReport", async (req,res) => {
    console.log("Request: ", req.query.data);
    const report = await getReport(req.query.data);
    res.send(report)
})

app.get("/getReportByID", async (req,res) => {
    console.log("Request: ", req.query.data);
    const report = await getReportByID(req.query.data, req.query.id);
    res.send(report)
})

app.get("/loginAuth", async (req,res) => {
    console.log("Request: ", req.query.data);
    const report = await loginAuth(req.query.data);
    res.send(report)
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('hello')
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})