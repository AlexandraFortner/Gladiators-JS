// SAME AS IMPORT RANDOM
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// """
// Returns the dictionary representing the gladiator with the provided values.
// """
function newGladiator(health, rage, damageLow, damageHigh) {
    return {
        Health: health,
        Rage: rage,
        DamageLow: damageLow,
        DamageHigh: damageHigh
    };
}

var STATE = {
    Gladiator1: newGladiator(100, 0, 10, 15),
    Gladiator2: newGladiator(100, 0, 5, 25),
    turn: 1,
    attacker: function() {
        if (STATE.turn === 1) {
            return STATE.Gladiator1;
        } else {
            return STATE.Gladiator2;
        }
    },
    defender: function() {
        if (STATE.turn === 1) {
            return STATE.Gladiator2;
        } else {
            return STATE.Gladiator1;
        }
    }
};

// """
// Returns true if the random number is
// less than percentage(the parameter).
// """
function criticalChance(percentage) {
    if (getRandomInt(0, 100) < percentage) {
        return true;
    } else {
        return false;
    }
}

// """
// - Each attack can hit normally or crit
// - Crit chance is the same as the attacker's rage (50 rage == 50% crit chance)
// - Damage dealt is a random integer between the attacker's damage\_low and damage\_high
// - Critting doubles damage dealt
// - If a gladiator crits, their rage is reset to 0
// - If the gladiator hits normally, their rage is increased by 15
// """
function attack(attacker, defender) {
    damage = getRandomInt(attacker.DamageLow, attacker.DamageHigh);
    if (attacker.Rage < getRandomInt(0, 100)) {
        $('#Critical').html('');
        defender.Health -= damage;
        attacker.Rage += 15;
    } else {
        $('#Critical').html("<h4>It's a critical hit!</h4><hr>");
        defender.Health -= damage * 2;
        attacker.Rage = 0;
    }
}

// """
// - Spends 10 rage to heal 15 health
// - Cannot heal above max health of 100
// """
function heal(gladiator) {
    gladiator.Rage = Math.max(0, 10 - gladiator.Rage);
    gladiator.Health = Math.min(100, 15 + gladiator.Health);
    $('#Healed').html('<h5>Healed!</h5><hr>');
}

function isDead(gladiator) {
    if (gladiator.Health <= 0) {
        gladiator.Health = 0;
        $('#Turn').html('');
        $('#Critical').html('');
        $('#Healed').html('');
        $('#Winner').html('<h4>Winner!</h4>');
        $('#heal-button').attr('disabled', 'disabled');
        $('#attack-button').attr('disabled', 'disabled');
    } else {
        return false;
    }
}

function draw() {
    if (STATE.attacker().Rage < 10) {
        $('#heal-button').attr('disabled', 'disabled');
    } else if (STATE.attacker().Health >= 100) {
        $('#heal-button').attr('disabled', 'disabled');
    } else {
        $('#heal-button').attr('disabled', false);
    }
    isDead(STATE.attacker());
    isDead(STATE.defender());
    $('#Details').html(
        '<p><h3>Gladiator 1: ' +
            STATE.Gladiator1.Health +
            ' Health ||| ' +
            STATE.Gladiator1.Rage +
            ' Rage<br>Gladiator 2: ' +
            STATE.Gladiator2.Health +
            ' Health ||| ' +
            STATE.Gladiator2.Rage +
            ' Rage</h3><p>'
    );
}

function changeTurn() {
    if (STATE.turn === 1) {
        $('#Turn').html("<h5>It's Gladiator 2's turn!</h5><hr>");
        STATE.turn = 2;
    } else {
        $('#Turn').html("<h5>It's Gladiator 1's turn!</h5><hr>");
        STATE.turn = 1;
    }
}

function attatchHandlers() {
    $('#attack-button').click(function() {
        attack(STATE.attacker(), STATE.defender());
        changeTurn();
        draw();
    });
    $('#heal-button').click(function() {
        heal(STATE.attacker());
        changeTurn();
        draw();
    });
}

function main() {
    draw();
    attatchHandlers();
}

$(main);
