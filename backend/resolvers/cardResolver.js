class CardResolver {
    constructor(effect, value) {
        this.effect = effect;
        this.value = value;
    }
}

class HealCardResolver extends CardResolver {

    canResolve() {
        return this.effect === 'heal';
    }

    resolve(entity) {
        entity.hp += this.value;
    }
};

class DamageCardResolver extends CardResolver {

    canResolve() {
        return this.effect === 'damage';
    }

    resolve(entity) {
        entity.opponent.hp -= this.value;
    }
};

class ShieldCardResolver extends CardResolver {

    canResolve() {
        return this.effect === 'shield';
    }

    resolve(entity) {
        entity.shield += this.value;
    }
}

class HorrorCardResolver extends CardResolver {

    canResolve() {
        return this.effect === 'horror';
    }

    resolve(entity) {
        entity.opponent.playTurn = false;
    }
}

const Resolver = function (entity, effect, value) {
    let resolvers = [
        new HealCardResolver(effect, value),
        new DamageCardResolver(effect, value),
        new ShieldCardResolver(effect, value),
        new HorrorCardResolver(effect, value),
    ];

    let resolver = resolvers.find(m => m.canResolve());

    if (resolver) {
        resolver.resolve(entity);
    }

    return entity;
}

module.exports = Resolver;