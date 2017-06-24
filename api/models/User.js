/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
    }
};

