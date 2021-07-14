import httpmethods from '@/http/index'

export function querygetArticleCommitList (id){
    
    return httpmethods.axios.get("/blogapi/api/aricle/articleCommit/"+id,{})
}

export function addArticleCommit (obj){
    
    return httpmethods.axios.post("/blogapi/api/aricle/addArticleCommit",obj)
}