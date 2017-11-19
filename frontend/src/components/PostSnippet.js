import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {postPropTypes} from '../utils/propTypes';
import VoteControls, {VOTE_POST} from './VoteControls';
import {formatTimestamp} from '../utils/helper';

export const PostSnippet = props => {
	const {post} = props;
	return (
		<div key={post.id} className='postSnippet'>
			<div className='top'>
				<VoteControls type={VOTE_POST} id={post.id} voteScore={post.voteScore}/>
				<Link to={`/${post.category}/${post.id}`}>
					{post.title}
				</Link>
			</div>
			<div className='bottom'>
				<span className='author'>{post.author} | {formatTimestamp(post.timestamp)}</span>
			</div>
		</div>
	);
};

PostSnippet.propTypes = {
	post: PropTypes.shape(postPropTypes).isRequired,
};

export default PostSnippet;
