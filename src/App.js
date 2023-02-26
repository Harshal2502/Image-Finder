import React, { useEffect, useState } from 'react';
import './App.css'
import Card from './Card';
import searchIcon from './search.svg';

const App = () => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (searchTerm !== "") {
        searchImages(searchTerm);
      } else {
        showImages();
      }
    }, [searchTerm]);
  
    const showImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos?page=1&per_page=11&order_by=latest&client_id=r00pPp1s4xRvC69S4rV3RHZEoa3IawGOpzk3ZCaXiSk`
        );
        const res = await response.json();
  
        setImages(res);
        setLoading(false);
      } catch (e) {
        setErr(true);
        setLoading(false);
      }
    };
  
    const searchImages = async (term) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${term}&client_id=r00pPp1s4xRvC69S4rV3RHZEoa3IawGOpzk3ZCaXiSk&page=1&per_page=11`
        );
        const res = await response.json();
        setLoading(false);
  
        setImages(res.results);
      } catch (e) {
        setErr(true);
        setLoading(false);
      }
    };
  
    return (
      <div className="app">
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            showImages();
            setSearchTerm("");
          }}
        >
          Perfect Photo
        </h1>
        <h4 style={{ color: "dimgray" }}>Find photos for your perfect usage</h4>
  
        <div className="search">
          <input
            placeholder="So what are you looking today?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            onClick={() => {
              searchImages(searchTerm);
            }}
          />
        </div>
  
        <div className="container">
          {images.length > 0 ? (
            images.map((image) => {
              return <Card {...image} />;
            })
          ) : (
            <p>No Images found</p>
          )}
        </div>
  
        {err == true && <h2>Oh No! Looks like there's some issue :(</h2>}
  
        {loading == true && <h1>Loading..</h1>}
      </div>
    );
  };
  
  export default App;
  