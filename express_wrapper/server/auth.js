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


    authMiddleware: function(req, res, next) {  
        
        let token = req.headers.authorization;

        const findUser = function (token){
            if(!token || token === 'null'){
                throw "User not found"
            }
            foundUser = req.db.any(`SELECT * FROM health.users WHERE token = '${token}'`)
            if(foundUser){
                return foundUser
                .then((data) => data[0])
            }
            else {
                throw "User not found"
            }
        }

        Promise.resolve(token)
        .then(token => findUser(token))
        .then(foundUser => {
            next()
        })
        .catch((error) =>{
            res.status(401).json("Not auth")
        })

    },

     logOut: function (req, res, next) {
        let token = req.headers.authorization;
        if(token === 'null'){
            return res.status(200).json();
        }

        const findUser = function (token){
            return req.db.any(`SELECT * FROM health.users WHERE token = '${token}'`)
            .then((data) => data[0])
        }

        const updateUserToken =  function( token, user){ 
            return req.db.any(`UPDATE health.users SET token = '${token}' WHERE  email = '${user.email}' RETURNING email, password, token`)
            .then((data) => data[0])
        }

        findUser(token)
        .then(foundUser => {
            updateUserToken(null, foundUser)
        })
        .catch((err) => console.error(err))

        return res.status(200).json();
    }
  
}