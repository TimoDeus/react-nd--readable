import {FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST} from '../actions/categories';
import {initialState, handleFetchFailure, handleFetchRequest, handleFetchSuccess} from '../utils/stateUtils';

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
