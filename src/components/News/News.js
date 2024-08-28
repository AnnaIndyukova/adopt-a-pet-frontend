import NewsCard from "../NewsCard/NewsCard";
import "./News.css";

function News({ articles }) {
  return (
    <main className="news">
      <section className="news__section">
        <div className="news__items">
          {articles.map((item) => (
            <NewsCard article={item} key={item._id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default News;
