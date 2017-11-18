import React from 'react';
import PropTypes from 'prop-types'

const Post = props => (
	<div>
		Post: {props.postId} in category {props.category}
	</div>
);

Post.propTypes = {
	category: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired
};

export default Post;
