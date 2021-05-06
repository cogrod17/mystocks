import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import LandingPage from "./LandingPage";
import UpdateUser from "./UpdateUser";
import "../styles/App.css";

class App extends React.Component {
  state = {};

  async componentDidMount() {
    //check local storage to see if user is already signed in
    const data = await localStorage.getItem("state");
    if (data) this.setState(JSON.parse(data));

    if (this.state) history.push("/users/profile");
  }

  getUserInfo = (userObject) => {
    //localStorage.setItem("state", JSON.stringify(this.state));
    this.setState(userObject);
    console.log(this.state);
    //set user object to local storage
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/users/login"
            exact
            component={() => <LoginForm getUserInfo={this.getUserInfo} />}
          />
          <Route
            path="/users/create"
            exact
            component={() => <NewUserForm getUserInfo={this.getUserInfo} />}
          />
          <Route
            path="/users/profile"
            exact
            component={() => (
              <UserProfile
                getUserInfo={this.getUserInfo}
                userInfo={this.state}
              />
            )}
          />
          <Route path="/users/update" exact component={UpdateUser} />
        </Router>
      </div>
    );
  }
}

export default App;
