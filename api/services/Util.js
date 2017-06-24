/**
 * Created by theophy on 06/05/2017.
 *
 *
 * this is used to run utility type of services like sms, email and etc
 */
var jwt = require("jsonwebtoken");

module.exports = {

  /**
   * this is used to generate any token needed for application
   * to be functional
   * @param object_to_secure
   * @returns {*}
   */
  tokenGenerator: function (object_to_secure) {
    return jwt.sign(object_to_secure, Config.SECRET_KEY, {
      expiresIn: Config.TOKEN_EXPIRATION
    });
  }


};
