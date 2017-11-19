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
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

export const upvotePost = postId => dispatch => {
	return APIUtils.upvotePost(postId).then(
		() => dispatch({type: UPVOTE_POST})
	)
};

export const downvotePost = postId => dispatch => {
	return APIUtils.downvotePost(postId).then(
		() => dispatch({type: DOWNVOTE_POST})
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
