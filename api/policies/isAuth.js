/**
 * Created by theophy on 05/05/2017.
 *
 *
 * this here to help handle if a user is logged in or not
 * if not throw the person out using an exception of forbidden access
 */
var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];

        if (bearer[0] !== Config.BEARER) {
            return res.forbidden("bearer not understood");
        }


        //verify if this token was from us or not
        jwt.verify(bearerToken, Config.SECRET_KEY, function (err, decoded) {
            if (err) {
                sails.log("verification error", err);
                if (err.name === "TokenExpiredError")
                    return res.forbidden("Session timed out, please login again");
                else
                    return res.forbidden("Error authenticating, please login again");
            }


            User.findOne(decoded.id).exec(function callback(error, user) {
                if (error) return res.serverError(err);

                if (!user) return res.serverError("User not found");

                //check if the user last logged-in is greater than when the token was given
                if (new Date(decoded.token_gen_date) < new Date(user.last_logout))
                    return res.forbidden("Please login again, token is not valid");

                req.user = user;
                next();
            });

        });

    } else {
        return res.forbidden("No token provided");
    }
};
