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

//REDUX
import { connect } from "react-redux";
import { selectStock, signInWithToken } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token && window.location.pathname !== "/") history.push("/");
    if (token) this.props.signInWithToken(token);
  }

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <NavBar />
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/users/login" exact component={LoginForm} />
          <Route path="/companyoverview" exact component={CompanyOverview} />
          <Route path="/users/create" exact component={NewUserForm} />
          <Route path="/mystocks" exact component={MyStocks} />
          <Route path="/users/update" exact component={UpdateProfile} />
          <Route path="/search" exact component={Search} />
          <Route path="/users/profile" exact component={UserProfile} />
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  signInWithToken,
  selectStock,
})(App);
