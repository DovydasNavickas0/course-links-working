const Author = require('../models/Author');

const createAuthor = async (req, res) => {
    
    if(!req.body.name || !req.body.bio) res.status(404).send("Not found");

    const author = await Author.create({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(200).json(author)

}

//-----------------------------------------------

const getAuthors = async(req, res) => {

    const authors = await Author.find();

    if(!authors) res.status(404).send("not found")

    res.status(200).json(authors)

}

//-----------------------------------------------

const getFilterAuthor = async(req, res) => {

    if(!(req.body.name || req.body.bio)) res.status(404).send("Not found");

    const author = await Author
    .find({ $or: [ { name: req.body.name }, 
        {bio: req.body.bio} ] })

    .catch(err => {console.log('filter broke', err)});

    if(!author) res.status(404).send("not found")
    
    res.status(200).json(author)

}

//-----------------------------------------------

const updateAuthor = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    if(!(req.body.name || req.body.bio)) res.status(404).send("Not found");

    const author = await Author.findById(req.params.id);
    if(!author) return // if it doesn't exist

    //if(course.isPublished) return; // if it's published

    if(req.body.name) author.name = req.body.name;
    if(req.body.bio)  author.bio = req.body.bio;
    //if(req.body.ispublished) course.isPublished = req.body.ispublished;

    const result = await author.save();

    if(!result) res.status(404).send("Not found");

    res.status(200).json(result)
}

//-----------------------------------------------

const deleteAuthor = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    const result = await Author.deleteOne({ _id: req.params.id });

    res.status(200).json(result)
}

module.exports = {
    createAuthor,
    getAuthors,
    getFilterAuthor,
    updateAuthor,
    deleteAuthor
}