import { Items, ItemStack, Player, World, world, Location, BlockLocation, Block} from "mojang-minecraft";
import { teams } from "./TeamManager.js";

var point = {}
point["emerald"] = 300;
point["diamond"] = 150;
point["gold"] = 50;
point["iron"] = 10;
point["copper"] = 10;

export function calculePointInChest(){
   
    for(var color of ["red", "blue", "yellow", "green"]){

        var block = world.getDimension("overworld").getBlock(new BlockLocation(-7, -59, 16));
        var inventory = block.getComponent("inventory").container;
    
        for (var i = 0; i < inventory.size; ++i){
            var item = inventory.getItem(0);
             switch (item.id){
                 case Items.get("emerald"):
                     teams[`${color}Point`] = teams[`${color}Point`] + point.emerald * item.amount;
                     break;
                 case Items.get("diamond"):
                     teams[`${color}Point`] = teams[`${color}Point`] + point.diamond * item.amount;
                     break;
                 case Items.get("iron_ingot"):
                     teams[`${color}Point`] = teams[`${color}Point`] + point.iron * item.amount;
                     break;
                 case Items.get("gold_ingot"):
                     teams[`${color}Point`] = teams[`${color}Point`] + point.gold * item.amount;
                     break;
                 case Items.get("copper_ingot"):
                     teams[`${color}Point`] = teams[`${color}Point`] + point.copper * item.amount;
                     break;            
             }
         } 
    };
   
}