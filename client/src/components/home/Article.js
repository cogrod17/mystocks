import React from "react";

const Article = ({ article }) => {
  return (
    <div className="article">
      <div className="article-header">
        <h3 className="article-title">{article.headline}</h3>

        <img className="article-img" src={`${article.image}`} alt="news-pic" />
      </div>
      <div className="article-break"></div>

      <p className="article-summary">{article.summary}</p>
      <a className="article-link" href={`${article.url}`}>
        {article.source}
      </a>
    </div>
  );
};

export default Article;
