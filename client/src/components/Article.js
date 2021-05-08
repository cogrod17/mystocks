import React from "react";

//ADD ON CLICK PROPERTY THAT OPENS UP THE CONTENTS

const Article = ({ article }) => {
  //clean up the name at end of title
  //const i = article.title.indexOf(" - ");
  //const title = article.title.slice(0, i);

  return (
    <div className="article">
      <div className="article-header">
        <h3 className="article-title">{article.headline}</h3>
        <div className="article-break"></div>
        <p className="article-summary">{article.summary}</p>
        <a className="article-link" href={`${article.url}`}>
          {article.source}
        </a>
      </div>
      <img className="article-img" src={`${article.image}`} alt="news-pic" />
    </div>
  );
};

export default Article;
