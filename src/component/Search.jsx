import React, { useState } from 'react';
import axios from "axios";

function Search() {
  const [text, setText] = useState("");
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null); // State for error message

  const changeText = (event) => {
    setText(event.target.value);
  }

  const getMovie = (e) => {
    e.preventDefault();

    axios.get(`https://www.omdbapi.com/?s=${text}&apikey=43033444`)
      .then((response) => {
        if (response.data.Response === "True") {
          // If the response is successful (movies found)
          setMovie(response.data.Search);
          setError(null); // Clear any previous error message
        } else {
          // If the response is not successful (no movies found)
          setMovie([]); // Clear the movie array
          setError("No movies found with this name."); // Set error message
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data."); // Set a generic error message
      });
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Movie App</a>
          <form className="d-flex" onSubmit={getMovie}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={changeText} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>

      <div className="container my-3">
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        <div className="row">
          {movie.map((value, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="card" style={{ width: '18rem;' }}>
                  <img src={value.Poster} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h3 className="card-title">{value.Year}</h3>
                    <h4 className="card-text">{value.Title}</h4>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Search;
