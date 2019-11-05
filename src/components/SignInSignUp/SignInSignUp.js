import React from 'react';
import SignUpForm from "./SignUpForm";
import './SignInSignUp.css';
import back from '../../icons/left_arrow.svg';
import SignInForm from "./SignInForm";

class SignInSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: <SignUpForm get_token={this.props.get_token} />
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="App">
                <div className="App-aside">
                    <button className="App-aside-back" name="navigate__back" onClick={this.props.navigate}><img src={back} alt="Back"/></button>
                </div>
                <div className="App-form">
                    <div className="form-title">
                        <button className="switcher-item" onClick={e => {
                            e.preventDefault();
                            this.setState({form: <SignInForm get_token={this.props.get_token} />});
                            e.currentTarget.parentElement
                                .getElementsByClassName("switcher-item switcher-item-active")
                                .item(0).className = "switcher-item";
                            e.currentTarget.className = "switcher-item switcher-item-active";
                        }}>Sign In
                        </button>
                        or
                        <button className="switcher-item switcher-item-active" onClick={e => {
                            e.preventDefault();
                            this.setState({form: <SignUpForm get_token={this.props.get_token} />});
                            e.currentTarget.parentElement
                                .getElementsByClassName("switcher-item switcher-item-active")
                                .item(0).className = "switcher-item";
                            e.currentTarget.className = "switcher-item switcher-item-active";
                        }}>Sign Up
                        </button>
                    </div>
                    {this.state.form}
                </div>
            </div>
        )
    }
}

export default SignInSignUp;