const Blog = require('../models/Blog');
const Joi = require('joi');


// CREATE
exports.createBlog = async (req, res) => { 

    const apiVersion = req.headers['x-api-version'];

    const {  userId, title, content } = req.body

    if (apiVersion === '1') {

        try {

            const blogSchema = Joi.object({
                userId: Joi.string().required(),
                title: Joi.string().required(),
                content: Joi.string().required(),
            });
    
            const { error } = blogSchema.validate({
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content
            }, {
            abortEarly: false,
            })
    
            if (error) return res.status(400).json({ 
                message: error.details[0].message 
            });
    
            const blog = await Blog.create({ userId, title, content});
    
            await blog.save();
    
            res.status(200).json({ 
                message: "Blog created" 
            });
    
        } catch (error) {
    
            res.status(500).json({  
                message: "Server Error" 
            });
            console.log(error)
    
        }

    } else {

        return res.status(400).json({ 
            message: 'Unsupported API version'
        });

    }

};

// READ ALL
exports.readAllBlog = async (req, res) => {

    const apiVersion = req.headers['x-api-version'];

    if (apiVersion === '1') {

        try {

            const blog = await Blog.find()
            .populate('comment')
            .populate('userId');
    
            res.status(200).json({ 
                message: "Blog fetched", 
                result: blog  
            });
            
        } catch (error) {
            
            res.status(500).json({ 
                message: "Server Error" 
            });
            console.log(error)
    
        }

    } else {

        return res.status(400).json({ 
            message: 'Unsupported API version'
        });

    }

};

//READ ONE
exports.readOneBlog = async (req, res) => {

    const apiVersion = req.headers['x-api-version'];

    const blogId = req.params.blogId

    if (apiVersion === '1') {

        try {

            const blog = await Blog.findOne({ _id: blogId })
            .populate('comment')
            .populate('userId');
    
            res.status(200).json({  
                message: "Blog fetched", 
                result: blog  
            });
            
        } catch (error) {
            
            res.status(500).json({ 
                message: "Server Error" 
            });
    
        }

    } else {
        return res.status(400).json({ 
            message: 'Unsupported API version'
        });
    }

};

// UPDATE
exports.updateOneBlog = async (req, res) => {

    const apiVersion = req.headers['x-api-version'];

    const blogId = req.params.blogId;

    if (apiVersion === '1') {

        try {
            const updatedBlog = {
              userId: req.body.userId,
              title: req.body.title,
              content: req.body.content
            };
        
            await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true });
        
            res.status(200).json({
              message: "Blog updated",
            });
      
          } catch (error) {
      
            res.status(500).json({
              message: "Server Error"
            });
      
          }

    } else {

        return res.status(400).json({
             message: 'Unsupported API version'
            });

    }
  
  };
  

//DELETE
exports.deleteOneBlog = async (req, res) => {

    const apiVersion = req.headers['x-api-version'];

    const blogId = req.params.blogId;

    if (apiVersion === '1') {

        try {

            const blog = await Blog.deleteOne({ _id: blogId });
    
            res.status(204).json({  
                message: "Blog deleted"
            });
    
        } catch (error) {
                
            res.status(500).json({ 
                message: "Server Error" 
            });
    
        }

    } else {

        return res.status(400).json({ 
            message: 'Unsupported API version'
        });

    }
    
}

