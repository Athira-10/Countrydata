import React, { useState, useEffect } from "react";
import axios from "axios";
import "./countrylist.css"; // Add styles in this file

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all?fields=name,region,flag");
        setCountries(response.data);
      } catch (err) {
        setError("Failed to load countries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="country-list-container">
      {loading && <p className="text-center">Loading countries...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="country-grid">
            {countries.slice(0, visibleCount).map((country, index) => (
              <div key={index} className="country-card">
                <img src={country.flag} alt={country.name} className="country-flag" />
                <div className="country-info">
                  <h5>{country.name}</h5>
                  <p>{country.region}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < countries.length && (
            <button className="load-more" onClick={loadMore}>Load more</button>
          )}
        </>
      )}
    </div>
  );
};

export default CountryList;
