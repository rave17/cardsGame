
const Entity = require('../models/Entity')
const Game = require('../models/Game')

const gameController = {}


//START GAME
gameController.startGame = async (req, res) => {
    console.log('here');
    try {
        const { name } = req.body;

        const playerEntity = Entity({
            name,
            shield: 20,
        });

        const monsterEntity = Entity({
            name: 'Jorgito',
            shield: 10
        });

        const player = await playerEntity.save();
        const monster = await monsterEntity.save();
        const gameEntity = Game({
            idMonster: monster._id,
            idPlayer: player._id
        });

        const game = await gameEntity.save();

        res.status(200).send({
            monster: monster,
            player: player,
            game: game
        });
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

//GAME STATUS
gameController.status = async (req, res) => {
    const { gameId } = req.query;
    console.log(gameId)
    if (gameId) {
        try {
            await Game.findById(`${gameId}`, function (err, result) {
                if (err) {
                    throw err;
                }
                console.log(result);
                res.status(200).send(result);
            });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
}

module.exports = gameController