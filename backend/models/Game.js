const {Schema, model} = require('mongoose');

const GameSchema = new Schema({
    idMonster: {type: String},
    idPlayer: {type: String},
    turns: {type: Number, default: 12}
});

module.exports = model('Game', GameSchema);

