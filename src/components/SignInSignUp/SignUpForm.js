import React from 'react';
import './SignInSignUp.css';

class SignUpForm extends React.Component {
    render() {
        return (
            <div className="form-body">
                <form onSubmit={async e => {
                    e.preventDefault();
                    console.log(JSON.stringify({data: {
                                    username: document.getElementById("username").value,
                                    email: document.getElementById("email").value,
                                    password: document.getElementById("password").value
                                }}));
                    const response = await fetch("http://127.0.0.1:8000/api/signup/",
                        {
                            protocol: "http:",
                            credentials: "same-origin",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify({
                                    username: document.getElementById("username").value,
                                    email: document.getElementById("email").value,
                                    password: document.getElementById("password").value
                                })
                        }
                    );
                    console.log(response);
                    const response_text = await response.text();
                    this.props.get_token(response_text);
                }}>
                    <div className="form-field">
                        <label className="field-label">Username</label>
                        <input type="text" id="username" autoComplete="off" className="field-input"
                               placeholder="Enter your username"/>
                    </div>

                    <div className="form-field">
                        <label className="field-label">Email</label>
                        <input type="email" id="email" autoComplete="off" className="field-input"
                               placeholder="Enter your E-mail"/>
                    </div>

                    <div className="form-field">
                        <label className="field-label">Password</label>
                        <input type="password" id="password" className="field-input" placeholder="Enter your password"/>
                    </div>

                    <input type="submit" className="field-submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}

export default SignUpForm;