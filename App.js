import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, observer, inject } from 'mobx-react';
import AuthStore from './stores/auth';
import JobsStore from './stores/jobs';
import Login from './views/login';
import Dashboard from './views/dashboard';

const stores = {
	authStore: AuthStore,
	jobsStore: JobsStore
};

@inject('authStore')
@observer
class AppRoot extends React.Component {
	render() {
		const { authStore } = this.props;
		const authenticated = authStore.isLoggedIn();

		if (authenticated) {
			return (
				<Dashboard />
			);
		} else {
			return (
				<Login />
			);
		}
	}
}


export default class App extends React.Component {
	render() {
		return (
			<Provider {...stores}>
				<AppRoot />
			</Provider>
		);
	}
}
