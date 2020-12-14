import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@test.com',
        };
        this.updateEmailField = this.updateEmailField.bind(this);
    }

    updateEmailField = (event) => {
        this.setState({ ...this.state, email: event.target.value });
    };

    render() {
        const { email } = this.state;

        return (
            <div>
                <h1>{email}</h1>
                <input
                    type="email"
                    name="email"
                    onChange={this.updateEmailField}
                />
            </div>
        );
    }
}

export default SignUp;
