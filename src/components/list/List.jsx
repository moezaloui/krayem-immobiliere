import React, { useState, useEffect, useContext} from 'react'
import './list.scss'
import Card from"../card/Card"
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Loader from '../loader/Loader'
import { UserContext } from '../../lib/userContext'

function List(){
  const { user } = useContext(UserContext);
  const [properties, setProperties] = useState([])
  const [Loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await axios.get(`https://real-estate-server-side-flame.vercel.app/api/properties/get-properties`);
            setProperties(response.data);
            if (response.status===200){
              setLoading(false)
            }
        } catch (error) {
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
  if (Loading){ return (
    <Loader/>
   )
  }
  return (
    <div className='list'>
      {properties.map(item=>(
        <Card key={item.id} item={item} user={user}/>
      ))}
    </div>
  )
}

export default List