import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import Search from "./Search";
import LandingPage from "./LandingPage";
import Home from "./Home";
import CompanyOverview from "./CompanyOverview";
import Footer from "./Footer";
import MyStocks from "./MyStocks";
//import UpdateUser from "./UpdateUser";
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
          if (window.location.pathname === "/") history.push("/home");
        })
        .catch((e) => console.log(e));
    }
  }

  ///PUT AXIOS GET REQUEST IN APP SO YOU
  /// CAN STORE THE JSUT TOKEN IN local storage

  getUserInfo = (userObject) => {
    this.setState(userObject);
    console.log(this.state);
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
          <Route path="/companyoverview" exact component={CompanyOverview} />
          <Route
            path="/users/create"
            exact
            component={() => <NewUserForm getUserInfo={this.getUserInfo} />}
          />
          <Route path="/mystocks" exact component={MyStocks} />
          <Route
            path="/users/update"
            edit
            component={() => (
              <UpdateProfile
                getUserInfo={this.getUserInfo}
                userInfo={this.state}
              />
            )}
          />
          <Route path="/search" exact component={Search} />
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
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
