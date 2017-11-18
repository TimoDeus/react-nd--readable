import * as APIUtils from '../utils/APIUtils'

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

const fetchPosts = category => dispatch => {
	dispatch({type: FETCH_POSTS_REQUEST});
	const promise = category ? APIUtils.fetchCategoryPosts(category) : APIUtils.fetchAllPosts();
	return promise.then(
		res => {
			dispatch({
					type: FETCH_POSTS_SUCCESS,
					data: res.data
				}
			)
		},
		error => dispatch({
			type: FETCH_POSTS_FAILURE,
			error: error.message
		}),
	);
};

const shouldFetchPosts = ({posts}) => !posts.isFetching && !posts.error;

export const fetchPostsIfNeeded = category => (dispatch, getState) =>
	shouldFetchPosts(getState()) ? dispatch(fetchPosts(category)) : Promise.resolve();
