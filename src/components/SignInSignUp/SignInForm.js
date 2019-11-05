import React from 'react';
import './SignInSignUp.css';

class SignInForm extends React.Component {
    render() {
        return (
            <div className="form-body-sign-in">
                <form onSubmit={async e => {
                    e.preventDefault();
                    const response = await fetch("127.0.0.1:8000/api/signin/",
                        {
                            protocol: "http:",
                            method: "POST",
                            body: JSON.stringify({data: {
                                    username: document.getElementById("username").value,
                                    password: document.getElementById("password").value
                                }})
                        }
                    );
                    const response_text = await response.text();
                    this.props.get_token(response_text);
                }}>
                    <div className="form-field-sign-in">
                        <label className="field-label">Username</label>
                        <input type="text" id="username" autoComplete="off" className="field-input"
                               placeholder="Enter your username"/>
                    </div>
                    <div className="form-field-sign-in">
                        <label className="field-label">Password</label>
                        <input type="password" id="password" className="field-input" placeholder="Enter your password"/>
                    </div>
                    <button className="field-submit">Sign In</button>
                </form>
            </div>
        )
    }
}

export default SignInForm;