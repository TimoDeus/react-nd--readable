import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchAllPostsIfNeeded, fetchCategoryPostsIfNeeded, addPost} from '../actions/posts';
import {connect} from 'react-redux';
import {Button, Card, Container, Menu, Modal} from 'semantic-ui-react';
import Header from './Header';
import Post from './Post';
import PostForm from './PostForm';

const SORT_OPTIONS = [
	{value: 'newest', comparator: (a, b) => b.timestamp - a.timestamp},
	{value: 'mostComments', comparator: (a, b) => b.commentCount - a.commentCount},
	{value: 'mostPopular', comparator: (a, b) => b.voteScore - a.voteScore}
];

class PostList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sortBy: SORT_OPTIONS[0],
			writePostModalOpen: false
		};
		this.setSortOrder = this.setSortOrder.bind(this);
	}

	componentWillMount() {
		this.fetchData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.category !== this.props.category) {
			this.fetchData(nextProps);
		} else if (nextProps.posts.length > this.props.posts.length) {
			this.toggleWritePostModal(false);
		}
	}

	fetchData(props) {
		this.props.fetchPostsIfNeeded(props);
	}

	toggleWritePostModal(show) {
		const visible = show === undefined ? !this.state.writePostModalOpen : show;
		this.setState({writePostModalOpen: visible});
	}

	setSortOrder(data) {
		this.setState({sortBy: data});
	}

	render() {
		const {posts, category, isFetching} = this.props;
		const sortedPosts = posts.sort(this.state.sortBy.comparator);
		return (
			<Container>

				<Header selected={category}/>

				<Menu secondary>
					<Menu.Item>
						<Button primary onClick={() => this.toggleWritePostModal()}>Write new post</Button>
					</Menu.Item>
					<Menu.Menu position='right'>
						{SORT_OPTIONS.map(option =>
							(<Menu.Item key={option.value} name={option.value} option={option}
													active={option.value === this.state.sortBy.value}
													onClick={(event, data) => this.setSortOrder(data.option)}/>)
						)}
					</Menu.Menu>
				</Menu>

				<Card.Group>
					{sortedPosts.map(post => (
						<Post key={post.id} isPreview={true} postId={post.id}/>
					))}
				</Card.Group>

				{!isFetching && !sortedPosts.length && <span className='empty'>Nothing to see, write the first post!</span>}

				<Modal open={this.state.writePostModalOpen} onClose={() => this.toggleWritePostModal()}>
					<Modal.Header>Write new post</Modal.Header>
					<Modal.Content>
						<PostForm selectedCategory={category}/>
					</Modal.Content>
				</Modal>
			</Container>
		);
	}
}

PostList.propTypes = {
	category: PropTypes.string,
	posts: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	fetchPostsIfNeeded: PropTypes.func.isRequired,
	dispatchAddPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	fetchPostsIfNeeded: props => {
		const fetcher = () => props.category ? fetchCategoryPostsIfNeeded(props.category) : fetchAllPostsIfNeeded();
		return dispatch(fetcher());
	},
	dispatchAddPost: post => dispatch(addPost(post))
});

const mapStateToProps = state => ({
	isFetching: state.posts.isFetching,
	posts: state.posts.data
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
