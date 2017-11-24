import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Modal} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import {postPropTypes} from '../utils/propTypes';
import {formatTimestamp} from '../utils/helper';
import VoteControls, {VOTE_POST} from './VoteControls';
import {deletePost, editPost} from '../actions/posts';
import PostForm from './PostForm';

class Post extends Component {

	constructor(props) {
		super(props);
		this.onDeletePost = this.onDeletePost.bind(this);
		this.toggleEditPostModal = this.toggleEditPostModal.bind(this);
		this.state = {
			editPostModalOpen: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			this.toggleEditPostModal(false);
		}
	}

	onDeletePost(post) {
		const {deletePostById, isPreview, history} = this.props;
		deletePostById(post.id).then(
			() => {
				if (!isPreview) {
					history.replace(`/${post.category}`);
				}
			}
		);
	}

	toggleEditPostModal(show) {
		const visible = show === undefined ? !this.state.editPostModalOpen : show;
		this.setState({editPostModalOpen: visible});
	}

	render() {
		const {post, isPreview} = this.props;
		return post ? (
				<Card fluid color='blue'>
					<Card.Content>
						<Card.Header>
							{
								isPreview ?
									<Link to={`/${post.category}/${post.id}`}>{post.title}</Link> :
									post.title
							}
							<div className='floatRight'><VoteControls type={VOTE_POST} id={post.id}/></div>
						</Card.Header>
						<Card.Meta>
							<span>Written by <b>{post.author}</b></span>
							<span> in <Link to={`/${post.category}`}><b>{post.category}</b></Link></span>
							<span> | {formatTimestamp(post.timestamp)}</span>
						</Card.Meta>
					</Card.Content>
					{!isPreview && <Card.Content>{post.body}</Card.Content>}
					<Card.Content extra>

						{!!isPreview && (
							<span><Icon name='comment'/> {post.commentCount} Comment(s)</span>
						)}

						<Button icon floated='right' size='mini' onClick={() => this.onDeletePost(post)}>
							<Icon name='trash'/> Delete
						</Button>
						{!isPreview && (
							<Button icon floated='right' size='mini' onClick={() => this.toggleEditPostModal()}>
								<Icon name='edit'/> Edit
							</Button>
						)}
					</Card.Content>

					<Modal open={this.state.editPostModalOpen} onClose={() => this.toggleEditPostModal()}>
						<Modal.Header>Edit post</Modal.Header>
						<Modal.Content>
							<PostForm postId={post.id}/>
						</Modal.Content>
					</Modal>

				</Card>
		) : null;
	}
}

Post.propTypes = {
	isPreview: PropTypes.bool.isRequired,
	deletePostById: PropTypes.func.isRequired,
	editPostById: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	post: PropTypes.shape(postPropTypes).isRequired,
	history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
	deletePostById: postId => dispatch(deletePost(postId)),
	editPostById: postId => dispatch(editPost(postId))
});

const mapStateToProps = (state, ownProps) => ({
	post: (ownProps.postId && state.posts.data ?
			state.posts.data.find(post => post.id === ownProps.postId) :
			undefined
	),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
