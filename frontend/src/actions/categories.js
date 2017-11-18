import * as APIUtils from '../utils/APIUtils'

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const fetchCategories = () => dispatch => {
	dispatch({type: FETCH_CATEGORIES_REQUEST});
	return APIUtils.fetchCategories().then(
		res => dispatch({
				type: FETCH_CATEGORIES_SUCCESS,
				data: res.data.categories
			}
		),
		error => dispatch({
			type: FETCH_CATEGORIES_FAILURE,
			error: error.message
		}),
	);
};

const shouldFetchCategories = ({categories}) =>
	!categories || ( !categories.isFetching && !categories.error && !categories.data.length);

export const fetchCategoriesIfNeeded = () => (dispatch, getState) =>
	shouldFetchCategories(getState()) ? dispatch(fetchCategories()) : Promise.resolve();
