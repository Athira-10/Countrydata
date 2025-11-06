import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./countrylist.css";

const CountryList = ({ filter }) => {
  const [countries, setCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v2/all?fields=name,region,flag"
        );
        setCountries(response.data);
      } catch (err) {
        setError("Failed to load countries. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries =
    filter === "All" ? countries : countries.filter((c) => c.region === filter);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <section className="countries-grid">
      {loading && <p className="text-center">Loading countries...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="row g-4">
            {filteredCountries.slice(0, visibleCount).map((country, index) => (
              <div className="col-md-6" key={index}>
                <div className="d-flex align-items-center p-3 country-card">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="rounded me-3"
                    width="60"
                    height="60"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{country.name}</h6>
                    <p className="mb-0 text-muted small">{country.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredCountries.length && (
            <div className="text-center my-5">
              <button className="btn load-more-btn" onClick={loadMore}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CountryList;
