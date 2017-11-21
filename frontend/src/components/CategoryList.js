import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategoriesIfNeeded} from '../actions/categories';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Tab from 'react-toolbox/lib/tabs/Tab';

export class CategoryList extends Component {

	constructor(props) {
		super(props);
		this.onTabChange = this.onTabChange.bind(this);
		this.getCategories = this.getCategories.bind(this);
	}

	componentWillMount() {
		this.props.fetchCategoriesIfNeeded();
	}

	getCategories() {
		const categories = [...this.props.categories];
		categories.unshift({name: 'all', path: ''});
		return categories;
	}

	onTabChange(index) {
		const {history} = this.props;
		history.push(`/${this.getCategories()[index].path}`);
	}

	render() {
		const {selected} = this.props;
		const categories = this.getCategories();
		const selectedIndex = Math.max(categories.findIndex(cat => cat.name === selected), 0);
		return (
			<Tabs index={selectedIndex} onChange={this.onTabChange} className='categories'>
				{categories.map(cat => <Tab key={cat.name} label={cat.name}/> )}
			</Tabs>
		);
	}
}

CategoryList.propTypes = {
	history: PropTypes.shape.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList));
