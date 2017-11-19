import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategoriesIfNeeded} from '../actions/categories';

export class CategoryList extends Component {

	componentWillMount() {
		this.props.fetchCategoriesIfNeeded();
	}

	render() {
		const {categories, selected} = this.props;
		return (
			<div className='categories'>
				<h2>{selected}</h2>
				{categories.map(cat =>
					<Link key={cat.name} to={`/${cat.path}`}>
						{cat.name === selected ? (<b>{cat.name}</b>) : cat.name}
						<br/>
					</Link>
				)}
			</div>
		);
	}
}

CategoryList.propTypes = {
	categories: PropTypes.array.isRequired,
	selected: PropTypes.string,
	fetchCategoriesIfNeeded: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	fetchCategoriesIfNeeded: () => dispatch(fetchCategoriesIfNeeded()),
});

const mapStateToProps = state => ({
	categories: state.categories.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
