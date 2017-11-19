import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export const CategoryList = props => {
	const {categories} = props;
	return (
		<div className='categories'>
			<ul>
				{categories.map(cat =>
					<li key={cat.name}>
						<Link to={`/${cat.path}`}>
							{cat.name}
						</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

CategoryList.propTypes = {
	categories: PropTypes.array.isRequired,
};

export default CategoryList;
