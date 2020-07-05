const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const entityController = require('../controllers/entityController');
const cardController = require('../controllers/cardsController');

router.post('/game/start', gameController.startGame); //INIT GAME
router.get('/game/status', gameController.status); //GAME STATUS: TURNS

router.post('/monster/turn', entityController.monsterTurn); //MONSTER TURN
router.post('/player/turn', entityController.playerTurn); // PLAYER TURN
router.get('/entity/status', entityController.status); //ENTITY STATUS

//CARD CONTROLLER
router.post('/cards/create', cardController.create); //CREATE CARDS
router.get('/cards', cardController.list); //CARDS 

module.exports = router
