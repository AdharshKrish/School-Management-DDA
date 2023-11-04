import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    // password: 'adminroot',
    database: 'school_db'
}).promise()

export async function getStudents(){
    const [rows] = await pool.query("SELECT * FROM students")
    return rows
}

export async function getStudentsCount(){
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM students")
    return rows
}

export async function submitAttendance(data){
    console.log("DATA from database.js file: ", data)

    let finalData = {
        studentID: Number(data.studentID),
        classID: Number(data.classID),
        datestring: data.datestring,
        status: data.status
    }

    console.log("final prepared data: ", finalData)

    const rows = await pool.query("INSERT INTO attendance(StudentID, ClassID, Date, status) VALUES (?, ?, STR_TO_DATE( ?, '%m/%d/%Y'), ?)", [finalData.studentID, finalData.classID, finalData.datestring, finalData.status])
    return rows
}

export async function submitGrade(data){
    console.log("DATA from database.js file: ", data)

    let finalData = {
        studentID: Number(data.studentID),
        courseID: Number(data.courseID),
        grade: data.grade,
    }

    console.log("final prepared data: ", finalData)

    const rows = await pool.query("INSERT INTO grades(StudentID, CourseID, Grade) VALUES (?, ?, ?)", [finalData.studentID, finalData.courseID, finalData.grade])
    return rows
}

export async function getReport(data){
    console.log("DATA from database.js file: ", data)
    let rows;
    if(data === "Attendance"){
        rows = await pool.query("SELECT st.FirstName, st.LastName, st.StudentID, cl.ClassName, (count(at.status)/10 * 100) as attendance_percentage FROM students st, attendance at, class cl WHERE st.StudentID = at.StudentID and cl.ClassID = at.ClassID and at.status='Present' group by st.StudentID, cl.ClassID");
    }else{
        rows = await pool.query("SELECT st.FirstName, st.LastName, st.StudentID, cs.CourseName, gr.Grade, gr.GradeID FROM students st, grades gr, course cs WHERE st.StudentID = gr.StudentID and cs.CourseID = gr.CourseID group by st.StudentID, cs.CourseID");
    }
    return rows
}

export async function getReportByID(data, id){
    console.log("DATA from database.js file: ", data)
    id = Number(id)
    let rows;
    if(data === "Attendance"){
        rows = await pool.query("SELECT st.FirstName, st.LastName, st.StudentID, cl.ClassName, (count(at.status)/10 * 100) as attendance_percentage FROM students st, attendance at, class cl WHERE st.StudentID = at.StudentID and cl.ClassID = at.ClassID and at.status='Present' and at.StudentID = ? group by st.StudentID, cl.ClassID", [id]);
    }else{
        rows = await pool.query("SELECT st.FirstName, st.LastName, st.StudentID, cs.CourseName, gr.Grade, gr.GradeID FROM students st, grades gr, course cs WHERE st.StudentID = gr.StudentID and cs.CourseID = gr.CourseID and gr.StudentID = ? group by st.StudentID, cs.CourseID, gr.GradeID", [id]);
    }
    return rows
}

export async function loginAuth(data){
    console.log("DATA from database.js file: ", data)
    let [rows] = await pool.query("SELECT * FROM login WHERE username=? AND password=?", [data.username, data.password]);
    console.log("login result: ", rows)

    let details;
    if(rows.length > 0){
        if(rows[0].role === "student"){
            [details] = await pool.query("SELECT * FROM students WHERE email=?", [rows[0].username])
        }else{
            [details] = await pool.query("SELECT * FROM faculty WHERE email=?", [rows[0].username])
        }
        details[0].role = rows[0].role
    }else{
        details = []
    }


    console.log("USER DETAILS: ", details[0]);
   
    return details[0]
}
// const students = await getStudents();
// console.log(students)