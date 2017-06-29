/**
 * PublicReview.js
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
        placeID: {
            type: 'string',
            required: true
        },
        review: {
            type: 'string',
            required: true
        },
        rating: {
            type: 'integer',
            required: true,
            max: 5,
            min: 1
        }
    },

    //model validation messages definitions
    validationMessages: { //hand for i18n & l10n
        names: {
            required: 'name is required'
        },
        placeID: {
            required: 'Place is required'
        },
        review: {
            required: 'Review is required'
        },
        rating: {
            required: 'Rating is required',
            max: 'Rating must not exceed 5',
            min: 'Rating must not be empty'
        }
    }
};

