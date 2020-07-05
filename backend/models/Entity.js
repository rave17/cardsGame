const {Schema, model} = require('mongoose');

const EntitySchema = new Schema({
    name : {type: String},
    hp: {type: Number, default: 20},
    shield: {type: Number},
    cards: {type: Number, default: 4},
    playTurn: {type: Boolean, default: true}
});

module.exports = model('Entity', EntitySchema);


