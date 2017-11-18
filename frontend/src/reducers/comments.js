import {FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST} from '../actions/comments';
import {initialState, handleFetchFailure, handleFetchRequest, handleFetchSuccess} from '../utils/stateUtils';

const comments = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COMMENTS_REQUEST:
			return handleFetchRequest(state);
		case FETCH_COMMENTS_FAILURE:
			return handleFetchFailure(state, action);
		case FETCH_COMMENTS_SUCCESS:
			return handleFetchSuccess(state, action);
		default:
			return state;
	}
};

export default comments;
