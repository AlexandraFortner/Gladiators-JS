// SAME AS IMPORT RANDOM
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// SAME AS RANDOM.CHOICE
function choice(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

var counter = 0;
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
        defender.Health -= damage;
        attacker.Rage += 15;
        $('#Critical').html('');
        $('#Attack').html('<h4>Attacked!<br>Damage Dealt: ' + damage + '</h4>');
    } else {
        damage_dealt = damage * 2;
        defender.Health -= damage_dealt;
        attacker.Rage = 0;
        $('#Attack').html('');
        $('#Critical').html(
            "<h4>Attacked!<br>It's a critical hit!<br>Damage Dealt: " +
                damage_dealt +
                '</h4>'
        );
    }
}

function magic(attacker, defender) {
    magic_dictionary = {
        'Kaiju Blue Bath': -15,
        'Fire Storm': 12,
        'Wind-Waker': 15,
        'Ground Pound': 11,
        'Water Cannon': 14,
        'Undead Underground': 16,
        'Ghostly Screams': 10,
        "Sunshine's Rays": 20,
        'Bad Luck Bang': 5,
        'Good Fortune': 20,
        'Gastly Grimoire': 17,
        'Blessed Protection': 18
    };
    critical_magic_dictionary = {
        'Kaiju Blue Spa': -30,
        'Gates Of Hell': 30,
        'Wasting Winds Of The Waker': 33,
        'Shifting Pangea Peril': 29,
        'Hurricane Of Terror': 32,
        'Paralyzing AkaiEyes': 34,
        'Shrieking Grave': 28,
        'Scorching Sunburst': 48,
        'Unlucky Eulogy': 14,
        'Luck Of The Chinese New Year': 49,
        'Murderous Matoia': 35,
        'Holy Shield Bash': 36
    };
    // damage = getRandomInt(attacker.DamageLow, attacker.DamageHigh);
    if (attacker.Rage < getRandomInt(0, 100)) {
        random_magic_attack = choice(Object.keys(magic_dictionary));
        lost = magic_dictionary[random_magic_attack];
        defender.Health -= lost;
        attacker.Rage -= 10;
        $('#Magic').html(
            '<h4>Cast ' +
                random_magic_attack +
                '!<br>Damage Dealt: ' +
                lost +
                '</h4>'
        );
    } else {
        random_magic_attack = choice(Object.keys(critical_magic_dictionary));
        lost2 = critical_magic_dictionary[random_magic_attack];
        damage_dealt = lost2 * 2;
        defender.Health -= lost2 * 2;
        attacker.Rage = 0;
        $('#Magic').html(
            '<h4>Cast ' +
                random_magic_attack +
                "!<br>It's a critical hit!<br>Damage Dealt: " +
                damage_dealt +
                '</h4>'
        );
    }
}

function InventoryHarm(attacker, defender) {
    random_bag_harm = {
        'a Banana Cream Pie': 5,
        'a tangle of Bolas': 40,
        'a vial of Viper Poison': 55,
        'a Joker Bomb': 43,
        'a Torque Candle': 47,
        'a Half-Hacker': 50
    };
    var harming_item = choice(Object.keys(random_bag_harm));
    var harming_power = random_bag_harm[harming_item];
    defender.Health = Math.min(100, defender.Health);
    defender.Health -= harming_power;
    attacker.Rage = Math.max(0, attacker.Rage);
    attacker.Rage -= 20;
    $('#InventoryHarm').html(
        '<h4>You look into your inventory to find ' +
            harming_item +
            '! Damage Dealt: ' +
            harming_power +
            '!</h4>'
    );
}
// """
// - Spends 10 rage to heal 15 health
// - Cannot heal above max health of 100
// """
function heal(gladiator) {
    gladiator.Rage = Math.max(0, 10 - gladiator.Rage);
    gladiator.Health = Math.min(100, 15 + gladiator.Health);
    $('#Healed').html('<h5>Healed 15 Points!</h5>');
}

function isDead(gladiator) {
    if (gladiator.Health <= 0) {
        gladiator.Health = 0;
        $('#Attack').html('');
        $('#Turn').html('');
        $('#Critical').html('');
        $('#Healed').html('');
        $('#Magic').html('');
        $('#InventoryHarm').html('');
        $('#Pass').html('');
        $('#Winner').html('<h2>Winner!</h2>');
        $('#heal-button').attr('disabled', 'disabled');
        $('#attack-button').attr('disabled', 'disabled');
        $('#magic-button').attr('disabled', 'disabled');
        $('#inventoryharm-button').attr('disabled', 'disabled');
        $('#Pass-button').attr('disabled', 'disabled');
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
    if (STATE.attacker().Rage < 10) {
        $('#magic-button').attr('disabled', 'disabled');
    } else {
        $('#magic-button').attr('disabled', false);
    }
    if (STATE.attacker().Rage < 20) {
        $('#inventoryharm-button').attr('disabled', 'disabled');
    } else {
        $('#inventoryharm-button').attr('disabled', false);
    }
    isDead(STATE.attacker());
    isDead(STATE.defender());
    $('#Details').html(
        '<h3>Gladiator 1: ' +
            STATE.Gladiator1.Health +
            ' Health ||| ' +
            STATE.Gladiator1.Rage +
            ' Rage<br>Gladiator 2: ' +
            STATE.Gladiator2.Health +
            ' Health ||| ' +
            STATE.Gladiator2.Rage +
            ' Rage</h3>'
    );
}

function changeTurn() {
    if (STATE.turn === 1) {
        $('#Turn').html("<hr><h5>It's Gladiator 2's turn!</h5>");
        STATE.turn = 2;
    } else {
        $('#Turn').html("<hr><h5>It's Gladiator 1's turn!</h5>");
        STATE.turn = 1;
    }
}

function attatchHandlers() {
    $('#attack-button').click(function() {
        $('Critical').html('');
        $('#Magic').html('');
        $('#Healed').html('');
        $('#InventoryHarm').html('');
        $('#Pass').html('');
        attack(STATE.attacker(), STATE.defender());
        changeTurn();
        draw();
    });
    $('#heal-button').click(function() {
        $('#Attack').html('');
        $('#Turn').html('');
        $('#Critical').html('');
        $('#InventoryHarm').html('');
        $('#Pass').html('');
        heal(STATE.attacker());
        changeTurn();
        draw();
    });
    $('#magic-button').click(function() {
        $('#Attack').html('');
        $('#Turn').html('');
        $('#Critical').html('');
        $('#Healed').html('');
        $('#InventoryHarm').html('');
        $('#Pass').html('');
        magic(STATE.attacker(), STATE.defender());
        changeTurn();
        draw();
    });
    $('#inventoryharm-button').click(function() {
        $('#Attack').html('');
        $('#Turn').html('');
        $('#Critical').html('');
        $('#Healed').html('');
        $('#Pass').html('');
        InventoryHarm(STATE.attacker(), STATE.defender());
        changeTurn();
        draw();
    });
    $('#pass-button').click(function() {
        $('#Attack').html('');
        $('#Turn').html('');
        $('#Critical').html('');
        $('#Healed').html('');
        $('#InventoryHarm').html('');
        changeTurn();
        draw();
    });
}

function main() {
    $('#Turn').html("<hr><h5>It's Gladiator 1's turn!</h5>");
    draw();
    attatchHandlers();
}

$(main);
