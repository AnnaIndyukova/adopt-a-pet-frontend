import "./NewsCard.css";

const NewsCard = ({ article, key }) => {
  return (
    <div className="newsCard">
      <p className="newsCard__date">{article.date}</p>
      <p className="newsCard__caption">{article.caption}</p>
      <p className="newsCard__text">{article.text}</p>
      <p className="newsCard__author">{article.author}</p>
    </div>
  );
};

export default NewsCard;
