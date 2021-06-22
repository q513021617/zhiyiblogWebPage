import httpmethods from '@/http/index'

export function queryMusicDetail (id){
    
    return httpmethods.axios.get("/blogapi/api/music/"+id,{})
}

export function queryMusicList(page,size){
    
    return httpmethods.axios.get("/blogapi/api/music/?page="+page+"&size="+size,{})
}

export function saveMusic(book){
    
    return httpmethods.axios.post("/blogapi/api/music/",book)
}

export function delMusic(book){
    
    return httpmethods.axios.delete("/blogapi/api/music/"+book,{})
}