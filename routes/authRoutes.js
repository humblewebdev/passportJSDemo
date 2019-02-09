var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        passport.authenticate(
            'local', 
            {session: false}, 
            function(error, user, info) {
                if (error || !user) {
                    return response.status(403).json({
                        message: 'Unable to Authorize',
                        user   : user,
                        error  : error,
                        info: info
                    });
                }
               request.login(user, {session: false}, function(error) {
                   if (error) {
                       response.send(error);
                   }
                   var sanitizedUser = {
                       id: user.id,
                       username: user.username,
                       email: user.email
                   };

                   // generate a signed son web token with the contents of user object and return it in the response
                   const token = jwt.sign(sanitizedUser, 'your_jwt_secret');
                   response.json(
                       {
                           user: sanitizedUser,
                           token: token
                       }
                   );
                });
            }
        )(request, response);
    });
};