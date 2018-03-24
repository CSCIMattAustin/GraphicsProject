//Create new enemy
Enemy = function(health, value){
    enemy = this;
    enemy.health = health;
    enemy.value = value;
}

var baseHealth

var enemy = {
    'health': baseHealth,
    'currencyValue': 3,
    'name': 'blah',
    'pos': vec4(-1, 1, -1, 1),
    'attack': 10,
    
};

basePos = vec4(1,-1,-1, 1);

if(enemy.pos === basePos){
    baseHealth -= enemy.attack;
}

function changeBase(val){
    baseHealth += val;
}

var enemies = [];

enemies.push(enemy);

enemies.forEach(function (e){
    e.damage(5);
})

while(playerHealth > 0){
    //playGame
}

enemies = []
jConfirm('Do you wanna play again?', 'Restart', function(response){
    if(response){
	startgame();
    }
});

$('#roundInfo').addClass('.changeColor');
$('#roundInfo').removeClass('.class');

$('#roundInfo').onClick(function (){
    alert('you clicked');
});

$('.foreground').

alert('you died dipshit')
console.log('debug info', out);

var enemyWeWant = enemies.filter(s => s.name === 'blah');

playerCurrency +=parseFloat( enemy.value);


setTimeout(function (e){
    attackEnemy(enemy ,val);
}, 500)

setTimeout(function (r){
    enemies.forEach(function (r){
	r.move(2);
    });
}, 250)

function move(valu){
    e.pos += valu;
}

function attackEnemy(enemy, val){
    var toAttack = enemyWeWant(enemy);
    enemy.health -= val;
    if(enemy.health <= 0){
	enemies.splice(enemyPos, 1, null);
    }
    
}

//Enemy dies
Enemy.prototype.kill = function(){
    enemy.health = 0;
}

//Enemy takes damage
Enemy.prototype.damage = function(dam){
    if(enemy.health > dam){
	enemy.health -= amt;
    }
    else{
	enemy.kill();
    }
}

//Enemy moves on path
Enemy.prototype.move = function(){
    //Not sure how to do this part.
}

//Basic enemy defintion
ENEMY = {
    ALIEN : {
	name : 'Alien',
	speed : 5,
	health : 30,
	weight : 1
	cash : 5
    }
};
