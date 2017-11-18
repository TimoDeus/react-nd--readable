import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCategoriesIfNeeded} from '../actions/categories'
import {fetchPostsIfNeeded} from '../actions/posts'
import {statePropTypes} from '../utils/stateUtils';
import {Link} from 'react-router-dom';

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
				<h1>Readable</h1>
				<h3>Frontpage</h3>
				<div className='container'>
					<div className='categories'>
						<ul>
							{categories.data && categories.data.map(cat =>
								<li key={cat.name}>
									<Link to={`/${cat.path}`}>
										{cat.name}
									</Link>
								</li>
							)}
						</ul>
					</div>
					<div className='posts'>
						<ul>
							{posts.data && posts.data.map(post =>
								<li key={post.id}>
									<Link to={`/${post.category}/${post.id}`}>
										{post.title}
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	fetchPostsIfNeeded: () => dispatch(fetchPostsIfNeeded()),
	fetchCategoriesIfNeeded: () => dispatch(fetchCategoriesIfNeeded())
});

const mapStateToProps = state => ({
	categories: state.categories,
	posts: state.posts
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
