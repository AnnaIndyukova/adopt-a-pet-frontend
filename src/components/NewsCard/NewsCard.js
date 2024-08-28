import "./NewsCard.css";

const NewsCard = ({ article }) => {
  return (
    <div className="newsCard">
      <div className="newsCard__top">
        <p className="newsCard__caption">{article.articleCaption}</p>
        <p className="newsCard__date">{article.articleDate}</p>
      </div>
      <p className="newsCard__text">{article.articleText}</p>
      <p className="newsCard__author">{article.articleAuthor}</p>
    </div>
  );
};

export default NewsCard;
