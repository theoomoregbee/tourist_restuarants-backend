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
    }
};

