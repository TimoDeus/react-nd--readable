import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCategoryPostsIfNeeded} from '../actions/posts'
import PostList from './PostList';
import {statePropTypes} from '../utils/propTypes';

class CategoryHome extends Component {

	static propTypes = {
		fetchPostsIfNeeded: PropTypes.func.isRequired,
		category: PropTypes.string.isRequired,
		posts: PropTypes.shape(statePropTypes).isRequired
	};

	componentWillMount() {
		this.props.fetchPostsIfNeeded();
	}

	render() {
		const {category, posts} = this.props;
		return (
			<div>
				<h2>{category}</h2>
				<div className='container'>
					<PostList posts={posts.data}/>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchPostsIfNeeded: () => dispatch(fetchCategoryPostsIfNeeded(ownProps.category))
});

const mapStateToProps = state => ({
	posts: state.posts
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHome);
