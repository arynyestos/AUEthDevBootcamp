// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Hero.sol";

contract Warrior is Hero(200){
    function attack(address _enemyAddress) override public{
        Enemy enemy = Enemy(_enemyAddress);
        enemy.takeAttack(Hero.AttackTypes.Brawl);
    }
}

contract Mage is Hero(50){
    function attack(address _enemyAddress) override public{
        Enemy enemy = Enemy(_enemyAddress);
        enemy.takeAttack(Hero.AttackTypes.Spell);
    }
}
