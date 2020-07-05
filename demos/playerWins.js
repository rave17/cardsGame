const fetch = require('node-fetch');

const apiUrl = 'http://localhost:8085/bonsgame';
const endpoints = {
    game: {
        start: '/game/start',
        status: '/game/status',
    },
    cards: {
        list: '/cards',
    },
    player: {
        withdraw: '/cards?limit=1',
        turn: '/player/turn',
    },
    monster: {
        withdraw: '/cards?limit=1',
        turn: '/monster/turn',
    }
};

const withdraw = async (limit) => {
    const response = await fetch(`${apiUrl}${endpoints.cards.list}?limit=${limit}`);
    return response.json();
}

const turn = async (endpoint, gameId, cardId) => {
    const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify({
            cardId,
            gameId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    return response.json();
}

const startGame = async (name) => {
    const response = await fetch(`${apiUrl}${endpoints.game.start}`, {
        method: 'POST',
        body: JSON.stringify({
            name
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    return response.json();
}

const keepPlaying = (turns, playerHp, monsterHp) => {
    return turns > 0 || playerHp > 0 || monsterHp > 0;
}

const printWinner = (winner) => {
    console.log("Se termino el juego!");
    console.log(`Ganador: ${winner}`);
}

//Start Game
const newGame = async (name) => {
    try {
        let { game, player, monster } = await startGame(name);
        let playerCards = await withdraw(4);
        let monsterCards = await withdraw(4);

        //Start Player turn
        let selectedCard = playerCards[2]; // take a card
        playerCards.splice(2, 1); //take card of hands        
        let result = await turn(endpoints.player.turn, selectedCard._id, game._id);  // update game
        //End Player turn

        ({ game, player, monster } = result);

        // Monster turn
        if (keepPlaying(game.turns, player.hp, monster.hp)) {
            let selectedCard = monsterCards[3]; // take a card
            monsterCards.splice(3, 1); //take card of hands           
            ({ game, player, monster } = await turn(endpoints.monster.turn, selectedCard._id, game._id)); // update game
        } else {
            printWinner(player.hp > monster.hp ? player.name : monster.name);
        }
        //End Monster turn

        //Plater turn
        if (keepPlaying(game.turns, player.hp, monster.hp)) {
            let selectedCard = playerCards[0]; // take a card
            playerCards.splice(0, 1); //take card of hands       
            ({ game, player, monster } = await turn(endpoints.monster.turn, selectedCard._id, game._id));  // update game
        } else {
            printWinner(player.hp > monster.hp ? player.name : monster.name);
        }

    } catch (error) {
        console.log(error);
    }
};

newGame('Jorgito');
