import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Form} from 'semantic-ui-react';
import {commentPropTypes} from '../utils/propTypes';
import uuid from 'uuid'
import {addComment, editComment} from '../actions/comments';

class CommentForm extends Component {

	constructor(props) {
		super(props);
		const {comment} = props;
		this.state = {
			formAuthor: comment ? comment.author : '',
			formBody: comment ? comment.body : '',
		}
	}

	handleChange = (e, {name, value}) => {
		const newEntry = {[name]: value};
		this.setState(prevState => ({...prevState, ...newEntry}));
	};

	handleSubmit = () => {
		const isEditMode = !!this.props.commentId;
		isEditMode ? this.editComment() : this.addComment()
	};

	addComment() {
		const {parentId} = this.props;
		const {formAuthor, formBody} = this.state;
		if (formAuthor && formBody) {
			const comment = {
				id: uuid(),
				timestamp: Date.now(),
				body: formBody,
				author: formAuthor,
				parentId
			};
			return this.props.dispatchAddComment(comment);
		}
	}

	editComment() {
		const {commentId} = this.props;
		const {formBody} = this.state;
		if (formBody) {
			const comment = {
				id: commentId,
				body: formBody
			};
			return this.props.dispatchEditComment(comment);
		}
	}

	render() {
		const {formAuthor, formBody} = this.state;
		const isEditMode = !!this.props.commentId;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Input
					label='Author' name='formAuthor' placeholder='Author' value={formAuthor}
					required disabled={isEditMode} onChange={this.handleChange}
				/>
				<Form.TextArea
					label='Comment' name='formBody' value={formBody}
					required onChange={this.handleChange}
				/>
				<Button type='submit'>Submit</Button>
			</Form>
		);
	}
}

CommentForm.propTypes = {
	dispatchAddComment: PropTypes.func.isRequired,
	dispatchEditComment: PropTypes.func.isRequired,
	parentId: PropTypes.string.isRequired,
	commentId: PropTypes.string,
	comment: PropTypes.shape(commentPropTypes)
};

const mapDispatchToProps = dispatch => ({
	dispatchAddComment: comment => dispatch(addComment(comment)),
	dispatchEditComment: comment => dispatch(editComment(comment))
});

const mapStateToProps = (state, ownProps) => ({
	comment: (ownProps.commentId && state.comments.data ?
			state.comments.data.find(comment => comment.id === ownProps.commentId) :
			undefined
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
