import * as APIUtils from '../utils/APIUtils'

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const UPVOTE_COMMENT_REQUEST = 'UPVOTE_COMMENT_REQUEST';
export const UPVOTE_COMMENT_SUCCESS = 'UPVOTE_COMMENT_SUCCESS';
export const UPVOTE_COMMENT_FAILURE = 'UPVOTE_COMMENT_FAILURE';
export const DOWNVOTE_COMMENT_REQUEST = 'DOWNVOTE_COMMENT_REQUEST';
export const DOWNVOTE_COMMENT_SUCCESS = 'DOWNVOTE_COMMENT_SUCCESS';
export const DOWNVOTE_COMMENT_FAILURE = 'DOWNVOTE_COMMENT_FAILURE';
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const deleteComment = commentId => dispatch => {
	dispatch({type: DELETE_COMMENT_REQUEST});
	return APIUtils.deleteComment(commentId).then(
		({data}) => dispatch({type: DELETE_COMMENT_SUCCESS, payload: data.id}),
		error => dispatch({type: DELETE_COMMENT_FAILURE, error}),
	)
};

export const addComment = comment => dispatch => {
	dispatch({type: ADD_COMMENT_REQUEST});
	return APIUtils.addComment(comment).then(
		({data}) => dispatch({type: ADD_COMMENT_SUCCESS, comment: data}),
		error => dispatch({type: ADD_COMMENT_FAILURE, error})
	)
};

export const editComment = comment => dispatch => {
	dispatch({type: EDIT_COMMENT_REQUEST});
	return APIUtils.editComment(comment).then(
		({data}) => dispatch({type: EDIT_COMMENT_SUCCESS, comment: data}),
		error => dispatch({type: EDIT_COMMENT_FAILURE, error})
	)
};

export const upvoteComment = commentId => dispatch => {
	dispatch({type: UPVOTE_COMMENT_REQUEST});
	return APIUtils.upvoteComment(commentId).then(
		() => dispatch({type: UPVOTE_COMMENT_SUCCESS, payload: commentId}),
		error => dispatch({type: UPVOTE_COMMENT_FAILURE, error})
	)
};

export const downvoteComment = commentId => dispatch => {
	dispatch({type: DOWNVOTE_COMMENT_REQUEST});
	return APIUtils.downvoteComment(commentId).then(
		() => dispatch({type: DOWNVOTE_COMMENT_SUCCESS, payload: commentId}),
		error => dispatch({type: DOWNVOTE_COMMENT_FAILURE, error})
	)
};

const fetchComments = postId => dispatch => {
	dispatch({type: FETCH_COMMENTS_REQUEST});
	return APIUtils.fetchComments(postId).then(
		res => dispatch({
				type: FETCH_COMMENTS_SUCCESS,
				data: res.data
			}
		),
		error => dispatch({
			type: FETCH_COMMENTS_FAILURE,
			error: error.message
		}),
	);
};

const shouldFetchComments = (postId, {comments}) => {
	return !comments.isFetching && !comments.error &&
		(!comments.data.length || !comments.data.every(comment => comment.parentId === postId));
};

export const fetchCommentsIfNeeded = postId => (dispatch, getState) =>
	shouldFetchComments(postId, getState()) ? dispatch(fetchComments(postId)) : Promise.resolve();
