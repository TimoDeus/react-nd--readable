import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from './Home';
import {Route} from 'react-router-dom';
import CategoryHome from './CategoryHome';
import Post from './Post';
import {fetchCategories} from '../actions/categories'
import PropTypes from 'prop-types';

class App extends Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired
	};

	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(fetchCategories());
	}

	render() {
		return (
			<div>
				<Route exact path='/' render={() =>
					<Home/>
				}/>
				<Route exact path='/:category' render={({match}) =>
					<CategoryHome {...match.params} />
				}/>
				<Route exact path='/:category/:postId' render={({match}) =>
					<Post {...match.params} />
				}/>
			</div>
		)
	}
}

export default connect()(App);
