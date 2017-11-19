import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCategoriesIfNeeded} from '../actions/categories'
import {fetchAllPostsIfNeeded} from '../actions/posts'
import {statePropTypes} from '../utils/propTypes';
import CategoryList from './CategoryList';
import PostList from './PostList';

class Home extends Component {

	static propTypes = {
		fetchPostsIfNeeded: PropTypes.func.isRequired,
		fetchCategoriesIfNeeded: PropTypes.func.isRequired,
		categories: PropTypes.shape(statePropTypes).isRequired,
		posts: PropTypes.shape(statePropTypes).isRequired
	};

	componentWillMount() {
		this.props.fetchCategoriesIfNeeded();
		this.props.fetchPostsIfNeeded();
	}

	render() {
		const {categories, posts} = this.props;
		return (
			<div>
				<h2>Frontpage</h2>
				<div className='container'>
					{categories && <CategoryList categories={categories.data}/>}
					{posts && <PostList posts={posts.data}/>}
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	fetchPostsIfNeeded: () => dispatch(fetchAllPostsIfNeeded()),
	fetchCategoriesIfNeeded: () => dispatch(fetchCategoriesIfNeeded())
});

const mapStateToProps = state => ({
	categories: state.categories,
	posts: state.posts
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
