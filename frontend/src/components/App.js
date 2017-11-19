import React, {Component} from 'react';
import Home from './Home';
import {Link, Route} from 'react-router-dom';
import CategoryHome from './CategoryHome';
import Post from './Post';

class App extends Component {

	render() {
		return (
			<div>
				<Link to='/'><h1>Readable</h1></Link>
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
