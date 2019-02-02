var models = require("../models");

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        models.user.findOne(
            {
                where: {
                    username: request.body.username
                }
            }
        ).then(
            function(user) {
                user.validPassword(request.body.password)
            }
        )
    });
};