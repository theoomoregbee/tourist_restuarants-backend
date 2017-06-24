/**
 * Review.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        user: { //the user wants to save a review
            model: 'user',
            required: true
        },
        placeID: {
            type: 'string',
            required: true
        },
        review: {
            type: 'string',
            required: true
        }
    },

    //model validation messages definitions
    validationMessages: { //hand for i18n & l10n
        user: {
            required: 'User is required'
        },
        placeID: {
            required: 'Place is required'
        },
        review: {
            required: 'Review is required'
        }
    }
};

