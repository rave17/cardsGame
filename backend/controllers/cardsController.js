const Card = require('../models/Card')

const cardController = {}

cardController.create = async (req, res) => {
    console.log(req.body)
    try {
        const {
            name,
            effect,
            value
        } = req.body
        const card = Card({
            name,
            effect,
            value
        })
        console.log(card)
        const cardGame = await card.save()
        res.status(200).send({ cardGame })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

cardController.list = async (req, res) => {
    const { limit } = req.query;
    console.log(limit)
    await Card.find({})
        .then(doc => {
            res.json(doc.slice(0, limit));
        })
        .catch(err => {
            console.log(`card not found ${err}`)
        })
}

cardController.playerCard = async (req, res) => {
    const cardId = req.query.cardId;
    await Card.findById(cardId, (err, result) => {
        if (err) {
            throw err;
        }
        if (!cardId) {
            res.status(404).send({ message: `card doesn't exist, ${cardId}` })
        }
        res.status(200).send(`tu carta es ${result}`);
    });
};


cardController.monsterCard = async (req, res) => {
    const cardId = req.query.cardId;
    console.log(`el id es ${cardId}`)
    await Card.findById(cardId, (err, result) => {
        if (err) {
            throw err;
        }
        if (!cardId) {
            res.status(404).send({ message: `card doesn't exist, ${cardId}` })
        }
        res.status(200).send(`monster turn ${result}`);
    });
};

module.exports = cardController