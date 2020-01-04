import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Form, Icon, Input, Button } from 'antd';
import Auth from '../../services/Auth'

const SIGNUP_FORM_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...SIGNUP_FORM_STATE
        }
    }

    onSubmit = async event => {
        const { username, email, passwordOne } = this.state;
        Auth
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...SIGNUP_FORM_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div>
                <h1>SignUp</h1>
                <Form>
                    <Form.Item label="Username">
                        <input
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Full Name"
                        />
                    </Form.Item>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button onClick={this.onSubmit} disabled={isInvalid} type="submit">Sign Up</button>
                    {error && <p>{error.message}</p>}
                </Form>
            </div>
        );
    }
}

const SignUpForm = withRouter(SignUpPage);

export default SignUpPage;
export { SignUpForm };