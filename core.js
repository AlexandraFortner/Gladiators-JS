import random


def new_gladiator(health, rage, damage_low, damage_high):
    // """
    // Returns the dictionary representing the gladiator with the provided values.
    // """
    return {
        'Health': health,
        'Rage': rage,
        'Damage Low': damage_low,
        'Damage High': damage_high
    }


def critical_chance(percentage):
    // """
    // Returns True if the random number is
    // less than percentage(the parameter).
    // """
    if random.random() < percentage:
        return True
    else:
        return False


def attack(attacker, defender):
    // """
    // - Each attack can hit normally or crit
    // - Crit chance is the same as the attacker's rage (50 rage == 50% crit chance)
    // - Damage dealt is a random integer between the attacker's damage\_low and damage\_high
    // - Critting doubles damage dealt
    // - If a gladiator crits, their rage is reset to 0
    // - If the gladiator hits normally, their rage is increased by 15
    // """
    #randint 0-100 #If a random number is less than the attacker's rage it is a critical (double damage *2)
    number = attacker['rage']
    damage = attacker['Damage Low'], attacker['Damage High']
    if number > random.randint(0, 100):
        defender -= random.randint(damage)
        number += 15
    else:
        defender -= random.randint(damage) * 2
        number = 0


def heal(gladiator):
    // """
    // - Spends 10 rage to heal 5 health
    // - Cannot heal above max health of 100
    // """
    if gladiator['Health'] == 100:
        print('\nCannot heal over 100 health!\n')
    else:
        gladiator['rage'] -= 10
        gladiator['Health'] += 5


def is_dead(gladiator):
    // """
    // - Returns True if gladiator has no health
    // """
    if gladiator['Health'] == 0:
        return True
    else:
        return False