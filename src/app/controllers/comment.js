const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const Joi = require('joi');

//CREATE COMMENT
exports.createComment = async (req, res) => { 

    const apiVersion = req.headers['x-api-version'];
    
    const {  name, email, message, blogId } = req.body;

    if (apiVersion === '1') {

        try {

            const commentSchema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                message: Joi.string().required(),
                blogId: Joi.string().required()
            });
    
            const { error } = commentSchema.validate({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
                blogId: req.body.blogId
            }, {
            abortEarly: false,
            })
    
            if (error) return res.status(400).json({ 
                message: error.details[0].message
             });
    
            const blog = await Blog.findOne({ _id: blogId })
    
            if (!blog) return res.status(400).json({ 
                message: "Not found"
            });
    
            const comment = await Comment.create({ name, email, message, blogId });
            await comment.save();
            
            blog.comment.push(comment);
            await blog.save();
    
            res.status(200).json({ 
                message: "Comment created", 
                result: comment 
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