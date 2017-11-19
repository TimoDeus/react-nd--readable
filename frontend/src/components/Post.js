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
		post: PropTypes.shape({
			title: PropTypes.string
		}),
		postId: PropTypes.string.isRequired,
	};

	componentWillMount() {
		// TODO comments are not fetched correctly
		this.props.fetchCommentsIfNeeded();
		this.props.fetchPost();
	}

	render() {
		const {post, comments} = this.props;
		return (
			<div>
				{post && (
					<div className='container'>
						<div className='post'>
							<h2>{post.title}</h2>
						</div>
						{comments && (
							<div className='comments'>
								{comments.map(comment => (
									<div key={comment.id} className='comment'>
										<div className='body'>{comment.body}</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
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
		post: state.posts.data.length > 0 ? state.posts.data[0] : undefined
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
