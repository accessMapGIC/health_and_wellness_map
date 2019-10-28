const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const crypto  = require('crypto');

module.exports = { 
    signin: function(req, res, next) {  
        const userReq = req.body

        const findUser = function (userReq){
            return req.db.any(`SELECT * FROM health.users WHERE email = '${userReq.email}'`)
            .then((data) => data[0])
        }

        const checkPassword =  function(reqPassword, passwordHash){    
            return new Promise((resolve, reject) =>
             
                bcrypt.compare(reqPassword, passwordHash ,  function(err, response) {

                    if (err) {
                        reject(err)
                    }
                    else if (response) {
                        resolve(response);
                    } else {
                        reject('Passwords do not match.');
                    }

                })
            )
          
        }
      
        const updateUserToken =  function( token, user){ 
            return req.db.any(`UPDATE health.users SET token = '${token}' WHERE  email = '${user.email}' RETURNING email, password, token`)
            .then((data) => data[0])
        }
    
      // crypto ships with node - we're leveraging it to create a random, secure token
        const createToken = function(){
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, data) => {
                    err ? reject(err) : resolve(data.toString('base64'))
                })
            })
        }

    
        findUser(userReq)
        .then(foundUser => {
            if (foundUser){
                 return (checkPassword(userReq.password, foundUser.password))
                }
            else {
                throw "User not found"
                }
            })
        .then((res) => createToken())
        .then(token => updateUserToken(token, userReq))
        .then((userReq) => {
            delete userReq.password
            res.status(200).json(userReq)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err);
        })
    },                 

    auth: function(req, res, next) {  

        const userReq = req.body


        const findUser = function (userReq){
            return req.db.any(`SELECT * FROM health.users WHERE token = '${userReq.token}'`)
            .then((data) => data[0])
        }

        findUser(userReq)
        .then(foundUser => {
            res.status(200).json(foundUser)
        })
        // .then((userReq) => {
        //     delete userReq.password
        //     res.status(200).json(userReq)
        // }) probably need to delete the info about the user
        .catch((err) => console.error(err))

    }
  
  
}