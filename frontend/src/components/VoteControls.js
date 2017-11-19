import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {upvotePost, downvotePost} from '../actions/posts';
import {upvoteComment, downvoteComment} from '../actions/comments';

export const VOTE_COMMENT = 'comment';
export const VOTE_POST = 'post';

class VoteControls extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		voteScore: PropTypes.number.isRequired,
		upvote: PropTypes.func.isRequired,
		downvote: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {voteScore: props.voteScore};
		this.triggerUpvote = this.triggerUpvote.bind(this);
		this.triggerDownvote = this.triggerDownvote.bind(this);
	}

	render() {
		const {voteScore} = this.state;
		return (
			<div>
				<button onClick={() => this.triggerDownvote()}>-</button>
				<span className='voteScore'>{voteScore}</span>
				<button onClick={() => this.triggerUpvote()}>+</button>
			</div>
		)
	}

	triggerUpvote() {
		this.setState({voteScore: this.state.voteScore + 1});
		this.props.upvote();
	}

	triggerDownvote() {
		this.setState({voteScore: this.state.voteScore - 1});
		this.props.downvote();
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	upvote: () => {
		const upvoter = () => ownProps.type === VOTE_COMMENT ? upvoteComment(ownProps.id) : upvotePost(ownProps.id);
		dispatch(upvoter());
	},
	downvote: () => {
		const downvoter = () => ownProps.type === VOTE_COMMENT ? downvoteComment(ownProps.id) : downvotePost(ownProps.id);
		dispatch(downvoter())
	}
});

export default connect(null, mapDispatchToProps)(VoteControls);
