const fetch = require('node-fetch');

const apiUrl = 'http://localhost:8085/bonsgame';

let newCards = [
    {
        name: 'Horror card 1',
        effect: 'horror',
        value: 0
    },
    // {
    //     name: 'Heal card 2',
    //     effect: 'heal',
    //     value: 25
    // },
    // {
    //     name: 'Damage card 1',
    //     effect: 'damage',
    //     value: 10
    // },
    // {
    //     name: 'Damage card 2',
    //     effect: 'damage',
    //     value: 5
    // },
    // {
    //     name: 'Damage card 3',
    //     effect: 'damage',
    //     value: 50
    // },
    // {
    //     name: 'Shield card 1',
    //     effect: 'shield',
    //     value: 20
    // },
];

newCards.map(function(card) {
    fetch(`${apiUrl}/cards/create`, {
        method: 'POST',
        body: JSON.stringify(card),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log(json));
});