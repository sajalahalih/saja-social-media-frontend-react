export const isLikedByReqUser=(reqUserId,post)=>{
    
    for (let user of post.liked){
       if( reqUserId===user.id){
        return true;
       }
    }

    return false;
}

// export const isLikedByReqUser = (reqUserId, post) => {
//     if (!post.liked || !Array.isArray(post.liked)) {
//         return false;
//     }
//     for (let user of post.liked) {
//         if (reqUserId === user.id) {
//             return true;
//         }
//     }
//     return false;
// }
