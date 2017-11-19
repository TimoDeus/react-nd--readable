import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostSnippet from './PostSnippet';

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

	setSortOrder(id) {
		this.setState({sortBy: SORT_OPTIONS.find(opt => opt.id === id)});
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
				<div className='posts'>
					{sortedPosts.map(post =>
						<PostSnippet key={post.id} post={post}/>
					)}
					{!sortedPosts.length && <span className='empty'>Nothing to see, write the first post!</span>}
				</div>
			</div>
		);
	}
}

PostList.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostList;
