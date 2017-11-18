import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCommentsIfNeeded} from '../actions/comments'
import {fetchPostIfNeeded} from '../actions/posts';

class Post extends Component {

	static propTypes = {
		fetchCommentsIfNeeded: PropTypes.func.isRequired,
		fetchPost: PropTypes.func.isRequired,
		comments: PropTypes.array.isRequired,
		post: PropTypes.oneOfType([PropTypes.shape({title: PropTypes.string}), PropTypes.array]).isRequired,
		postId: PropTypes.string.isRequired,
	};

	componentWillMount() {
		// TODO comments are not fetched correctly
		this.props.fetchCommentsIfNeeded();
		this.props.fetchPost();
	}

	render() {
		const {post} = this.props;
		return (
			<div>
				<h1>Readable</h1>
				<h3>Post</h3>
				<div className='container'>
					<div className='posts'>
						<div>{post.title}</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchCommentsIfNeeded: () => dispatch(fetchCommentsIfNeeded(ownProps.postId)),
	fetchPost: () => dispatch(fetchPostIfNeeded(ownProps.postId))
});

const mapStateToProps = state => {
	return {
		comments: state.comments.data,
		post: state.posts.data
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
