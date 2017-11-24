import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Comment as UIComment, Divider, Modal} from 'semantic-ui-react';
import {commentPropTypes} from '../utils/propTypes';
import {formatTimestamp, gravatarImageSrc} from '../utils/helper';
import {deleteComment, editComment} from '../actions/comments';
import CommentForm from './CommentForm';
import VoteControls, {VOTE_COMMENT} from './VoteControls';

class Comment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commentModalOpen: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			this.toggleCommentModal(false);
		}
	}

	deleteComment = comment => {
		this.props.deleteCommentById(comment.id);
	};

	toggleCommentModal = show => {
		const visible = show === undefined ? !this.state.editPostModalOpen : show;
		this.setState({commentModalOpen: visible});
	};

	render() {
		const {comment} = this.props;
		return comment ? (
			<UIComment>
				<UIComment.Avatar src={gravatarImageSrc(comment.author)}/>
				<UIComment.Content>
					<UIComment.Metadata className='floatRight'>
						<VoteControls type={VOTE_COMMENT} id={comment.id}/>
					</UIComment.Metadata>
					<UIComment.Author>{comment.author}</UIComment.Author>
					<UIComment.Metadata>
						<span>{formatTimestamp(comment.timestamp)}</span>
					</UIComment.Metadata>
					<UIComment.Text>{comment.body}</UIComment.Text>
					<UIComment.Actions>
						<UIComment.Action onClick={() => this.toggleCommentModal(true)}>Edit</UIComment.Action>
						<UIComment.Action onClick={() => this.deleteComment(comment)}>Delete</UIComment.Action>
					</UIComment.Actions>
				</UIComment.Content>

				<Divider/>

				<Modal open={this.state.commentModalOpen} onClose={() => this.toggleCommentModal(false)}>
					<Modal.Header>Edit comment</Modal.Header>
					<Modal.Content>
						<CommentForm commentId={comment.id} parentId={comment.parentId}/>
					</Modal.Content>
				</Modal>
			</UIComment>
		) : null;
	}
}

Comment.propTypes = {
	deleteCommentById: PropTypes.func.isRequired,
	editCommentById: PropTypes.func.isRequired,
	commentId: PropTypes.string.isRequired,
	comment: PropTypes.shape(commentPropTypes).isRequired
};

const mapDispatchToProps = dispatch => ({
	deleteCommentById: commentId => dispatch(deleteComment(commentId)),
	editCommentById: commentId => dispatch(editComment(commentId))
});

const mapStateToProps = (state, ownProps) => ({
	comment: (ownProps.commentId && state.comments.data ?
			state.comments.data.find(comment => comment.id === ownProps.commentId) :
			undefined
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
