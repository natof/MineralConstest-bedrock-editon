import { world, Player } from "mojang-minecraft";
import { addPlayerJob, playerHasJob } from "./managers/JobManager.js";
import { isStart } from "./Party.js";

const dimension = world.getDimension("overworld");

world.events.beforeChat.subscribe( (event) => {
    event.cancel = true;
        
    switch(event.message){
        case "!metier":
            if(!isStart){
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] La partie n\'a pas encore commencé"}]}');
                return;
            }
            dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §cChoisissez parmis les métiers ci-dessous :\n§eMineur : §fObtient une pioche en fer efficacité II et les minerais récoltés sont déjà cuit mais possède 7 coeurs\n§eCombattant : §fObtient une épée en fer tranchant 2 mais possède l\'effet lenteur I\n§ePilleur : §fPossède l\'effet faiblesse I et ne prends pas de dégats de chute"}]}');
            break;
        case "!metier combattant":
            if(!playerHasJob(event.sender)){
                addPlayerJob(event.sender,"combattant");
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §aVous avez choisis le métier de combattant"}]}');
            }else{
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §aVous avez déjà un métier"}]}');
            }
            break;
        case "!metier mineur":
            if(!playerHasJob(event.sender)){
                addPlayerJob(event.sender,"mineur");
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §aVous avez choisis le métier de mineur"}]}');
            }else{
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §aVous avez déjà un métier"}]}'); 
            }
            break;
        case "!metier pilleur":
            if(!playerHasJob(event.sender)){
                addPlayerJob(event.sender,"pilleur");
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §aVous avez choisis le métier de pilleur"}]}');
            }else{
                dimension.runCommand("tellraw "+ event.sender.name + '{"rawtext":[{"text":"§c[§bMineral Contest§c] §aVous avez déjà un métier"}]}'); 
            }
            break;
    }
});


