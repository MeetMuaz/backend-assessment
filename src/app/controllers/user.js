const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// REGISTER USER
exports.userRegister = async (req, res) => {

  const apiVersion = req.headers['x-api-version'];

    const { name, email, bio, password } = req.body;

    if (apiVersion === '1') {

      try {
        const userSchema = Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          bio: Joi.string().required(),
          password: Joi.string().required()
        });
    
        const { error } = userSchema.validate(
          {
            name: req.body.name,
            email: req.body.email,
            bio: req.body.bio,
            password: req.body.password
          },
          {
            abortEarly: false
          }
        );
    
        if (error) return res.status(400).json({ 
          message: error.details[0].message 
        });
    
        const user = await User.findOne({ email });
    
        if (user)
          return res.status(409).json({
            message: "Email exists"
          });
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        await User.create({ name, email, bio, password: hashedPassword });
    
        res.status(200).json({
          message: "User created"
        });

      } catch (error) {

        res.status(500).json({
          message: "Server error"
        });

      }

    } else {
        return res.status(400).json({ 
          message: 'Unsupported API version'
        });
    }
  
  };
  
  // LOGIN USER
  exports.userLogin = async (req, res) => {

    const apiVersion = req.headers['x-api-version'];

    const { email, password } = req.body;

    if (apiVersion === '1') {
      try {
        const userSchema = Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required()
        });
    
        const { error } = userSchema.validate(
          {
            email: req.body.email,
            password: req.body.password
          },
          {
            abortEarly: false
          }
        );
    
        if (error)
          return res.status(400).json({
            message: error.details[0].message
          });
    
        const user = await User.findOne({ email });
    
        if (!user)
          return res.status(404).json({
            message: "Not found"
          });
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if (!isPasswordCorrect)
          return res.status(401).json({
            message: "Unauthorized"
          });
    
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
        res.status(200).json({
          message: "User login",
          result: user,
          token: token
        });

      } catch (error) {

        res.status(500).json({
          message: "Server error"
        });

      }
    } else {

        return res.status(400).json({ 
          message: 'Unsupported API version'
        });

    }
  
  };
  