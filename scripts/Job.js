import { world } from "mojang-minecraft";


world.events.beforeChat.subscribe( (event) => {
    if(event.message === "!metier"){
        world.getDimension("overworld").runCommand("say commande metier exécutée !");
    }
});