import * as APIUtils from '../utils/APIUtils'

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

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

const shouldFetchComments = (postId, {comments}) =>
	!comments.isFetching && !comments.error && !comments.data.every(comment => comment.parentId === postId);

export const fetchCommentsIfNeeded = postId => (dispatch, getState) =>
	shouldFetchComments(postId, getState()) ? dispatch(fetchComments(postId)) : Promise.resolve();
