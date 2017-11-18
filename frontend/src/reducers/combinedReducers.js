import {combineReducers} from 'redux';
import posts from './posts';
import comments from './comments';
import categories from './categories';

const combinedReducers = combineReducers({
	categories,
	comments,
	posts
});

export default combinedReducers;
