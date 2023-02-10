const Course = require('../models/Courses');

const createCourse = async (req, res) => {
    
    if(!req.body.name || !req.body.author) res.status(404).send("Not found");

    const course = await Course.create({
        name: req.body.name,
        author: req.body.author,
    })

    res.status(200).json(course)
}

//-----------------------------------------------

const getCourses = async(req, res) => {

    const courses = await Course
        .find()
        .populate('author', 'name -_id') //name noriu gauti, bet id nenoriu
        .select('name');

    if(!courses) res.status(404).send("not found")

    res.status(200).json(courses)

}

//-----------------------------------------------

const getFilterCourses = async(req, res) => {

    if(!(req.body.name || req.body.author)) res.status(404).send("Not found");

    const course = await Course
        .find({ $or: [ 
            { name: req.body.name }, 
            { author: req.body.author } 
        ]})
        .populate('author', 'name -_id')
        .select('name')

        .catch(err => {console.log('filter broke', err)});

    if(!course) res.status(404).send("not found")
    
    res.status(200).json(course)

}

//-----------------------------------------------

const updateCourse = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    if(!(req.body.name || req.body.author)) res.status(404).send("Not found");

    const course = await Course.findById(req.params.id);
    if(!course) return // if it doesn't exist

    //if(course.isPublished) return; // if it's published

    if(req.body.name) course.name = req.body.name;
    if(req.body.author)  course.author = req.body.author;
    //if(req.body.ispublished) course.isPublished = req.body.ispublished;

    const result = await course.save();

    if(!result) res.status(404).send("Not found");

    res.status(200).json(result)
}

//-----------------------------------------------

const deleteCourse = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    const result = await Course.deleteOne({ _id: req.params.id });

    res.status(200).json(result)
}

module.exports = {
    createCourse,
    getCourses,
    getFilterCourses,
    updateCourse,
    deleteCourse
}