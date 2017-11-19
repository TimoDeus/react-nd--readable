import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export const CategoryList = props => {
	const {categories, selected} = props;
	return (
		<div className='categories'>
				{categories.map(cat =>
						<Link key={cat.name} to={`/${cat.path}`}>
							<input type="radio" onChange={()=>{}} checked={cat.name === selected} /> {cat.name}
						</Link>
				)}
		</div>
	);
};

CategoryList.propTypes = {
	categories: PropTypes.array.isRequired,
	selected: PropTypes.string
};

export default CategoryList;
