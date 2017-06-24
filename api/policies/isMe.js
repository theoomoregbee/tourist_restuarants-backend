/**
 * Created by theophy on 05/05/2017.
 *
 *
 * this here to help handle if a user is logged in or not
 * if not throw the person out using an exception of forbidden access
 */

module.exports = function (req, res, next) {
    var user = req.user;

    if (user.id != req.param('id'))
        return res.forbidden("You can't update for other people");

    next();
};
