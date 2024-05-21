import { useDispatch } from "react-redux";
import { likeCommentAction, dislikeCommentAction } from "./redux/actions/post.action";

const CommentComponent = ({ commentId }) => {
    const dispatch = useDispatch();

    const handleLikeComment = () => {
        dispatch(likeCommentAction(commentId));
    };

    const handleDislikeComment = () => {
        dispatch(dislikeCommentAction(commentId));
    };

    return (
        <div>
            <button onClick={handleLikeComment}>Like</button>
        </div>
    );
};

export default CommentComponent;
