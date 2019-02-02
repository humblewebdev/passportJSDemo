var models = require("../models");
var passport = require("passport");
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        passport.authenticate(
            'local', 
            {session: false}, 
            function(error, user, info) {
                if (error || !user) {
                    return response.status(400).json({
                        message: 'Something is not right',
                        user   : user,
                        error  : error
                    });
                }
               request.login(user, {session: false}, (error) => {
                   if (error) {
                       response.send(error);
                   }
                   console.log("user: " + user.username);
                   // generate a signed son web token with the contents of user object and return it in the response
                   const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
                   response.json({user, token});
                });
            }
        )(request, response);
    });
};