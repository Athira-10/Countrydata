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
  const [menuOpen, setMenuOpen] = useState(false);
  const sliderRef = useRef(null);

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
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, newIndex) => setActiveIndex(newIndex),
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    appendDots: (dots) => (
      <div className="arrow-dot-row">
        <button
          type="button"
          className="custom-arrow"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          ←
        </button>

        <ul className="custom-dots">
          {dots.map((dot, index) => (
            <li key={index}>{dot.props.children}</li>
          ))}
        </ul>

        <button
          type="button"
          className="custom-arrow"
          onClick={() => sliderRef.current?.slickNext()}
        >
          →
        </button>
      </div>
    ),
    customPaging: () => <div className="dot"></div>,
  };

  const activeCountry = filteredCountries[activeIndex];

  return (
    <>

      <header className="bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Countries</h2>


          <ul className="nav d-none d-md-flex">
            {["All", "Asia", "Europe"].map((region) => (
              <li key={region} className="nav-item">
                <button
                  className={`nav-link btn btn-link ${filter === region ? "active" : ""
                    }`}
                  onClick={() => setFilter(region)}
                >
                  {region}
                </button>
              </li>
            ))}
          </ul>


          <div className="mobile-menu-container d-md-none">
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            {menuOpen && (
              <div className="mobile-menu">
                {["All", "Asia", "Europe"].map((region) => (
                  <div
                    key={region}
                    className={`menu-item ${filter === region ? "active" : ""
                      }`}
                    onClick={() => {
                      setFilter(region);
                      setMenuOpen(false);
                    }}
                  >
                    {region}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container my-5">

        <section className="text-center mb-5">
          <h2 className="welcome-divider text-uppercase fw-bold">Welcome</h2>
        </section>


        <section className="promo-section mb-5">
          <div className="row">
            <div className="col-lg-4 order-1 order-lg-2 mb-4 mb-lg-0">
              <div className="side-promo rounded overflow-hidden">
                {activeCountry ? (
                  <img
                    src={activeCountry.flag}
                    alt={activeCountry.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <img
                    src="https://picsum.photos/400/450?random=3"
                    alt="Side promo"
                    className="w-100 h-100 object-fit-cover"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-8 order-2 order-lg-1">
              <div className="carousel-main border border-primary rounded p-2">
                {!loading && !error && (
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {filteredCountries.slice(0, 4).map((country, i) => (
                      <div key={i} className="slider-item">
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="slider-flag"
                        />
                        <h5 className="country-name">{country.name}</h5>
                      </div>
                    ))}
                  </Slider>
                )}
                {loading && <p className="text-center my-5">Loading countries...</p>}
                {error && <p className="text-center text-danger my-5">{error}</p>}
              </div>
            </div>
          </div>
        </section>



        <CountryList filter={filter} />
      </main>

      <Footer />
    </>
  );
};

export default Home;
