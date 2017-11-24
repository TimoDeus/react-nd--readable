import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCommentsIfNeeded} from '../actions/comments'
import {fetchPostIfNeeded} from '../actions/posts';
import {postPropTypes} from '../utils/propTypes';
import {Button, Container, Comment as UIComment, Header, Icon, Menu, Modal, Loader, Message} from 'semantic-ui-react';
import AppHeader from './Header';
import Post from './Post.js';
import {withRouter} from 'react-router-dom';
import CommentForm from './CommentForm';
import Comment from './Comment';

class PostDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commentModalOpen: false
		}
	}

	componentWillMount() {
		this.props.fetchCommentsIfNeeded();
		this.props.fetchPost();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.comments.length > this.props.comments.length) {
			this.toggleCommentModal(false);
		}
	}

	toggleCommentModal(show) {
		const visible = show === undefined ? !this.state.commentModalOpen : show;
		this.setState({commentModalOpen: visible});
	}

	navigateBack() {
		this.props.history.goBack();
	}

	render() {
		const {post, comments, category, isFetching, error} = this.props;
		const sortedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
		return (
			<Container>

				<Loader active={isFetching}/>

				<AppHeader selected={category}/>

				<Menu secondary>
					<Menu.Item>
						<Button primary onClick={() => this.navigateBack()}>Back</Button>
					</Menu.Item>
				</Menu>


				{!isFetching && (error || !post) && (
					<Message
						negative
						icon='bug'
						header='Content not found'
						content='We are sorry, but the requested content does not exist or was deleted.'
					/>
				)}

				{!isFetching && post && (
					<div>
						<Post isPreview={false} postId={post.id}/>
						<div>
							<Button floated={'right'} primary onClick={() => this.toggleCommentModal(true)}>Write comment</Button>

							<Header as='h3'>
								<Icon name='comment'/>
								<Header.Content>{comments.length} Comment(s)</Header.Content>
							</Header>

							{comments.length > 0 && (
								<UIComment.Group>
									{sortedComments.map(comment => <Comment key={comment.id} commentId={comment.id}/>)}
								</UIComment.Group>
							)}

							<Modal open={this.state.commentModalOpen} onClose={() => this.toggleCommentModal(false)}>
								<Modal.Header>Write comment</Modal.Header>
								<Modal.Content>
									<CommentForm parentId={post.id}/>
								</Modal.Content>
							</Modal>

						</div>
					</div>
				)}
			</Container>
		);
	}
}

PostDetails.propTypes = {
	fetchCommentsIfNeeded: PropTypes.func.isRequired,
	fetchPost: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
	post: PropTypes.shape(postPropTypes),
	postId: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchCommentsIfNeeded: () => dispatch(fetchCommentsIfNeeded(ownProps.postId)),
	fetchPost: () => dispatch(fetchPostIfNeeded(ownProps.postId))
});

const mapStateToProps = state => {
	return {
		comments: state.comments.data,
		post: state.posts.data.length > 0 ? state.posts.data[0] : undefined,
		isFetching: state.posts.isFetching,
		error: state.posts.error
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
