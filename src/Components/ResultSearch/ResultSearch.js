import "./ResultSearch.css";
const ResultSearch = ({ resultData }) => {
  return (
    <div className="search-result">
      {resultData.map((item, i) => (
        <div key={i} className="search-item">
          <h2>{item.title}</h2>
          <h4>{item.symbol}</h4>
          <p>{item.keywords}</p>
        </div>
      ))}
    </div>
  );
};
export default ResultSearch;
