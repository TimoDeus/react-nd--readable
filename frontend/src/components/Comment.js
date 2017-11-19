import React from 'react';
import PropTypes from 'prop-types';
import {commentPropTypes} from '../utils/propTypes';
import VoteControls, {VOTE_COMMENT} from './VoteControls';

export const Comment = props => {
	const {comment} = props;
	return (
		<div className='comment'>
			<VoteControls id={comment.id} type={VOTE_COMMENT} voteScore={comment.voteScore}/>
			<div className='body'>{comment.body}</div>
		</div>
	);
};

Comment.propTypes = {
	comment: PropTypes.shape(commentPropTypes).isRequired,
};

export default Comment;
