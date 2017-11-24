import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {upvotePost, downvotePost} from '../actions/posts';
import {upvoteComment, downvoteComment} from '../actions/comments';

export const VOTE_COMMENT = 'comment';
export const VOTE_POST = 'post';

class VoteControls extends Component {

	constructor(props) {
		super(props);
		this.triggerUpvote = this.triggerUpvote.bind(this);
		this.triggerDownvote = this.triggerDownvote.bind(this);
	}

	render() {
		const {voteScore} = this.props;
		return (
			<div>
				<button onClick={() => this.triggerDownvote()}>-</button>
				<span className='voteScore'>{voteScore}</span>
				<button onClick={() => this.triggerUpvote()}>+</button>
			</div>
		)
	}

	triggerUpvote() {
		this.props.upvote();
	}

	triggerDownvote() {
		this.props.downvote();
	}
}

VoteControls.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	voteScore: PropTypes.number.isRequired,
	upvote: PropTypes.func.isRequired,
	downvote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const obj = ownProps.type === VOTE_COMMENT ? state.comments : state.posts;
	return  obj.data.length ? {
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
