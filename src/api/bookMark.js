import httpmethods from '@/http/index'

export function queryBookMarTagDetail (id,userid){
    
    return httpmethods.axios.get("/blogapi/api/bookmarktag/"+id+"/"+userid,{})
}

export function queryBookMarTagList(page,size,userid){
    
    return httpmethods.axios.get("/blogapi/api/bookmarktag/?page="+page+"&size="+size+"&userid="+userid,{})
}

export function saveBookMarTag(book){
    
    return httpmethods.axios.post("/blogapi/api/bookmarktag/",book)
}

export function delBookMarTag(book){
    
    return httpmethods.axios.delete("/blogapi/api/bookmarktag/"+book,{})
}