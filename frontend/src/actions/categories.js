import * as APIUtils from '../utils/APIUtils'
import {FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS} from './actionTypes';

const fetchCategories = () => dispatch => {
	dispatch({type: FETCH_CATEGORIES_REQUEST});
	return APIUtils.fetchCategories().then(
		({data}) => dispatch({
				type: FETCH_CATEGORIES_SUCCESS,
				data: data.categories
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
