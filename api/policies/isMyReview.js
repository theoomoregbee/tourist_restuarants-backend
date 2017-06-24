/**
 * Created by theophy on 05/05/2017.
 *
 *
 * this here to help handle if a user is logged in or not
 * if not throw the person out using an exception of forbidden access
 */

module.exports = function (req, res, next) {
    var user = req.user;

    req.validate({
        id: 'string'
    });

    Review.findOne(req.param('id')).exec(function cb(err, review) {
        if (err)
            return res.negotiate(err);

        if (!review)
            return res.serverError("Review not found");

        if (review.user.id != user.id)
            return res.forbidden("You can only perform this action on your reviews");

        next();

    });
};
