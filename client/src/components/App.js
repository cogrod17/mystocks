import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import LandingPage from "./LandingPage";
import Home from "./Home";
import WatchList from "./WatchList";
import UpdateUser from "./UpdateUser";
import "../styles/App.css";
// import axios from "axios";

//When refreshing from any page it sends the user to home

class App extends React.Component {
  state = {};

  componentDidMount() {
    //check local storage to see if user is already signed in
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) history.push("/");
    if (user) {
      this.setState(user);
      //exposes _id: maybe not so smart
      history.push("/home");
    }

    /*
    if (token) {
      axios
        .get("https://localhost:3001/users/profile", {
          token,
        })
        .then((res) => {
          this.setState(res);
          console.log(this.state);
          history.push("/users/profile");
        })
        .catch(() => {
          window.location.pathname = "/";
        });
    }
    */
  }

  getUserInfo = (userObject) => {
    this.setState(userObject);
    console.log(this.state);
    //set user object to local storage
    localStorage.setItem("user", JSON.stringify(this.state));
  };

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={Home} />
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
          <Route path="/watchlist" exact component={WatchList} />
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
