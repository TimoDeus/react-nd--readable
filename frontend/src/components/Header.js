import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategoriesIfNeeded} from '../actions/categories';
import {Menu} from 'semantic-ui-react';

export class Header extends Component {

	constructor(props) {
		super(props);
		this.onTabChange = this.onTabChange.bind(this);
		this.getCategories = this.getCategories.bind(this);
	}

	componentDidMount() {
		this.props.fetchCategoriesIfNeeded();
	}

	getCategories() {
		const categories = [...this.props.categories];
		categories.unshift({name: 'all', path: ''});
		return categories;
	}

	onTabChange(path) {
		const {history} = this.props;
		history.push(`/${path}`);
	}

	render() {
		const selected = this.props.selected || 'all';
		const categories = this.getCategories();
		return (
			<Menu inverted>
				<Menu.Item header>
					<Link to='/'>Readable</Link>
				</Menu.Item>
				<Menu.Menu position='right'>
					{categories.map(cat =>
						<Menu.Item
							key={cat.name} name={cat.name}
							active={cat.name === selected}
							onClick={() => this.onTabChange(cat.path)}/>)}
				</Menu.Menu>
			</Menu>
		);
	}
}

Header.propTypes = {
	history: PropTypes.shape().isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
