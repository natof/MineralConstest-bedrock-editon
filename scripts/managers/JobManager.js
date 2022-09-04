export let jobs = {};
jobs["pilleur"] = [];
jobs["combattant"] = [];
jobs["mineur"] = [];

export function addPlayerJob(player, job){
    switch(job){
        case "mineur":
            jobs.mineur.push(player);
            break;
        case "combattant":
            jobs.combattant.push(player);
            break;
        case "pilleur":
            jobs.pilleur.push(player);
            break;
    }
}

export function playerHasJob(player){
    if(jobs.pilleur.includes(player) || jobs.combattant.includes(player) || jobs.mineur.includes(player)) return true;
    return false;
}

export function resetJob(){
    jobs = {};
}

export function removePlayerJob(player){
    if(!playerHasJob(player)){
        return false;
    }

    jobs.splice(jobs.indexOf(player.name));
    return true;
}

export function getPlayerJob(player){
    if(jobs.combattant.includes(player)){
       return "combattant"
    }else if (jobs.mineur.includes(player)){
        return "mineur"
    }else if (jobs.pilleur.includes(player)){
        return "pilleur"
    }
}