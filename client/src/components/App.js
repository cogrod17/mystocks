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
  state = { user: {}, selectedStock: {} };

  componentDidMount() {
    console.log("updating app state");

    //check local storage to see if user is already signed in
    const token = JSON.parse(localStorage.getItem("token"));

    if (
      window.location.pathname === "/users/create" ||
      window.location.pathname === "/users/login"
    )
      return;

    if (!token) history.push("/");

    if (token) {
      axios
        .get("http://localhost:3001/users/profile", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          res.data.token = token;
          this.getUserInfo(res.data);
          if (window.location.pathname === "/") history.push("/home");
        })
        .catch((e) => console.log(e));
    }
  }

  getUserInfo = (userObject) => {
    if (!userObject) this.setState({ user: {}, selectedStock: {} });
    let selectedStock = JSON.parse(localStorage.getItem("selectedStock"));

    if (userObject.token) {
      localStorage.setItem("token", JSON.stringify(userObject.token));
    } else {
      userObject.token = JSON.parse(localStorage.getItem("token"));
    }

    this.setState({
      user: userObject,
      selectedStock: selectedStock ? selectedStock : {},
    });
  };

  viewStock = async (stock, price) => {
    console.log(stock);
    console.log(price);

    if (!price) price = undefined;
    this.setState({ selectedStock: { stock, price } }, () => {
      //console.log(this.state.selectedStock);
      localStorage.setItem(
        "selectedStock",
        JSON.stringify(this.state.selectedStock)
      );
      history.push("/companyoverview");
    });
  };

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Route path="/" exact component={LandingPage} />

          <Route
            path="/home"
            exact
            component={() => <Home viewStock={this.viewStock} />}
          />

          <Route
            path="/users/login"
            exact
            component={() => <LoginForm getUserInfo={this.getUserInfo} />}
          />

          <Route
            path="/companyoverview"
            exact
            component={() => (
              <CompanyOverview
                getUserInfo={this.getUserInfo}
                user={this.state.user}
                selectedStock={this.state.selectedStock}
              />
            )}
          />

          <Route
            path="/users/create"
            exact
            component={() => <NewUserForm getUserInfo={this.getUserInfo} />}
          />

          <Route
            path="/mystocks"
            exact
            component={() => (
              <MyStocks
                savedStocks={this.state.user.savedStocks}
                viewStock={this.viewStock}
              />
            )}
          />

          <Route
            path="/users/update"
            edit
            component={() => (
              <UpdateProfile
                getUserInfo={this.getUserInfo}
                userInfo={this.state.user}
              />
            )}
          />

          <Route
            path="/search"
            exact
            component={() => <Search viewStock={this.viewStock} />}
          />

          <Route
            path="/users/profile"
            exact
            component={() => (
              <UserProfile
                getUserInfo={this.getUserInfo}
                userInfo={this.state.user}
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
