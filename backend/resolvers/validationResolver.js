class ValidationResolver {
    constructor(card, entity) {
        this.card = card;
        this.entity = entity;
    }
}

class CardValidation extends ValidationResolver {
    validate() {
        if (!this.card) {
            return `Card not found`;
        }
    }
}

class EntityValidation extends ValidationResolver {
    validate() {
        if (!this.entity) {
            return `Entity not found`;
        }

        if (this.entity.cards <= 0) {
            return `Entity has no cards`;
        }

        if (!this.entity.playTurn) {
            return `Entity cannot play his turn`;
        }
    }
}

const GameValidation = function (card, entity) {
    let validators = [
        new CardValidation(card, entity),
        new EntityValidation(card, entity),
    ];

    messages = validators.forEach(validator => {
        if (validator.validate())
            return validator.validate();
    });

    return messages;
}

module.exports = GameValidation;