const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if(err){
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json({
      user
    });
  })

};

exports.signin = (req, res) => {
  // find user based on Email
  const {email, password} = req.body
  User.findOne( { email }, (err, user)  => {
    if(err || !user) {
      return res.status(400).json({
        error: 'User with email does not exist. Please sign up'
      });
    };
    // if user is found make sure email and password matches
    if( !user.authenticate(password) ){
      return res.status(401).json({
        error: 'email and password dont match'
      })
    }
    //generate signed token with userid and secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.cookie('t',token,{expire: new Date() + 9999})
    const {_id, name, email, role} = user
    return res.json({token, user: {_id, email, name, role}});
  });

};

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({message: "signout success"});
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
