import React, {Component} from 'react';
import Home from './Home';
import {Link, Route} from 'react-router-dom';
import Post from './Post';
import {Menu} from 'semantic-ui-react'

class App extends Component {

	render() {
		return (
			<div>
				<Menu inverted>
					<Menu.Item header>
						<Link to='/'>Readable</Link>
					</Menu.Item>
				</Menu>
				<Route exact path='/:category?' render={({match}) =>
					<Home {...match.params} />
				}/>
				<Route exact path='/:category/:postId' render={({match}) =>
					<Post {...match.params} />
				}/>
			</div>
		)
	}
}

export default App;
