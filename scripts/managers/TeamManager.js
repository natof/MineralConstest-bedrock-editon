import * as GameTest from "mojang-gametest";
import { Items, ItemStack, Player, World, world, Location} from "mojang-minecraft";

export var teams = {};
teams["red"] = [];
teams["blue"] = [];
teams["yellow"] = [];
teams["green"] = [];

teams["bluePosition"] = new Location(-17.37, -60.00, 30.44);
teams["redPosition"] = new Location(-6.56, -60.00, 19.48);
teams["yellowPosition"] = new Location(4.00, -60.00, 30.59);
teams["greenPosition"] = new Location(-6.57, -60.00, 41.39);

export function addPlayerInTeam(player, color) {
    removePlayerInTeam(player);
    switch (color){
        case "green":
            teams.green.push(player)
        break;
        case "red":
            teams.red.push(player)
        break;
        case "blue":
            teams.blue.push(player)
        break;
        case "yellow": 
            teams.yellow.push(player)
        break;
    }
}

function removePlayerInTeam(player) {
    if(teams.red.includes(player))
    {
        teams.red.splice(teams.red.indexOf(player)) //red
    }
    else if (teams.blue.includes(player))
    {
        teams.blue.splice(teams.blue.indexOf(player)) //blue
    }
    else if (teams.yellow.includes(player))
    {
        teams.yellow.splice(teams.yellow.indexOf(player)) //yellow
    }
    else if (teams.green.includes(player))
    {
        teams.green.splice(teams.green.indexOf(player)) //green
    }
}

export function getPlayerTeam(player) {
    if(teams.red.includes(player))
    {
       return "red"
    }
    else if (teams.blue.includes(player))
    {
        return "blue"
    }
    else if (teams.yellow.includes(player))
    {
        return "yellow"
    }
    else if (teams.green.includes(player))
    {
        return "green"
    }
}

export function getSpawnLocationTeam(color){
    switch (color){
        case "green":
            return teams.greenPosition
        case "red":
            return teams.redPosition
        case "blue":
            return teams.bluePosition
        case "yellow": 
            return teams.yellowPosition
    }
}