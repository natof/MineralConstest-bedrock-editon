import * as GameTest from "mojang-gametest";
import { Items, ItemStack, Player, World, world } from "mojang-minecraft";

var test = false;
var timer = {};
timer["party"] = 0
timer["minute"] = 60
timer["seconde"] = 0
var tick = 0;

world.events.tick.subscribe(() => {
    if(test == false){
        timer.party = 0
        tick = 0;
    }
    if(test == true){
       tick++;
       if(tick == 20){
            world.getDimension("overworld").runCommandAsync(`scoreboard objectives remove mineralcontest`)
            world.getDimension("overworld").runCommandAsync(`scoreboard objectives add mineralcontest dummy §6Mineral§bContest§r`)
            world.getDimension("overworld").runCommandAsync(`scoreboard objectives setdisplay sidebar mineralcontest`)
            world.getDimension("overworld").runCommandAsync(`scoreboard players reset "  ${timer.minute}:${timer.seconde}         " mineralcontest 9`)
            tick = 0;
            timer.party++
           
            if(timer.seconde == 0){
                timer.minute--;
                timer.seconde = 59;
            }else {
                timer.seconde--
            }
            switch (timer.party){
                case 1:
                    world.getDimension("overworld").runCommandAsync(`scoreboard objectives remove mineralcontest`)
                    world.getDimension("overworld").runCommandAsync(`scoreboard objectives add mineralcontest dummy §6Mineral§bContest§r`)
                    world.getDimension("overworld").runCommandAsync(`scoreboard objectives setdisplay sidebar mineralcontest`)

                    world.getDimension("overworld").runCommandAsync(`title @a title 3`)
                    world.getDimension("overworld").runCommandAsync(`playsound break.amethyst_block @a`)
                    break;
                case 2:
                    world.getDimension("overworld").runCommandAsync(`title @a title 2`)
                    world.getDimension("overworld").runCommandAsync(`playsound break.amethyst_block @a`)
                    break;
                case 3:
                    world.getDimension("overworld").runCommandAsync(`title @a title 1`)
                    world.getDimension("overworld").runCommandAsync(`playsound break.amethyst_block @a`)
                    break;
                case 4: 
                    world.getDimension("overworld").runCommandAsync(`title @a title Go !!`)
                    world.getDimension("overworld").runCommandAsync(`playsound mob.enderdragon.growl @a`)

                    for(var player of world.getPlayers()){
                        
                        var inventory = player.getComponent("minecraft:inventory").container;

                        var items = {};
                        items["sword"] = 0;
                        items["axe"] = 1;
                        items["pickaxe"] = 2;
                        items["shovel"] = 3;
                        items["helmet"] = 4;
                        items["chestplate"] = 5;
                        items["leggings"] = 6;
                        items["boots"] = 7;
                    
                        for (var key in items){
                            inventory.setItem(items[key], new ItemStack(Items.get(`iron_${key}`), 1))
                        }
                    }
                break;        
            }

            world.getDimension("overworld").runCommandAsync(`scoreboard players set "Temps Restant   " mineralcontest 10`)
       
            world.getDimension("overworld").runCommandAsync(`scoreboard players set "  ${timer.minute}:${timer.seconde}         " mineralcontest 9`)
           
       }
    }
})

world.events.playerJoin.subscribe((event) => {
    var player = event.player;
    var inventory = player.getComponent("minecraft:inventory").container;
    var items = {};
    items[14] = 1; //red
    items[11] = 3; //blue
    items[5] = 5; //green
    items[4] = 7; //yellow

    inventory.setItem(1, new ItemStack(Items.get(`wool`), 1, 14))
    inventory.setItem(3, new ItemStack(Items.get(`wool`), 1, 11))
    inventory.setItem(5, new ItemStack(Items.get(`wool`), 1, 5))
    inventory.setItem(7, new ItemStack(Items.get(`wool`), 1, 4))
})


world.events.beforeChat.subscribe((event) => {
    if(event.message == "!start"){
        test = true;
    }else if(event.message == "!stop"){
        test = false;
    }

})