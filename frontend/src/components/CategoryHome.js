import React from 'react';
import PropTypes from 'prop-types'

const CategoryHome = props => (
	<div>
		Category Home: {props.category}
	</div>
);

CategoryHome.propTypes = {
	category: PropTypes.string.isRequired
};

export default CategoryHome;
