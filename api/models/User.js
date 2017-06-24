/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require("bcryptjs");

module.exports = {

    attributes: {
        names: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            email: true,
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        last_logout: {
            type: 'string',
            datetime: true
        },
        //used in holding the date token was generated
        token_gen_date: {
            type: 'string',
            datetime: true
        },

        //attributes methods
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;

            return obj;
        }
    },
    //model validation messages definitions
    validationMessages: { //hand for i18n & l10n
        names: {
            required: 'Name is required'
        },
        email: {
            email: 'Provide valid email address',
            required: 'Email is required'
        },
        password: {
            required: 'Password is required'
        }
    },

    /**
     * this is called so we can create our password hash for us
     * before saving
     * @param values
     * @param cb
     */
    beforeCreate: function (values, cb) {

        // Hash password
        bcrypt.hash(values.password, 10, function (err, hash) {
            if (err) return cb(err);
            values.password = hash;
            cb();
        });
    },

    /**
     * incase there's update of password we must hash the password
     * @param values
     * @param cb
     */
    beforeUpdate: function (values, cb) {

        if (values.password) { //if it contains password , update the password
            // Hash password
            bcrypt.hash(values.password, 10, function (err, hash) {
                if (err) return cb(err);
                values.password = hash;
                cb();
            });
        } else
            cb();

    }
};

