import React from 'react';
import { observer, inject } from 'mobx-react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 27,
        marginBottom: 20,
        color: '#e86667'
    },
    field: {
        height: 50,
        width: '80%',
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 10,
        padding: 15
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        backgroundColor: '#e86667',
        width: '100%',
        marginLeft: 0,
        marginRight: 0
    }
});

@inject('authStore')
@observer
export default class Login extends React.Component {
    state = {
        loading: false
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        const { authStore } = this.props;

        authStore[e.target.name] = e.target.value;
    }

    async handleLogin(e) {
        const { authStore } = this.props;

        this.setState({ loading: true });
        try {
            await authStore.login();
        } catch (err) {
            this.setState({ loading: false });
        }
    }

    render() {
        const { loading } = this.state;
        const { authStore } = this.props;

        return <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.header}>Relogio Login</Text>
            <TextInput
                style={styles.field}
                placeholder='Username'
                name='username'
                value={authStore.username}
                onChange={this.handleChange}
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType={"next"}
                keyboardType='email-address'
                onSubmitEditing={() => { this.passwordField.focus(); }} />
            <TextInput
                ref={i => { this.passwordField = i }}
                style={styles.field}
                placeholder='Password'
                name='password'
                value={authStore.password}
                onChange={this.handleChange}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                returnKeyType={"done"}
                onSubmitEditing={this.handleLogin} />

            <Button
                loading={loading}
                ref={i => { this.loginButton = i }}
                onPress={this.handleLogin}
                title='Login'
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button} />
        </KeyboardAvoidingView>
    }
}