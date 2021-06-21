import httpmethods from '@/http/index'

export function queryBookDetail (id){
    
    return httpmethods.axios.get("/blogapi/api/book/"+id,{})
}

export function queryBookList(page,size){
    
    return httpmethods.axios.get("/blogapi/api/book/?page="+page+"&size="+size,{})
}

export function saveBook(book){
    
    return httpmethods.axios.post("/blogapi/api/book/",book)
}

export function delBook(book){
    
    return httpmethods.axios.delete("/blogapi/api/book/"+book,{})
}