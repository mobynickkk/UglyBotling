import React from 'react';
import SignInSignUp from "./components/SignInSignUp/SignInSignUp";
import Landing from "./components/landing/landing";
import Constructor from "./components/constructor/constructor";

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          token: "",
          previous_page: <SignInSignUp navigate={this.navigate} get_token={this.get_token}  />,
          current_page: <Landing navigate={this.navigate} token={""}/>
      };
      this.get_token = this.get_token.bind(this);
  }

  get_token = (token_) => {
    console.log(token_);
    this.setState({
      token: token_,
      current_page: <Landing navigate={this.navigate} token={token_}/>
    });
    console.log(this);
  };

  navigate = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "navigate__back") {
      this.setState({
        previous_page: this.state.current_page,
        current_page: this.state.previous_page
      });
    }
    else if (e.currentTarget.name === "navigate__signin") {
      this.setState({
        previous_page: <Landing navigate={this.navigate} token={this.state.token} />,
        current_page: <SignInSignUp navigate={this.navigate} get_token={this.get_token} />
      });
    }
    else if (e.currentTarget.name === "navigate__create_bot") {
      this.setState({
        previous_page: this.state.current_page,
        current_page: <Constructor username={this.state.username} navigate={this.navigate} token={this.state.token} />
      })
    }
  };

  render() {
    return (
        this.state.current_page
    );
  }
}

export default App;
