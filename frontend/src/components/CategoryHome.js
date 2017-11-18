import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCategoryPostsIfNeeded} from '../actions/posts'
import {Link} from 'react-router-dom';

class CategoryHome extends Component {

	static propTypes = {
		fetchPostsIfNeeded: PropTypes.func.isRequired,
		category: PropTypes.string.isRequired,
		posts: PropTypes.array.isRequired
	};

	componentWillMount() {
		this.props.fetchPostsIfNeeded();
	}

	render() {
		const {category, posts} = this.props;
		return (
			<div>
				<h1>Readable</h1>
				<h3>{category}</h3>
				<div className='container'>
					<div className='posts'>
						{posts.length ?
							<ul>
								{posts.map(post =>
									<li key={post.id}>
										<Link to={`/${post.category}/${post.id}`}>
											{post.title}
										</Link>
									</li>
								)}
							</ul> :
							<span className='empty'>Nothing to see, write the first post!</span>
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchPostsIfNeeded: () => dispatch(fetchCategoryPostsIfNeeded(ownProps.category))
});

const mapStateToProps = state => ({
	posts: state.posts.data
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHome);
