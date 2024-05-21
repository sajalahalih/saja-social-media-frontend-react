export const isCommentLikedByReqUser=(reqUserId,comment)=>{
    
    for (let user of comment.liked){
       if( reqUserId===user.id){
        return true;
       }
    }

    return false;
}