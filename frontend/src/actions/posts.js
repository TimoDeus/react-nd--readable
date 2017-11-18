import * as APIUtils from '../utils/APIUtils'

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

const doFetchPosts = fetch => dispatch => {
	dispatch({type: FETCH_POSTS_REQUEST});
	return fetch().then(
		res => dispatch({
				type: FETCH_POSTS_SUCCESS,
				data: res.data
			}
		),
		error => dispatch({
			type: FETCH_POSTS_FAILURE,
			error: error.message
		}),
	);
};

const fetchAllPosts = () => doFetchPosts(() => APIUtils.fetchAllPosts());

const fetchCategoryPosts = category => doFetchPosts(() => APIUtils.fetchCategoryPosts(category));

const fetchPost = postId => doFetchPosts(() => APIUtils.fetchPost(postId));

const shouldFetchPosts = ({posts}) => !posts.isFetching && !posts.error;

export const fetchAllPostsIfNeeded = () => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchAllPosts()) : Promise.resolve();

export const fetchCategoryPostsIfNeeded = category => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchCategoryPosts(category)) : Promise.resolve();

export const fetchPostIfNeeded = postId => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchPost(postId)) : Promise.resolve();
