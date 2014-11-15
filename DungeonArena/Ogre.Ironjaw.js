// The Brawler is a huge melee hero with mighty mass.
// this.throw() hurls an enemy behind him.
// this.jumpTo() leaps to a target within 20m every 10s.
// this.stomp() knocks everyone away, once per match.
var friends = this.getFriends();
var enemies = this.getEnemies();
if (enemies.length === 0)
    return;
// Chill if all enemies are dead.
var enemy = this.getNearest(enemies);

if(this.now() < 1){
    this.stomped = false;
    this.rush = false;
}

if(enemy.type === "base") {
    this.rush = true;
}
var friend = this.getNearest(friends);
// Which one do you do at any given time? Only the last called action happens.
if (!this.getCooldown('jump')) {
    this.jumpTo(enemy.pos);
} else {
    if (!this.getCooldown('stomp') && this.distance(enemy) < 15 && enemies.length > 5 ) {
        this.stomp();
        this.stomped = true;
    } else {
        if (!this.getCooldown('throw') && this.stomped === false) {
            this.throw(enemy, {x: 0, y: 30});
        } else {
            this.attack(enemy);
        }
    }
}

if(this.rush === true){
    this.attack(enemy);
}

// You can also command your troops with this.say():
//this.say("Defend!", {targetPos: {x: 60, y: 30}});
if(this.pos.x < 15 && this.now() > 18){
    for(var i = 0; i < enemies.length; i += 1) {
        if(enemies[i].type === "base"){
            var base = enemies[i];
        }
    }
    this.say("Attack!", { target: base });
}else{
    this.say("Attack!", { target: enemy });
}
//this.say("Move!", {targetPos: {x: 50, y: 40}});
// You can store state on this across frames:
this.lastHealth = this.health;
