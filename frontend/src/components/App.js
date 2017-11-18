import React, {Component} from 'react';
import Home from './Home';
import {Route} from 'react-router-dom';
import CategoryHome from './CategoryHome';
import Post from './Post';

class App extends Component {

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

export default App;
