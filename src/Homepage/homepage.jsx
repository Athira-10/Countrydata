import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./home.css";
import Footer from "../Footer/footer";
import CountryList from "./Countrylist";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
  };

  const activeCountry = filteredCountries[activeIndex]; 

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h4>Countries</h4>

        {isMobile ? (
          <div className="mobile-menu-container">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
              <i className="fas fa-bars"></i>
            </button>

            {menuOpen && (
              <div className="mobile-menu">
                {["All", "Asia", "Europe"].map((region) => (
                  <span
                    key={region}
                    className={`menu-item ${filter === region ? "active" : ""}`}
                    onClick={() => {
                      setFilter(region);
                      setMenuOpen(false);
                    }}
                  >
                    {region}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="filter-options">
            {["All", "Asia", "Europe"].map((region) => (
              <span
                key={region}
                className={filter === region ? "active" : ""}
                onClick={() => setFilter(region)}
              >
                {region}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="welcome-container">
        <div className="underline"></div>
        <h1 className="welcome-title">WELCOME</h1>
        <div className="underline"></div>
      </div>

      {!loading && !error && (
        <div className="slider-card">
          <div className="row">
           
            <div className="card col-md-8">
              <div className="card-body">
                <Slider ref={sliderRef} {...sliderSettings} className="mt-4">
                  {filteredCountries.slice(0, 10).map((country, index) => (
                    <div key={index} className="slider-item">
                      <img src={country.flag} alt={country.name} className="slider-flag" />
                      <h5 className="country-name">{country.name}</h5>
                    </div>
                  ))}
                </Slider>

                <div className="arrow-dot-row">
                  <button className="custom-arrow" onClick={() => sliderRef.current?.slickPrev()}>
                    ←
                  </button>
                  <ul className="custom-dots">
                    {filteredCountries.slice(0, 10).map((_, i) => (
                      <li key={i} className={`dot ${i === activeIndex ? "active-dot" : ""}`}></li>
                    ))}
                  </ul>
                  <button className="custom-arrow" onClick={() => sliderRef.current?.slickNext()}>
                    →
                  </button>
                </div>
              </div>
            </div>

           
            <div className="card col-md-3 mx-3">
              <div className="card-bodyy text-center">
                {activeCountry && (
                  <>
                    <img
                      src={activeCountry.flag}
                      alt={activeCountry.name}
                      className="slider-flag"
                      style={{ width: "100px", height: "60px", objectFit: "cover" }} 
                    />
                    <h5 className="country-name">{activeCountry.name}</h5>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {loading && <p className="text-center mt-4">Loading countries...</p>}
      {error && <p className="text-center text-danger mt-4">{error}</p>}

      <div className="mt-5">
        <CountryList filter={filter} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
