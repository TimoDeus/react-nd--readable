import {FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS} from '../actions/actionTypes';
import {handleFetchFailure, handleFetchRequest, handleFetchSuccess, initialState} from '../utils/stateUtils';

const categories = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES_REQUEST:
			return handleFetchRequest(state);
		case FETCH_CATEGORIES_FAILURE:
			return handleFetchFailure(state, action);
		case FETCH_CATEGORIES_SUCCESS:
			return handleFetchSuccess(state, action);
		default:
			return state;
	}
};

export default categories;
