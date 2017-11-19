import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {postPropTypes} from '../utils/propTypes';

export const PostSnippet = props => {
	const {post} = props;
	return (
		<div key={post.id} className='postSnippet'>
			<div className='top'>
				<Link to={`/${post.category}/${post.id}`}>
					{post.title}
				</Link>
			</div>
			<div className='bottom'>
				<span className='author'>{post.author}</span>
			</div>
		</div>
	);
};

PostSnippet.propTypes = {
	post: PropTypes.shape(postPropTypes).isRequired,
};

export default PostSnippet;
