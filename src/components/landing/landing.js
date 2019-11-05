import React from 'react';
import './landing.sass';
import icon from '../../icons/lgbt.svg';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: <button className="nav__button" name="navigate__signin"
                                onClick={this.props.navigate}>Sign In/Sign Up</button>
        }
    }

    componentDidMount() {
        if (this.props.token !== "") {
            this.setState({
                button: <button className="nav__button" name="navigate__create_bot"
                                onClick={this.props.navigate}>Create Bot</button>
            })
        }
    }

    render() {
        return (
            <div className="Landing">
                <nav className="nav">
                    <div className="nav__naming"><img className="nav__naming__icon" src={icon} /></div>
                    <menu className="nav__menu">
                        <a className="menu__item"><div>About Us</div></a>
                        <a className="menu__item"><div>Bots</div></a>
                    </menu>
                    {this.state.button}
                </nav>
                <main className="main">
                    <div className="main__start">
                        <span className="main__title">Try out creating bot on yourself</span>
                        <span className="main__subtitle">Free due to it is a school project</span>
                        <button className="main__button">Create bot!</button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Landing;