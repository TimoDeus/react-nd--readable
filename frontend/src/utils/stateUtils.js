export const initialState = {
	isFetching: false,
	error: '',
	data: []
};

export const handleFetchSuccess = (state, action) => ({
	...state,
	isFetching: false,
	error: initialState.error,
	data: action.data
});

export const handleFetchFailure = (state, action) => ({
	...state,
	isFetching: false,
	error: action.error,
	data: initialState.data
});

export const handleFetchRequest = state => ({
	...state,
	isFetching: true,
	error: initialState.error
});
