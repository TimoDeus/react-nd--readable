import {
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_REQUEST,
	FETCH_CATEGORY_POSTS_FAILURE,
	FETCH_CATEGORY_POSTS_SUCCESS,
	FETCH_CATEGORY_POSTS_REQUEST,
	FETCH_POST_REQUEST,
	FETCH_POST_FAILURE,
	FETCH_POST_SUCCESS
} from '../actions/posts';
import {initialState, handleFetchFailure, handleFetchRequest, handleFetchSuccess} from '../utils/stateUtils';

const posts = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POST_REQUEST:
		case FETCH_POSTS_REQUEST:
		case FETCH_CATEGORY_POSTS_REQUEST:
			return handleFetchRequest(state);
		case FETCH_POST_FAILURE:
		case FETCH_POSTS_FAILURE:
		case FETCH_CATEGORY_POSTS_FAILURE:
			return handleFetchFailure(state, action);
		case FETCH_POSTS_SUCCESS:
		case FETCH_CATEGORY_POSTS_SUCCESS:
			return handleFetchSuccess(state, action);
		case FETCH_POST_SUCCESS: {
			const res = handleFetchSuccess(state, action);
			res.data = [res.data];
			return res;
		}
		default:
			return state;
	}
};

export default posts;
