import {FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, FETCH_POSTS_REQUEST} from '../actions/posts';
import {initialState, handleFetchFailure, handleFetchRequest, handleFetchSuccess} from '../utils/stateUtils';

const posts = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS_REQUEST:
			return handleFetchRequest(state);
		case FETCH_POSTS_FAILURE:
			return handleFetchFailure(state, action);
		case FETCH_POSTS_SUCCESS:
			return handleFetchSuccess(state, action);
		default:
			return state;
	}
};

export default posts;
