import React, { useEffect } from "react";
import Article from "./Article";
import Loader from "../reusables/Loader";

//redux
import { connect } from "react-redux";
import { getNews } from "../../actions";

const NewsFeed = ({ getNews, newsFeed }) => {
  useEffect(() => {
    getNews();
  }, [getNews]);

  const renderFeed = () => {
    if (newsFeed[0] === "error")
      return <div className="loader">Could not get news</div>;

    return newsFeed.slice(0, 10).map((item, i) => {
      return <Article key={i} article={item} />;
    });
  };

  return (
    <div className="news">
      <h1 className="news-top">News</h1>
      {newsFeed ? renderFeed() : <Loader />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { getNews })(NewsFeed);
