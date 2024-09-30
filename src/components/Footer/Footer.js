import "./Footer.css";

const Footer = () => {
  const author = "Anna Indyukova";
  const liknedin = "https://www.linkedin.com/in/anna-indyukova/";
  return (
    <footer className="footer">
      <p>
        Developed by{" "}
        <a
          className="footer__link"
          href={liknedin}
          target="_blank"
          rel="noreferrer"
        >
          {author}
        </a>
      </p>
      <p>2024</p>
    </footer>
  );
};
export default Footer;
