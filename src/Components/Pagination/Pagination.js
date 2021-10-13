import "./Pagination.css";

const Pagination = ({ page, count, onChange, prev, next }) => {
  return (
    <ul className="pagination">
      <button onClick={prev} className="page">
        ◀
      </button>
      {new Array(count).fill(0).map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onChange(index + 1);
          }}
          className="page"
        >
          {index + 1}
        </button>
      ))}
      <button onClick={next} className="page">
        ▶
      </button>
    </ul>
  );
};

export default Pagination;
