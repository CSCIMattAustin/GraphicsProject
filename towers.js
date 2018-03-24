//Create a tower
Tower = function(type, damage, range){
    tower = this;
    tower.type = type;
    tower.damage = damage;
    tower.range = range;
}

//Tower type

TOWER = {
    BLASTER : {
	name : 'Blaster Tower',
	damage : 3,
	range : 90,
	cost : 5,
    }
}
