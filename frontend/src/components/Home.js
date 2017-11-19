import React from 'react';
import PropTypes from 'prop-types';
import CategoryList from './CategoryList';
import PostList from './PostList';


const Home = props => {
	const {category} = props;
	return (
		<div>
			<h2>Frontpage</h2>
			<div className='container'>
				<CategoryList selected={category}/>
				<PostList category={category}/>
			</div>
		</div>
	)
};

Home.propTypes = {
	category: PropTypes.string,
};

export default Home;
