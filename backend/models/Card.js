const {Schema, model} = require('mongoose');

const CardSchema = new Schema({
    name: {type: String},
    effect: {type: String},
    value: {type: Number}
});

module.exports = model('Card', CardSchema);

