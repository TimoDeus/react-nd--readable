import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VoteControls, {VOTE_POST} from './VoteControls';
import {Link} from 'react-router-dom';
import {formatTimestamp} from '../utils/helper';
import {deletePost, fetchAllPostsIfNeeded, fetchCategoryPostsIfNeeded, writePost} from '../actions/posts';
import {connect} from 'react-redux';
import uuid from 'uuid'

const SORT_OPTIONS = [
	{id: 'dateDesc', name: 'Sort by date (descending)', comparator: (a, b) => b.timestamp - a.timestamp},
	{id: 'dateAsc', name: 'Sort by date (ascending)', comparator: (a, b) => a.timestamp - b.timestamp},
	{id: 'voteDesc', name: 'Sort by votes (descending)', comparator: (a, b) => b.voteScore - a.voteScore},
	{id: 'voteAsc', name: 'Sort by votes (ascending)', comparator: (a, b) => a.voteScore - b.voteScore},
];

class PostList extends Component {

	constructor(props) {
		super(props);
		this.state = {sortBy: SORT_OPTIONS[0]};
		this.setSortOrder = this.setSortOrder.bind(this);
	}

	componentWillMount() {
		this.fetchData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.category !== this.props.category) {
			this.fetchData(nextProps);
		}
	}

	fetchData(props) {
		this.props.fetchPostsIfNeeded(props);
	}

	setSortOrder(id) {
		this.setState({sortBy: SORT_OPTIONS.find(opt => opt.id === id)});
	}

	writeMockedPost() {
		const post = {
			id: uuid(),
			title: uuid(),
			body: uuid(),
			author: 'Timo',
			timestamp: Date.now(),
			category: this.props.category || 'react'
		};
		this.props.writeNewPost(post).then(
			() => this.fetchData(this.props)
		);
	}

	doDeletePost(postId) {
		return this.props.deletePostById(postId).then(
			() => this.fetchData(this.props)
		);
	}

	render() {
		const {posts} = this.props;
		const sortedPosts = posts.sort(this.state.sortBy.comparator);
		return (
			<div className='postsContainer'>
				<div>
					<select value={this.state.sortBy.id} onChange={event => this.setSortOrder(event.target.value)}>
						{SORT_OPTIONS.map(opt =>
							<option key={opt.id} value={opt.id}>{opt.name}</option>
						)}
					</select>
				</div>
				<button onClick={() => this.writeMockedPost()}>Write new post</button>
				<div className='posts'>
					{sortedPosts.map(post =>
						<div key={post.id} className='postSnippet'>
							<div className='top'>
								<VoteControls type={VOTE_POST} id={post.id} voteScore={post.voteScore}/>
								<Link to={`/${post.category}/${post.id}`}>
									{post.title}
								</Link>
							</div>
							<div className='bottom'>
						<span className='author'>{post.author} | {formatTimestamp(post.timestamp)} | <button
							onClick={() => this.doDeletePost(post.id)}>Delete</button></span>
							</div>
						</div>
					)}
					{!sortedPosts.length && <span className='empty'>Nothing to see, write the first post!</span>}
				</div>
			</div>
		);
	}
}

PostList.propTypes = {
	category: PropTypes.string,
	posts: PropTypes.array.isRequired,
	deletePostById: PropTypes.func.isRequired,
	fetchPostsIfNeeded: PropTypes.func.isRequired,
	writeNewPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	deletePostById: postId => dispatch(deletePost(postId)),
	fetchPostsIfNeeded: props => {
		const fetcher = () => props.category ? fetchCategoryPostsIfNeeded(props.category) : fetchAllPostsIfNeeded();
		dispatch(fetcher());
	},
	writeNewPost: post => dispatch(writePost(post))
});

const mapStateToProps = state => ({
	posts: state.posts.data
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
