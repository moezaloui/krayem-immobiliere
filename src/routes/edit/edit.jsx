import { useState, useEffect } from "react";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../../components/loader/Loader";
import NotFound from "../404/notFound";
import { FaTrash } from 'react-icons/fa'

function Edit() {
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState(null);  // Initially null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [data, setData] = useState({
    location: {
      country: "",
      address: "",
      longitude: "",
      latitude: ""
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
    title: "",
    price: "",
    description: "",
    type: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  // Fetch the property data by ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://real-estate-server-side-flame.vercel.app/api/properties/get-propertie/${id}`);
        setProperty(response.data);
        setImages(response.data.thumbnails);
        setData(response.data);  // Set fetched data into form data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      thumbnails: images,
    }));
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://real-estate-server-side-flame.vercel.app/api/properties/edite-propertie/${id}`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Property updated successfully:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating property:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to update property.");
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

  if (loading) return <Loader />;
  if (error) return <NotFound />;

  const deleteImage = (i) => {
    setImages(images.filter((_,index) => index !== i))
  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Edit Property</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={data.title}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={data.price}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={data.type} id="type" onChange={handleChange}>
                <option value="t">Terrain</option>
                <option value="m">Maison</option>
                <option value="v">Villa</option>
              </select>
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                rows={10}
              />
            </div>
            <div className="item">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                value={data.location.country}
                onChange={handleChangeLocation}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={data.location.address}
                onChange={handleChangeLocation}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                value={data.location.latitude}
                onChange={handleChangeLocation}
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                value={data.location.longitude}
                onChange={handleChangeLocation}
              />
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
            <button type="submit" className="sendButton">Confirmer</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <div className="imgContainer">
          <img src={image} key={index} alt="" />
          <button onClick={()=>deleteImage(index)}><FaTrash /></button>
          </div>
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

export default Edit;
