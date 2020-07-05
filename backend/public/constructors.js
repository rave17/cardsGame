
//-----------------------CARD CONSTRUCTOR

class Card {
  constructor(value) {
    this.value = value
  }
}
// ____________cards

class HealCard extends Card {
  effect(entity) {
    entity.hp += this.value;
  }
};

class DamageCard extends Card {
  effect(entity) {
    entity.opponent.hp -= this.value;
  }
};

class ShieldCard extends Card {
  effect(entity) {
    entity.shield += this.value;
  }
}

class HorrorCard extends Card {
  effect(entity) {
    entity.opponent.playTurn = false;
  }
}

class Entity {
  constructor(name, hp, shield, cards) {
    this.name = name;
    this.hp = hp;
    this.shield = shield;
    this.cards = cards;
    this.playTurn = true
  }
  play(card) {
    if (this.playTurn && this.cards > 0) {
      card.effect(this);
      this.cards--;
    }
  }
};

class Monster extends Entity {

};

class Player extends Entity {

};

//create monster
console.log('---------------MONSTRUO')
let monster = new Monster('Mamon', 15, 20, 4)
let player = new Player('Player', 15, 10, 4)

monster.opponent = player;
player.opponent = monster;



//create card
console.log('-----CARTAS')
let monsterCards = [
  new HealCard(15),
  new HealCard(25),
  new DamageCard(10),
  new HorrorCard(),
];
console.log(monsterCards)

let playerCards = [
  new HealCard(15),
  new DamageCard(25),
  new ShieldCard(10),
  new HorrorCard(),
];

//show status
console.log('-----Primer Turno')



player.play(playerCards[0])
player.play(playerCards[3])

console.log(monster)
console.log(player)
monster.play(monsterCards[2])
console.log(monster)
console.log(player)

