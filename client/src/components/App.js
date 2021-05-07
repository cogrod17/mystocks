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
import axios from "axios";

//When refreshing from any page it sends the user to home

class App extends React.Component {
  state = {};

  componentDidMount() {
    //check local storage to see if user is already signed in
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) history.push("/");
    if (token) {
      axios
        .get("http://localhost:3001/users/profile", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          res.data.token = token;
          this.setState(res.data);
        })
        .catch((e) => console.log(e));
    }
  }

  ///PUT AXIOS GET REQUEST IN APP SO YOU
  /// CAN STORE THE JSUT TOKEN IN local storage

  getUserInfo = (userObject) => {
    this.setState(userObject);
    //set token to local storage
    if (userObject)
      localStorage.setItem("token", JSON.stringify(this.state.token));
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
