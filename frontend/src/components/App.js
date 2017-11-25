import React from 'react';
import {Route} from 'react-router-dom';
import PostDetails from './PostDetails';
import PostList from './PostList';

const App = () => (
	<div>
		<Route exact path='/:category?' render={({match}) =>
			<PostList {...match.params} />
		}/>
		<Route exact path='/:category/:postId' render={({match}) =>
			<PostDetails {...match.params} />
		}/>
	</div>
);

export default App;
