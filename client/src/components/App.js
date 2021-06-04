import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import NewUserForm from "./welcome/NewUserForm";
import LoginForm from "./welcome/LoginForm";
import UserProfile from "./profile/UserProfile";
import UpdateProfile from "./profile/UpdateProfile";
import Search from "./search/Search";
import LandingPage from "./welcome/LandingPage";
import Home from "./home/Home";
import CompanyOverview from "./company-view/CompanyOverview";
import NavBar from "./reusables/NavBar";
import Footer from "./reusables/Footer";
import MyStocks from "./my-stocks/MyStocks";
import Modal from "./reusables/Modal";
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
          <Modal />
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
