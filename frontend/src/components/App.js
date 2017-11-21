import React, {Component} from 'react';
import Home from './Home';
import {Route} from 'react-router-dom';
import Post from './Post';
import theme from '../assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';

class App extends Component {

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div>
					<AppBar title='Readable'/>
					<Route exact path='/:category?' render={({match}) =>
						<Home {...match.params} />
					}/>
					<Route exact path='/:category/:postId' render={({match}) =>
						<Post {...match.params} />
					}/>
				</div>
			</ThemeProvider>
		)
	}
}

export default App;
