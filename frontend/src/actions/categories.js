import * as APIUtils from '../utils/APIUtils'

const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategories = () => dispatch => {
	dispatch({type: FETCH_CATEGORIES_REQUEST});
	return APIUtils.fetchCategories().then(
		data => dispatch({type: FETCH_CATEGORIES_SUCCESS, data}),
		() => dispatch({type: FETCH_CATEGORIES_FAILURE}),
	);
};
