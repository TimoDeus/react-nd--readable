import React from 'react';
import PropTypes from 'prop-types';
import PostSnippet from './PostSnippet';

export const PostList = props => {
	const {posts} = props;
	return (
		<div className='posts'>
			{posts.map(post =>
				<PostSnippet key={post.id} post={post}/>
			)}
			{!posts.length && <span className='empty'>Nothing to see, write the first post!</span>}
		</div>
	);
};

PostList.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostList;
