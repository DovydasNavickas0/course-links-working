const dotenv = require("dotenv");
const connectDB = require("./config/db")
const express = require('express')
const app = express()
app.use(express.json())
dotenv.config()

connectDB();

//createAuthor("Jolita", "Engages with javascript", "https://kitm.lt/")
//createCourse("Javascript courses", '63e603eed9bd7a8ba710c0f0')
// http://localhost:3001/api/course/

const {
    createCourse,
    getCourses,
    getFilterCourses,
    updateCourse,
    deleteCourse,
} = require('./controllers/CourseController');

const {
    createAuthor,
    getAuthors,
    getFilterAuthor,
    updateAuthor,
    deleteAuthor
} = require('./controllers/AuthorController')


app.post('/api/course', createCourse);
app.get('/api/course', getCourses);
app.get('/api/course/filter', getFilterCourses);
app.put('/api/course/:id', updateCourse)
app.delete('/api/course/:id', deleteCourse)

app.post('/api/author', createAuthor);
app.get('/api/author', getAuthors);
app.get('/api/author/filter', getFilterAuthor);
app.put('/api/author/:id', updateAuthor)
app.delete('/api/author/:id', deleteAuthor)

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on PORT ${process.env.PORT}`)
});
