import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {downvotePost, upvotePost} from '../actions/posts';
import {downvoteComment, upvoteComment} from '../actions/comments';
import {Button} from 'semantic-ui-react';

export const VOTE_COMMENT = 'comment';
export const VOTE_POST = 'post';

const VoteControls = props => {

	const triggerUpvote = () => {
		props.upvote();
	};

	const triggerDownvote = () => {
		props.downvote();
	};

	const {voteScore} = props;
	return (
		<Button.Group compact basic size='mini'>
			<Button icon='minus' onClick={triggerDownvote}/>
			<Button>{voteScore}</Button>
			<Button icon='plus' onClick={triggerUpvote}/>
		</Button.Group>
	);
};


VoteControls.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	voteScore: PropTypes.number.isRequired,
	upvote: PropTypes.func.isRequired,
	downvote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const obj = ownProps.type === VOTE_COMMENT ? state.comments : state.posts;
	return obj.data.length ? {
		voteScore: obj.data.find(item => item.id === ownProps.id).voteScore
	} : {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	upvote: () => {
		const upvoter = () => ownProps.type === VOTE_COMMENT ? upvoteComment(ownProps.id) : upvotePost(ownProps.id);
		return dispatch(upvoter());
	},
	downvote: () => {
		const downvoter = () => ownProps.type === VOTE_COMMENT ? downvoteComment(ownProps.id) : downvotePost(ownProps.id);
		return dispatch(downvoter())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteControls);
