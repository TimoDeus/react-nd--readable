import {
	FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST,
	UPVOTE_COMMENT_SUCCESS, DOWNVOTE_COMMENT_SUCCESS, ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS, EDIT_COMMENT_SUCCESS
} from '../actions/comments';
import {initialState, handleFetchFailure, handleFetchRequest, handleFetchSuccess} from '../utils/stateUtils';

const comments = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COMMENTS_REQUEST:
			return handleFetchRequest(state);
		case FETCH_COMMENTS_FAILURE:
			return handleFetchFailure(state, action);
		case FETCH_COMMENTS_SUCCESS:
			return handleFetchSuccess(state, action);
		case UPVOTE_COMMENT_SUCCESS: {
			const newState = {...state, data: [...state.data]};
			newState.data.find(comment => comment.id === action.payload).voteScore++;
			return newState;
		}
		case DOWNVOTE_COMMENT_SUCCESS: {
			const newState = {...state, data: [...state.data]};
			newState.data.find(comment => comment.id === action.payload).voteScore--;
			return newState;
		}
		case ADD_COMMENT_SUCCESS: {
			return {...state, data: [...state.data, action.comment]};
		}
		case DELETE_COMMENT_SUCCESS: {
			const newState = {...state, data: [...state.data]};
			newState.data = newState.data.filter(comment => comment.id !== action.payload);
			return newState;
		}
		case EDIT_COMMENT_SUCCESS: {
			const newState = {...state, data: [...state.data]};
			const index = newState.data.findIndex(comment => comment.id === action.comment.id);
			newState.data[index] = action.comment;
			return newState;
		}
		default:
			return state;
	}
};

export default comments;
