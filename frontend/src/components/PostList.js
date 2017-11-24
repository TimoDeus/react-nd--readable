import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {deletePost, fetchAllPostsIfNeeded, fetchCategoryPostsIfNeeded, writePost} from '../actions/posts';
import {connect} from 'react-redux';
import uuid from 'uuid'
import {Button, Card, Container, Form, Icon, Menu, Modal} from 'semantic-ui-react';
import {formatTimestamp} from '../utils/helper';
import {Link} from 'react-router-dom';
import VoteControls, {VOTE_POST} from './VoteControls';

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
			writePostModalOpen: false,
			formData: {},
		};
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

	toggleWritePostModal() {
		this.setState({writePostModalOpen: !this.state.writePostModalOpen, formData: {}, formValid: true});
	}

	setSortOrder(data) {
		this.setState({sortBy: data});
	}

	doDeletePost(postId) {
		this.props.deletePostById(postId).then(
			() => this.fetchData(this.props)
		);
		return false;

	}

	handleChange = (e, {name, value}) => {
		const newEntry = {[name]: value};
		this.setState(prevState => ({...prevState, formData: {...prevState.formData, ...newEntry}}));
	};

	handleSubmit = () => {
		const {formAuthor, formCategory, formPost, formTitle} = this.state.formData;
		if (formAuthor && formCategory && formPost && formTitle) {
			const post = {
				id: uuid(),
				title: formTitle,
				body: formPost,
				author: formAuthor,
				timestamp: Date.now(),
				category: formCategory
			};
			return this.props.writeNewPost(post).then(
				() => this.fetchData(this.props).then(
					() => this.toggleWritePostModal()
				)
			);
		}
	};

	render() {
		const {posts} = this.props;
		const sortedPosts = posts.sort(this.state.sortBy.comparator);
		return (
			<Container className='postsContainer'>

				<Menu secondary>
					<Menu.Item>
						<Button primary onClick={() => this.toggleWritePostModal()}>Write new post</Button>
					</Menu.Item>
					<Menu.Item position='right'>
						{SORT_OPTIONS.map(option =>
							(<Menu.Item key={option.value} name={option.value} option={option}
													active={option.value === this.state.sortBy.value}
													onClick={(event, data) => this.setSortOrder(data.option)}/>)
						)}
					</Menu.Item>
				</Menu>

				<Card.Group>
					{sortedPosts.map(post => (
						<Card key={post.id} fluid color='blue'>
							<Card.Content>
								<Card.Header>
									<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
									<div style={{float: 'right'}}><VoteControls type={VOTE_POST} id={post.id}/></div>
								</Card.Header>
								<Card.Meta>
									Written by <b>{post.author}</b> in <Link to={`/${post.category}`}><b>{post.category}</b></Link>
									| {formatTimestamp(post.timestamp)}
								</Card.Meta>
								<Card.Description floated='left'>
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<Icon name='comment'/>
								{post.commentCount} Comment(s)
								<Button icon floated='right' size='mini' onClick={() => this.doDeletePost(post.id)}><Icon name='trash'/>
									Delete</Button>
							</Card.Content>
						</Card>
					))}
				</Card.Group>

				{!sortedPosts.length && <span className='empty'>Nothing to see, write the first post!</span>}

				<Modal open={this.state.writePostModalOpen} onClose={() => this.toggleWritePostModal()}>
					<Modal.Header>Write new post</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group widths='equal'>
								<Form.Input label='Author' name='formAuthor' placeholder='Author' required onChange={this.handleChange}/>
								<Form.Select
									label='Category' placeholder='Category' name='formCategory' required value={this.props.category}
									onChange={this.handleChange}
									options={this.props.categories.map(cat => ({key: cat.name, value: cat.name, text: cat.name}))}
								/>
							</Form.Group>
							<Form.Input label='Title' name='formTitle' placeholder='Title' required onChange={this.handleChange}/>
							<Form.TextArea label='Post' name='formPost' required onChange={this.handleChange}/>
							<Button type='submit'>Submit</Button>
						</Form>
					</Modal.Content>
				</Modal>
			</Container>
		);
	}
}

PostList.propTypes = {
	category: PropTypes.string,
	posts: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
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
	posts: state.posts.data,
	categories: state.categories.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
