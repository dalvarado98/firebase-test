import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Auth from '../../services/Auth'

const SIGNIN_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...SIGNIN_STATE };
    }

    onSubmit = async event => {
        const { email, password } = this.state;
        Auth
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...SIGNIN_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <div>
                <h1>SignIn</h1>
                <form>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <button onClick={this.onSubmit} disabled={isInvalid} type="submit">
                        Sign In
                    </button>
                    {error && <p>{error.message}</p>}
                </form>
                <p>
                    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </p>
            </div>
        );
    }
}

const SignInForm = withRouter(SignInPage);
export default SignInPage;
export { SignInForm };