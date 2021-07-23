import httpmethods from '@/http/index'

export function queryGameDetail (id){
    
    return httpmethods.axios.get("/blogapi/api/game/"+id,{})
}

export function queryGameList(page,size){
    
    return httpmethods.axios.get("/blogapi/api/game/?page="+page+"&size="+size,{})
}

export function saveGame(game){
    
    return httpmethods.axios.post("/blogapi/api/game/",game)
}

export function delGame(game){
    
    return httpmethods.axios.delete("/blogapi/api/game/"+game,{})
}