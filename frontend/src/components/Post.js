import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCommentsIfNeeded} from '../actions/comments'
import {fetchPostIfNeeded} from '../actions/posts';
import Comment from './Comment';
import {formatTimestamp} from '../utils/helper';
import VoteControls, {VOTE_POST} from './VoteControls';

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
							<VoteControls type={VOTE_POST} id={post.id} voteScore={post.voteScore} />
							<div className='body'>{post.body}</div>
							<div className='meta'><em>{post.author}</em> | <em>{formatTimestamp(post.timestamp)}</em></div>
						</div>
						{comments && (
							<div className='comments'>
								{comments.map(comment => (
									<Comment key={comment.id} comment={comment}/>
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
