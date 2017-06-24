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

        if (!user.access) return res.serverError("Access denied, please contact the ict admin.");

        req.user = user;
        next();
      });

    });

  } else {
    return res.forbidden("No token provided");
  }
};
