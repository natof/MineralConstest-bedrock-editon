import * as GameTest from "mojang-gametest";
import { Items, ItemStack, Player, World, world, Location} from "mojang-minecraft";
import {addPlayerInTeam, teams, getPlayerTeam, getSpawnLocationTeam} from "./managers/TeamManager.js";
import { calculePointInChest } from "./managers/ChestManager.js";

var isStart = false;
var timer = {};
timer["party"] = 0
timer["minute"] = 60
timer["seconde"] = 0
var tick = 0;

world.events.tick.subscribe(() => {
    if(isStart == false){
        timer.party = 0
        tick = 0;

      
      
    }
    if(isStart == true){
       tick++;
       if(tick == 20){
            world.getDimension("overworld").runCommand(`scoreboard objectives remove mineralcontest`)
            world.getDimension("overworld").runCommand(`scoreboard objectives add mineralcontest dummy §6Mineral§bContest§r`)
            world.getDimension("overworld").runCommand(`scoreboard objectives setdisplay sidebar mineralcontest`)

         
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
                    
                    for(var player of world.getPlayers()){
                
                        player.teleport(getSpawnLocationTeam(getPlayerTeam(player.name)), world.getDimension('overworld'), player.rotation.x, player.rotation.y, false);

                        world.getDimension("overworld").runCommand(`clear ${player.name}`)

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
                            world.getDimension("overworld").runCommandAsync(`give ${player.name} iron_${key}`)
                        }
                    }
                    world.getDimension("overworld").runCommand(`scoreboard objectives remove mineralcontest`)
                    world.getDimension("overworld").runCommand(`scoreboard objectives add mineralcontest dummy §6Mineral§bContest§r`)
                    world.getDimension("overworld").runCommand(`scoreboard objectives setdisplay sidebar mineralcontest`)

                    world.getDimension("overworld").runCommand(`title @a title 3`)
                    world.getDimension("overworld").runCommand(`playsound break.amethyst_block @a`)
                    break;
                case 2:
                    world.getDimension("overworld").runCommand(`title @a title 2`)
                    world.getDimension("overworld").runCommand(`playsound break.amethyst_block @a`)
                    break;
                case 3:
                    world.getDimension("overworld").runCommand(`title @a title 1`)
                    world.getDimension("overworld").runCommand(`playsound break.amethyst_block @a`)
                    break;
                case 4: 
                    world.getDimension("overworld").runCommand(`title @a title Go !!`)
                    world.getDimension("overworld").runCommand(`playsound mob.enderdragon.growl @a`)
                break;        
            }

            switch(timer.minute){
                case 0:
                    isStart = false;
                    calculePointInChest();
                    world.getDimension("overworld").runCommand(`red ${teams.redPoint}`)
                break;
            }

            world.getDimension("overworld").runCommand(`scoreboard players set "Temps Restant   " mineralcontest 10`)
       
            world.getDimension("overworld").runCommand(`scoreboard players set "  ${timer.minute}:${timer.seconde}         " mineralcontest 9`)
           
       }
    }
})

world.events.playerJoin.subscribe((event) => {
    var player = event.player;
    var inventory = player.getComponent("minecraft:inventory").container;


    if(isStart == false)
    {
        for (var i = 0; i < inventory.size; ++i){
            inventory.setItem(i, new ItemStack(Items.get(`air`), 1, 0))
        } 

        var redWool = new ItemStack(Items.get(`wool`), 1, 14);
        redWool.nameTag = "§r§cRed Team§r§f\n" + teams.red.join("\n");
        inventory.setItem(1, redWool)

        var blueWool = new ItemStack(Items.get(`wool`), 1, 11);
        blueWool.nameTag = "§r§9Blue Team§r§f\n" + teams.blue.join("\n");
        inventory.setItem(3, blueWool)

        var greenWool = new ItemStack(Items.get(`wool`), 1, 5);
        greenWool.nameTag = "§r§aGreen Team§r§f\n" + teams.green.join("\n")
        inventory.setItem(5, greenWool)

        var yellowWool = new ItemStack(Items.get(`wool`), 1, 4);
        yellowWool.nameTag = "§r§eYellow Team§r§f\n" + teams.yellow.join("\n")
        inventory.setItem(7, yellowWool);

        if(player.name == "Naatof" || player.name == "Achedon"){
            var compass = new ItemStack(Items.get(`compass`), 1, 4);
            compass.nameTag = "§r§aStart party§f";
            inventory.setItem(8, compass);
        }
    }
})

world.events.worldInitialize.subscribe((event) => {
    world.getDimension("overworld").runCommand(`scoreboard objectives add teams dummy §6Tea§bm§r`)
    world.getDimension("overworld").runCommand(`scoreboard objectives remove teams`)
    world.getDimension("overworld").runCommand(`scoreboard objectives add teams dummy §6Tea§bm§r`)
    world.getDimension("overworld").runCommand(`scoreboard objectives setdisplay sidebar teams`)
    world.getDimension("overworld").runCommand(`scoreboard players set "  " teams 15`)
    world.getDimension("overworld").runCommand(`scoreboard players set "§cTeam Red§r   " teams 14`)
    world.getDimension("overworld").runCommand(`scoreboard players set "   " teams 12`)
    world.getDimension("overworld").runCommand(`scoreboard players set "§9Team Blue§r   " teams 11`)
    world.getDimension("overworld").runCommand(`scoreboard players set "     " teams 9`)
    world.getDimension("overworld").runCommand(`scoreboard players set "§eTeam Yellow§r   " teams 8`)
    world.getDimension("overworld").runCommand(`scoreboard players set "      " teams 6`)
    world.getDimension("overworld").runCommand(`scoreboard players set "§aTeam Green§r   " teams 5`)
})

world.events.beforeChat.subscribe((event) => {
    if(event.message == "!start"){
        isStart = true;
    }else if(event.message == "!stop"){
        isStart = false;
    }else if (event.message == "!time"){
        calculePointInChest();
        world.getDimension("overworld").runCommand(`say red ${teams.redPoint}`)
    }

})


world.events.itemUse.subscribe((event) => {
    var player = event.source;
    var item = event.item;
    
    if(item.id == Items.get(`compass`).id && isStart == false){
        isStart = true;
    }

    if(item.id == Items.get(`wool`).id && isStart == false){
    
        switch(item.data){
            case 14: //red
                addPlayerInTeam(player.name, "red")
                break;
            case 11: //blue
                addPlayerInTeam(player.name, "blue")
                break;
            case 5: //green
                addPlayerInTeam(player.name, "green")
                break;
            case 4: //yellow
                addPlayerInTeam(player.name, "yellow")
                break;            
        }

        for(var worldPlayer of world.getPlayers()){
            var inventory = worldPlayer.getComponent("minecraft:inventory").container;
        
            var redWool = new ItemStack(Items.get(`wool`), 1, 14);
            redWool.nameTag = "§r§cRed Team§r§f\n" + teams.red.join("\n");
            inventory.setItem(1, redWool);

        
            var blueWool = new ItemStack(Items.get(`wool`), 1, 11);
            blueWool.nameTag = "§r§9Blue Team§r§f\n" + teams.blue.join("\n");
            inventory.setItem(3, blueWool);

            var greenWool = new ItemStack(Items.get(`wool`), 1, 5);
            greenWool.nameTag = "§r§aGreen Team§r§f\n" + teams.green.join("\n")
            inventory.setItem(5, greenWool);

            var yellowWool = new ItemStack(Items.get(`wool`), 1, 4);
            yellowWool.nameTag = "§r§eYellow Team§r§f\n" + teams.yellow.join("\n")
            inventory.setItem(7, yellowWool);
        }

        world.getDimension("overworld").runCommand(`scoreboard objectives remove teams`)
        world.getDimension("overworld").runCommand(`scoreboard objectives add teams dummy §6Tea§bm§r`)
        world.getDimension("overworld").runCommand(`scoreboard objectives setdisplay sidebar teams`)

        world.getDimension("overworld").runCommand(`scoreboard players set "  " teams 15`)

        world.getDimension("overworld").runCommand(`scoreboard players set "§cTeam Red§r   " teams 14`)
        for (var player of teams.red){
            world.getDimension("overworld").runCommand(`scoreboard players set "§c-§r ${player}   " teams 13`)
        }

        world.getDimension("overworld").runCommand(`scoreboard players set "   " teams 12`)

        world.getDimension("overworld").runCommand(`scoreboard players set "§9Team Blue§r   " teams 11`)
        for (var player of teams.blue){
            world.getDimension("overworld").runCommand(`scoreboard players set "§9-§r ${player}   " teams 10`)
        }

        world.getDimension("overworld").runCommand(`scoreboard players set "     " teams 9`)

        world.getDimension("overworld").runCommand(`scoreboard players set "§eTeam Yellow§r   " teams 8`)
        for (var player of teams.yellow){
            world.getDimension("overworld").runCommand(`scoreboard players set "§e-§r ${player}   " teams 7`)
        }

        world.getDimension("overworld").runCommand(`scoreboard players set "      " teams 6`)

        world.getDimension("overworld").runCommand(`scoreboard players set "§aTeam Green§r   " teams 5`)
        for (var player of teams.green){
            world.getDimension("overworld").runCommand(`scoreboard players set "§a-§r ${player}   " teams 4`)
        }
    }
    
})