
// import './App.css';

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  //change loading state to false initially
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/search?q=${searchQuery}`);

        setResults(response.data);
      } catch (e) {
        //catch(e) for getting error message and store on state
        console.log(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );
  //use finally to set loading state false
  console.log(error);
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (selectedItem) {
      const element = document.getElementById("selected-item");
      element.innerHTML = selectedItem.description;
    }
  }, [selectedItem]);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
//remove eventlistener
  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setHistory([...history, item]);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />

      <div className="results">
        {results.map((item) => (
          <div className="result-item" onClick={() => handleSelect(item)}>
            <img src={item.thumbnail} className="thumbnail" />
            <div className="details">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      {/* show loading status */}
      {loading === true ? <p> ...loading</p> : ""}
      {selectedItem && <div id="selected-item" className="selected" />}

      <div className="history">
        <h4>Search History</h4>
        {/* add key  */}
        {history.map((item) => (
          <div  key={item.id} className="history-item">{item.title}</div>
        ))}
        {error}
        {/* show error message */}
      </div>
    </div>
  );
};

export default SearchComponent;
