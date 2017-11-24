import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCommentsIfNeeded} from '../actions/comments'
import {fetchPostIfNeeded} from '../actions/posts';
import {formatTimestamp} from '../utils/helper';
import VoteControls, {VOTE_COMMENT} from './VoteControls';
import {postPropTypes} from '../utils/propTypes';
import {Button, Comment, Container, Divider, Header, Icon, Menu} from 'semantic-ui-react';
import AppHeader from './Header';
import Post from './Post';
import {withRouter} from 'react-router-dom';

class PostDetails extends Component {

	static propTypes = {
		fetchCommentsIfNeeded: PropTypes.func.isRequired,
		fetchPost: PropTypes.func.isRequired,
		comments: PropTypes.array.isRequired,
		post: PropTypes.shape(postPropTypes),
		postId: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		history: PropTypes.shape().isRequired,
	};

	componentWillMount() {
		this.props.fetchCommentsIfNeeded();
		this.props.fetchPost();
	}

	navigateBack() {
		this.props.history.goBack();
	}

	render() {
		const {post, comments, category} = this.props;
		return (
			<Container>

				<AppHeader selected={category}/>

				<Menu secondary>
					<Menu.Item position='left'>
						<Button primary onClick={() => this.navigateBack()}>Back</Button>
					</Menu.Item>
					<Menu.Item position='right'>
						<span>something</span>
					</Menu.Item>
				</Menu>

				<Post isPreview={false} onDeletePost={this.doDeletePost} post={post}/>

				<div>
					<Button floated={'right'} primary onClick={() => this.toggleWritePostModal()}>Write comment</Button>

					<Header as='h3'>
						<Icon name='comment'/>
						<Header.Content>{comments.length} Comment(s)</Header.Content>
					</Header>

					{comments.map(comment => (
						<Comment key={comment.id}>
							<Comment.Content>
								<Comment.Metadata className='floatRight'>
									<VoteControls type={VOTE_COMMENT} id={comment.id}/>
								</Comment.Metadata>
								<Comment.Author>{comment.author}</Comment.Author>
								<Comment.Metadata>
									<span>{formatTimestamp(comment.timestamp)}</span>
								</Comment.Metadata>
								<Comment.Text>{comment.body}</Comment.Text>
							</Comment.Content>
							<Divider/>
						</Comment>
					))}
				</div>
			</Container>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
