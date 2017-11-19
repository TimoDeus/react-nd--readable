import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCategoriesIfNeeded} from '../actions/categories'
import {fetchAllPostsIfNeeded, fetchCategoryPostsIfNeeded} from '../actions/posts'
import {statePropTypes} from '../utils/propTypes';
import CategoryList from './CategoryList';
import PostList from './PostList';

class Home extends Component {

	static propTypes = {
		fetchPostsIfNeeded: PropTypes.func.isRequired,
		fetchCategoriesIfNeeded: PropTypes.func.isRequired,
		category: PropTypes.string,
		categories: PropTypes.shape(statePropTypes).isRequired,
		posts: PropTypes.shape(statePropTypes).isRequired
	};

	componentWillMount() {
		this.fetchData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.category !== this.props.category) {
			this.fetchData(nextProps);
		}
	}

	fetchData(props) {
		this.props.fetchCategoriesIfNeeded();
		this.props.fetchPostsIfNeeded(props);
	}

	render() {
		const {categories, posts, category} = this.props;
		return (
			<div>
				<h2>Frontpage</h2>
				<div className='container'>
					{categories && <CategoryList categories={categories.data} selected={category}/>}
					{posts && <PostList posts={posts.data}/>}
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	fetchPostsIfNeeded: props => {
		const fetcher = () => props.category ? fetchCategoryPostsIfNeeded(props.category) : fetchAllPostsIfNeeded();
		dispatch(fetcher());
	},
	fetchCategoriesIfNeeded: () => dispatch(fetchCategoriesIfNeeded())
});

const mapStateToProps = state => ({
	categories: state.categories,
	posts: state.posts
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
