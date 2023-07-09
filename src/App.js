import "./styles.css";
import { useState, useEffect, useMemo } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfResults = 14;
  const [numberofPages, setNumberofPages] = useState(1);
  const getData = async (currentPageNo) => {
    setData([]);
    const skip = (currentPageNo - 1) * numberOfResults;
    const res = await fetch(
      `https://dummyjson.com/users?limit=${numberOfResults}&skip=${skip}`
    );
    const tempData = await res.json();
    setNumberofPages(Math.floor(tempData.total / numberOfResults) + 1);
    setData(tempData.users);
  };
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);
  const handleClick = (num) => {
    if (currentPage === 1 && num === -1) {
    } else if (currentPage === numberofPages && num === 1) {
    } else {
      if (currentPage >= 1 && currentPage < numberofPages + 1) {
        setCurrentPage(currentPage + num);
      }
    }
  };
  return (
    <div className="App">
      <h1>React Pagination</h1>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={() => handleClick(-1)}
      >
        Go to Previous Page
      </button>
      <button
        disabled={currentPage === numberofPages ? true : false}
        onClick={() => handleClick(1)}
      >
        Go to Next Page
      </button>
      <h3>page number : {currentPage}</h3>
      <h3>Total Pages : {numberofPages}</h3>
      {data.map((product, index) => {
        return (
          <div className="map">
            <img src={product.image} height="200px" width="200px" />
          </div>
        );
      })}
    </div>
  );
}
