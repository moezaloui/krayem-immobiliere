
import "./listPage.scss";
import Loader from "../../components/loader/Loader";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import React, {useState, useEffect} from "react";
function ListPage() {
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  
  console.log(apiUrl);
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await axios.get(`https://real-estate-server-side-flame.vercel.app/api/properties/get-properties`);
            if(response.data){
              setIsLoading(false)
               setError(false)
              setProperties(response.data);
            }
        } catch (error) {
            setError(true)
            setIsLoading(false)
            console.error('Error fetching properties:', error);
        }
    };

    fetchProperties();
}, []);

  console.log(properties);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const queries = {};
  for (let [key, value] of queryParams.entries()) {
    queries[key] = value;
  }
  console.log(queries);
  // Filter properties based on query parameters
  const filteredProperties = properties.filter((item) => {
    // Apply filters based on query parameters
    let matches = true;

    if (queries.location) {
      matches = matches && item.location.address.toLowerCase().includes(queries.location.toLowerCase());
    }

    if (queries.minPrice) {
      matches = matches && item.price >= parseFloat(queries.minPrice);
    }

    if (queries.maxPrice) {
      matches = matches && item.price <= parseFloat(queries.maxPrice);
    }

    if (queries.type) {
      matches = matches && item.type.includes(queries.type);
    }

    // Add more conditions based on your filtering needs
    return matches;
  });

if (isLoading){ return (
  <Loader/>
 )
}

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {/**====================================== */}
          <Filter queries={queries}/>
          {/**====================================== */}
          {
          error ? (<p>Pas des résultats pour votre recherche</p>) : 
            filteredProperties.map((item) => (
              <Card key={item._id.$oid} item={item} />
            ))
          }
        </div>
      </div>
      <div className="mapContainer">
        <Map items={filteredProperties}/>
      </div>
    </div>
  );
}

export default ListPage;
