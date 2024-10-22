import "./filter.scss";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Filter({queries}) {
  const navigate = useNavigate();
  const [searchQueries, setSearchQueries] = useState({
    location: queries.location,
    minPrice: queries.minPrice,
    maxPrice: queries.maxPrice,
    type: queries.type,
    surface: queries.surface,
  })

  const handleChange = (e) => {
    setSearchQueries({
      ...searchQueries,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const params = new URLSearchParams();
  
    if (searchQueries.type) params.append('type', searchQueries.type);
    if (searchQueries.location) params.append('location', searchQueries.location);
    if (searchQueries.minPrice > 0) params.append('minPrice', searchQueries.minPrice);
    if (searchQueries.maxPrice > 0) params.append('maxPrice', searchQueries.maxPrice);
    if (searchQueries.surface > 0) params.append('surface', searchQueries.surface);
  
    navigate(`/list/properity?${params.toString()}`);
  };

  return (
     <div className="filter">
      <h1>
        {searchQueries.location && <>Résultat pour <b>{searchQueries.location}</b></>}
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="location">Ville</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={searchQueries.location}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
        <select name="type" onChange={handleChange} id="type" value={searchQueries.type}>
          <option value="">Touts</option>
          <option value="t">Terrain</option>
          <option value="m">Maison</option>
          <option value="v">Villa</option>
        </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Prix</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="touts"
            value={searchQueries.minPrice}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Prix</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="touts"
            value={searchQueries.maxPrice}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <button onClick={handleSubmit} style={{height:'100%'}}>Filtrer</button>
        </div>
      
      </div>
    </div>
  );
}

export default Filter;
