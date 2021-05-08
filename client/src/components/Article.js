import React from "react";

//ADD ON CLICK PROPERTY THAT OPENS UP THE CONTENTS

const Article = ({ article }) => {
  //clean up the name at end of title
  const i = article.title.indexOf(" - ");
  const title = article.title.slice(0, i);

  return (
    <div className="article">
      <div className="article-header">
        <div className="article-title">
          <h3>{title}</h3>
          <p className="article-author">{article.author}</p>
        </div>
        <img
          className="article-img"
          src={`${article.urlToImage}`}
          alt="news-pic"
        />
      </div>

      <p>{article.description}</p>
      <a href={`${article.url}`}>{sourceName}</a>
    </div>
  );
};

export default Article;
