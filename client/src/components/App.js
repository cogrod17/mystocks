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
import NavBar from "./NavBar";
import Footer from "./Footer";
import MyStocks from "./MyStocks";
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

    if (!token && window.location.pathname !== "/")
      window.location.pathname = "/";

    if (token) {
      axios
        .get("http://localhost:3001/users/profile", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          res.data.token = token;
          this.getUserInfo(res.data);
          if (window.location.pathname === "/")
            window.location.pathname = "/home";
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
    if (!stock) return;
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

  onLogout = () => {
    console.log("clicked");
    console.log(this.state.user.token);

    // axios
    //     .get("http://localhost:3001/users/profile", {
    //       headers: { Authorization: "Bearer " + token },
    //     })

    axios
      .post(
        "http://localhost:3001/users/logout",
        {},
        {
          headers: { Authorization: "Bearer " + this.state.user.token },
        }
      )
      .then(() => {
        localStorage.clear();
        this.setState({ user: {}, selectedStock: {} });
        window.location.pathname = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // showNav = () => {
  //   let path = window.location.pathname;

  //   if (path === "/" || path === "/users/login" || path === "/users/create")
  //     return null;

  //   return <NavBar token={this.state.user.token} onLogout={this.onLogout} />;
  // };

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <NavBar token={this.state.user.token} onLogout={this.onLogout} />
          <Route path="/" exact component={LandingPage} />

          <Route
            path="/home"
            exact
            component={() => (
              <Home userInfo={this.state.user} viewStock={this.viewStock} />
            )}
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
          <Footer token={this.state.user.token} />
        </Router>
      </div>
    );
  }
}

export default App;
