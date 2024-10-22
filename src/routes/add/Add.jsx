import { useState, useEffect } from "react";
import "./Add.scss";
// import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Add() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState(
    {
      location: {
        country: null,
        address: null,
        longitude: null,
        latitude: null
      },
      criteria: {
        piscine: 0,
        garage: 0,
        jardin: 0,
        abri_voiture: 0,
        terrasse: 0,
        salon: 0,
        cuisine: 0,
        salle_a_manger: 0,
        chambres: 0,
        salle_de_bain: 0,
        salle_d_eau: 0,
        climatiseur: 0
      },
      thumbnails: [],
      title: null,
      price: null,
      description: null,
      type: null,
      image:''
    }
  )

  const navigate = useNavigate()

  useEffect(() => {
    setData({...data, thumbnails: images})
  }, [images])
  
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(data);
  try {
    const response = await axios.post(`https://real-estate-server-side-flame.vercel.app/api/properties/create-propertie`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Property created successfully:", response.data);
    navigate("/profile"); // Navigate to a success page or display a success message
  } catch (error) {
    console.error("Error creating property:", error.response?.data?.message || error.message);
    setError(error.response?.data?.message || "Failed to create property.");
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (data.criteria.hasOwnProperty(name)) {
      setData({
        ...data,
        criteria: { ...data.criteria, [name]: value }
      });
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
  };
  
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
  
    setData({
      ...data,
      location: { ...data.location, [name]: value }
    });
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Ajouter Poste</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Titre</label>
              <input id="title" value={data.title} name="title" type="text" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="price">Prix</label>
              <input id="price" value={data.price} name="price" type="number" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={data.type} id="type" onChange={handleChange}>
                <option value={'t'}>Terrain</option>
                <option value={'m'}>Maison</option>
                <option value={'v'}>Villa</option>
              </select>
            </div>
            <div className="item description" >
              <label htmlFor="desc">Description</label>
              <textarea name="description" value={data.description} onChange={handleChange} rows={10}></textarea>
            </div>
            <div className="item">
              <label htmlFor="country">Ville</label>
              <input id="country" value={data.location.country} name="country" type="text" onChange={handleChangeLocation}/>
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" value={data.location.address} name="address" type="text" onChange={handleChangeLocation}/>
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" value={data.location.latitude} name="latitude" type="text" onChange={handleChangeLocation}/>
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" value={data.location.longitude} name="longitude" type="text" onChange={handleChangeLocation}/>
            </div>
            
            <div className="item">
              <label htmlFor="chambres">Nombre de chambre</label>
              <input id="chambres" value={data.criteria.chambres} name="chambres" type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="salle_de_bain">Nombre de salle de bain</label>
              <input id="salle_de_bain" value={data.criteria.salle_de_bain} name="salle_de_bain" type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="cuisine">Cuisine</label>
              <input id="cuisine" value={data.criteria.cuisine} name="cuisine" type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="salle_a_manger">Salle à manger</label>
              <input id="salle_a_manger" value={data.criteria.salle_a_manger} name="salle_a_manger" type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="piscine">Piscine</label>
              <input id="piscine" name="piscine" value={data.criteria.piscine} type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="garage">Garage</label>
              <input id="garage" name="garage" value={data.criteria.garage} type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="jardin">Jardin</label>
              <input id="jardin" name="jardin" value={data.criteria.jardin} type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="abri_voiture">Abri voiture</label>
              <input id="abri_voiture" name="abri_voiture" value={data.criteria.abri_voiture} type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="terrasse">Terrasse</label>
              <input id="terrasse" name="terrasse" value={data.criteria.terrasse} type="number" min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="salon">Salon</label>
              <input id="salon" name="salon" type="number" value={data.criteria.salon} min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="salle_d_eau">Salle d'eau</label>
              <input id="salle_d_eau" name="salle_d_eau" type="number" value={data.criteria.salle_d_eau} min={0} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="climatiseur">Climatiseur</label>
              <input id="climatiseur" name="climatiseur" type="number" value={data.criteria.climatiseur} min={0} onChange={handleChange}/>
            </div>
            
            
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dwxaf2fd3",
            uploadPreset: "krayem",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default Add;