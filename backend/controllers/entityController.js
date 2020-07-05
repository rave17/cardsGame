const Entity = require('../models/Entity')
const Card = require('../models/Card')
const Game = require('../models/Game')
const Resolver = require('../resolvers/cardResolver')
const ValidationResolver = require('../resolvers/validationResolver')

const entityController = {}

//GET ENTITY STATUS -> Monster or Plater
entityController.status = (req, res) => {
    const { entityId } = req.query;
    console.log(req.query);
    try {
        Entity.findById(entityId, function (err, result) {
            if (err) {
                throw err;
            }
            res.status(200).send(result);
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const returnResult = function (err, result) {
    if (err) {
        throw err;
    }
    return result;
};

//PLAYER TURN
entityController.playerTurn = async (req, res) => {
    const { idGame, idCard } = req.body;

    try {
        let game = await Game.findById(`${idGame}`, returnResult);

        if (!game) {
            return res.status(404).send('Game not found');
        }

        let { idMonster, idPlayer, turns } = game;

        if (turns <= 0) {
            return res.status(200).send(`Game over - turns ${turns}`);
        }

        let card = await Card.findById(`${idCard}`, returnResult);
        let player = await Entity.findById(`${idPlayer}`, returnResult);
        let monster = await Entity.findById(`${idMonster}`, returnResult);

        let validationMessages = ValidationResolver(card, player);

        console.log(validationMessages);

        if (validationMessages) {
            return res.status(404).send(validationMessages);
        }

        let { effect, value } = card;
        player = Resolver(player, effect, value);
        game.turns--;
        
        game.save();
        player.save();
        monster.save();

        return res.status(200).send({
            game,
            player,
            monster,
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

//MONSTER TURN
entityController.monsterTurn = async(req, res) => {
    const { idGame, idCard } = req.body;
    try {
        let game = await Game.findById(`${idGame}`, returnResult);

        if (!game) {
            return res.status(404).send('Game not found');
        }

        let { idMonster, idPlayer, turns } = game;

        if (turns <= 0) {
            return res.status(200).send(`Game over - turns ${turns}`);
        }

        let card = await Card.findById(`${idCard}`, returnResult);
        let player = await Entity.findById(`${idPlayer}`, returnResult);
        let monster = await Entity.findById(`${idMonster}`, returnResult);

        let validationMessages = ValidationResolver(card, monster);

        console.log(validationMessages);

        if (validationMessages) {
            return res.status(404).send(validationMessages);
        }

        let { effect, value } = card;
        monster = Resolver(player, effect, value);
        game.turns--;
        
        game.save();
        monster.save();
        player.save();

        return res.status(200).send({
            game,
            player,
            monster,
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

module.exports = entityController