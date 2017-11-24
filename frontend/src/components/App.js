import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PostDetails from './PostDetails';
import PostList from './PostList';

class App extends Component {

	render() {
		return (
			<div>
				<Route exact path='/:category?' render={({match}) =>
					<PostList {...match.params} />
				}/>
				<Route exact path='/:category/:postId' render={({match}) =>
					<PostDetails {...match.params} />
				}/>
			</div>
		)
	}
}

export default App;
