
// This is an example of grabbing the 0th coin from the items array.
var items = this.getItems();


var goItem;
var goItemScore = 0;
var bigvalue;

for(var i = 0; i < items.length; i += 1) {
    var item = items[i];
    if(item.type == "coin"){
        var d = 100-item.distance(this);
        var v = item.bountyGold * 2;
        var score = d + v;

        if(bigvalue == null ){
            bigvalue = item;
        }
        if(v > bigvalue.bountyGold){
            bigvalue = item;
        }
        if(score > goItemScore){
            goItem = item;
            goItemScore = score;
        }

    }
}
if(!this.getCooldown("jump")){
    if(bigvalue != null){
        this.jumpTo(bigvalue.pos);
    }
}else{
    if(goItem != null){
        this.move(goItem.pos);
    }
}

