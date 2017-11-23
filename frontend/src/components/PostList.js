import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VoteControls, {VOTE_POST} from './VoteControls';
import {Link} from 'react-router-dom';
import {formatTimestamp} from '../utils/helper';
import {deletePost, fetchAllPostsIfNeeded, fetchCategoryPostsIfNeeded, writePost} from '../actions/posts';
import {connect} from 'react-redux';
import uuid from 'uuid'
import Button from 'react-toolbox/lib/button/Button';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';

const SORT_OPTIONS = [
	{value: 'dateDesc', label: 'Sort by date (descending)', comparator: (a, b) => b.timestamp - a.timestamp},
	{value: 'dateAsc', label: 'Sort by date (ascending)', comparator: (a, b) => a.timestamp - b.timestamp},
	{value: 'voteDesc', label: 'Sort by votes (descending)', comparator: (a, b) => b.voteScore - a.voteScore},
	{value: 'voteAsc', label: 'Sort by votes (ascending)', comparator: (a, b) => a.voteScore - b.voteScore},
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
		return this.props.fetchPostsIfNeeded(props).then(
			({data}) => this.setState({posts: data})
		);
	}

	setSortOrder(value) {
		this.setState({sortBy: SORT_OPTIONS.find(opt => opt.value === value)});
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
		return this.props.writeNewPost(post).then(
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

				<Dropdown
					source={SORT_OPTIONS}
					onChange={this.setSortOrder}
					value={this.state.sortBy.value}
				/>

				<Button label='Write new post' raised primary onMouseUp={() => this.writeMockedPost()}/>

				<div className='posts'>
					{sortedPosts.map(post => (
						<Card key={post.id}>
							<Link key={post.id} to={`/${post.category}/${post.id}`}>
								<CardTitle
									title={post.title}
									subtitle={`Written by ${post.author} on ${formatTimestamp(post.timestamp)} in ${post.category}`}
								/>
							</Link>
							<CardActions>
								<VoteControls type={VOTE_POST} id={post.id}/>
								<Button label='Delete' onMouseUp={() => this.doDeletePost(post.id)}/>
							</CardActions>
						</Card>
					))}

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
		return dispatch(fetcher());
	},
	writeNewPost: post => dispatch(writePost(post))
});

const mapStateToProps = state => ({
	posts: state.posts.data
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
