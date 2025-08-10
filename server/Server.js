const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors= require('colors');
const connectDB = require('./Config/ConnectDB');



const path = require("path");




dotenv.config();
const app = express();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());    
app.use('/uploads', express.static(path.join(__dirname, 'Controllers', 'uploads')));
//user routes
app.use('/api/v1/users', require('./Routes/UserRoutes'));

// teacher routes
app.use('/api/v1/teachers', require('./Routes/TeachersRoutes'));

// admin routes
app.use('/api/v1/admin', require('./Routes/AdminRoutes'));


// Count Routes
app.use('/api/v1/count',require('./Routes/CountRoutes'));

// User Profile Routes
app.use('/api/v1/userProfile',require('./Routes/UserProfileRoutes'));

// delete student route
app.use('/api/v1/deleteStudent',require('./Routes/DeleteStudentRoutes'));

// update student status route
app.use('/api/v1/updateStudentStatus',require('./Routes/UpdateStudentStatus'));

//teacher profile route`
app.use('/api/v1/teacherProfile',require('./Routes/TeacherProfileRoutes'));


// delete teacher route
app.use('/api/v1/deleteTeacher',require('./Routes/DeleteTeacherRoutes'));

// update teacher status route
app.use('/api/v1/updateTeacherStatus',require('./Routes/UpdateTeacherStatusRoutes'));

// all teacher name
app.use('/api/v1/',require('./Routes/TeachersNameRoutes'));

// add course route
app.use('/api/v1/course',require('./Routes/CourseAddRoutes'));

// all courses route
app.use('/api/v1/course',require('./Routes/AllcoursesRoutes'));

//course Details route
app.use('/api/v1/course/courseDetails',require('./Routes/SpecficCourseRoutes'));

// course delete route
app.use('/api/v1/course/deleteCourse',require('./Routes/DeleteCourseRoutes'));

// course update route
app.use('/api/v1/course/updateCourse',require('./Routes/UpdateCourseRoutes'));

//route for TeacherOwnProfile
app.use('/api/v1/course/Teacher/MyProfile',require('./Routes/TeacherAdminProfileRoutes'));

//route for AdminOwnProfile
app.use('/api/v1/course/Admin/MyProfile',require('./Routes/TeacherAdminProfileRoutes'));

//course approval status
app.use('/api/v1/course/UpdateCourseApprovalStatus',require('./Routes/CourseApprovalUpdateStatus'));

//course details
app.use('/api/v1/course/',require('./Routes/CourseDetailsRoutes'))

// publish course content
app.use('/api/v1/course',require('./Routes/CourseContentRoutes'))

// all course content
app.use('/api/v1/course',require('./Routes/AllCourseContentRoutes'));

// update course Content Status
app.use('/api/v1/course/updateStatus',require('./Routes/UpdateCourseContentRoutes'));

// delete course content
app.use('/api/v1/course/deleteCourseContent',require('./Routes/DeleteCourseContent'));


// course content details
app.use('/api/v1/course/courseContentDetails',require('./Routes/CourseContentDetailsRoutes'));


// course content update 
app.use('/api/v1/course/UpdateCourseContent',require('./Routes/CourseContentUpdateRoutes'));


//exam routes
app.use('/api/v1/exam',require('./Routes/ExamRoutes'));




// assignmment routes
app.use('/api/v1/assignmments',require('./Routes/Asignmment.routes'));
    
//jobs routes

app.use('/api/v1/jobs',require('./Routes/jobsRoutes'));

//jobs categoriesroutes.js
app.use('/api/v1/jobs/categories',require('./Routes/jobcategoryroutes'));

//booksroutes
app.use('/api/v1/books', require('./Routes/booksroutes.js'));








console.log('Mongo URI:', process.env.MONGO_URI);

//Connecting to DATABASE
connectDB();

//Assiging PORT
const PORT = process.env.PORT || 8080


//Listening PORT
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});
