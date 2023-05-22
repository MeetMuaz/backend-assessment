'use strict';

module.exports =  (app) => {

    const blogController = require('../controllers/blog');
    const commentController = require('../controllers/comment');
    const userController = require('../controllers/user');
    
    //MIDDLEWARE
    const auth = require('../middlewares/auth');

    // BLOG ROUTES
    app.route('/api/blog/create')
        .post(auth, blogController.createBlog);

    app.route('/api/blog/read')
        .get(blogController.readAllBlog);

    app.route('/api/blog/read/:blogId')
        .get(blogController.readOneBlog);

    app.route('/api/blog/update/:blogId')
        .patch(auth, blogController.updateOneBlog);
    
    app.route('/api/blog/delete/:blogId')
        .delete(auth, blogController.deleteOneBlog);

   // COMMENT ROUTES 
   app.route('/api/blog/comment')
        .post(auth, commentController.createComment);

    // USER ROUTES
    app.route('/api/user/register')
        .post(userController.userRegister);

    app.route('/api/user/login')
        .post(userController.userLogin);

}