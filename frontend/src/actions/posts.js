import * as APIUtils from '../utils/APIUtils'

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_CATEGORY_POSTS_SUCCESS = 'FETCH_CATEGORY_POSTS_SUCCESS';
export const FETCH_CATEGORY_POSTS_REQUEST = 'FETCH_CATEGORY_POSTS_REQUEST';
export const FETCH_CATEGORY_POSTS_FAILURE = 'FETCH_CATEGORY_POSTS_FAILURE';
export const WRITE_POST_REQUEST = 'WRITE_POST_REQUEST';
export const WRITE_POST_SUCCESS = 'WRITE_POST_SUCCESS';
export const WRITE_POST_FAILURE = 'WRITE_POST_FAILURE';
export const UPVOTE_POST_SUCCESS = 'UPVOTE_POST_SUCCESS';
export const UPVOTE_POST_REQUEST = 'UPVOTE_POST_REQUEST';
export const UPVOTE_POST_FAILURE = 'UPVOTE_POST_FAILURE';
export const DOWNVOTE_POST_REQUEST = 'DOWNVOTE_POST_REQUEST';
export const DOWNVOTE_POST_SUCCESS = 'DOWNVOTE_POST_SUCCESS';
export const DOWNVOTE_POST_FAILURE = 'DOWNVOTE_POST_FAILURE';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const deletePost = postId => dispatch => {
	dispatch({type: DELETE_POST_REQUEST});
	return APIUtils.deletePost(postId).then(
		() => dispatch({type: DELETE_POST_SUCCESS}),
		error => dispatch({type: DELETE_POST_FAILURE, error}),
	)
};

export const writePost = post => dispatch => {
	dispatch({type: WRITE_POST_REQUEST});
	return APIUtils.writePost(post).then(
		({data}) => {
			return dispatch({type: WRITE_POST_SUCCESS, post: data})
		},
		error => dispatch({type: WRITE_POST_FAILURE, error})
	)
};

export const upvotePost = postId => dispatch => {
	dispatch({type: UPVOTE_POST_REQUEST});
	return APIUtils.upvotePost(postId).then(
		() => dispatch({type: UPVOTE_POST_SUCCESS, payload: postId}),
		error => dispatch({type: UPVOTE_POST_FAILURE, error}),
	)
};

export const downvotePost = postId => dispatch => {
	dispatch({type: DOWNVOTE_POST_REQUEST});
	return APIUtils.downvotePost(postId).then(
		() => dispatch({type: DOWNVOTE_POST_SUCCESS, payload: postId}),
		error => dispatch({type: DOWNVOTE_POST_FAILURE, error})
	)
};

const doFetchPosts = (fetchMethod, {request, success, failure}) => dispatch => {
	dispatch({type: request});
	return fetchMethod().then(
		res => dispatch({
				type: success,
				data: res.data
			}
		),
		error => dispatch({
			type: failure,
			error: error.message
		}),
	);
};

const fetchAllPosts = () => doFetchPosts(
	() => APIUtils.fetchAllPosts(), {
		request: FETCH_POSTS_REQUEST,
		success: FETCH_POSTS_SUCCESS,
		failure: FETCH_POSTS_FAILURE
	});

const fetchCategoryPosts = category => doFetchPosts(
	() => APIUtils.fetchCategoryPosts(category), {
		request: FETCH_CATEGORY_POSTS_REQUEST,
		success: FETCH_CATEGORY_POSTS_SUCCESS,
		failure: FETCH_CATEGORY_POSTS_FAILURE
	});

const fetchPost = postId => doFetchPosts(
	() => APIUtils.fetchPost(postId), {
		request: FETCH_POST_REQUEST,
		success: FETCH_POST_SUCCESS,
		failure: FETCH_POST_FAILURE
	});

const shouldFetchPosts = ({posts}) => !posts.isFetching && !posts.error;

export const fetchAllPostsIfNeeded = () => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchAllPosts()) : Promise.resolve();

export const fetchCategoryPostsIfNeeded = category => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchCategoryPosts(category)) : Promise.resolve();

export const fetchPostIfNeeded = postId => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchPost(postId)) : Promise.resolve();
