import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import Loader from "../../components/loader/Loader";
import NotFound from "../404/notFound";
import { FaWhatsapp } from "react-icons/fa";

const SinglePage=()=> {
  const [property, setProperty] = useState()
  const [Loading, setLoading] = useState(true)
const [Error, setError] = useState(false)
  const { id } = useParams();
  console.log(id);
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchProperties = async () => {
        try {
//          setLoading(true)
            const response = await axios.get(`https://real-estate-server-side-flame.vercel.app/api/properties/get-propertie/${id}`);
            setProperty(response.data);
            if (response.status===200){
              setLoading(false)
            }
            console.log('PROPERITY ',response.data)
        } catch (error) {
            setLoading(false)
            setError(true)
            console.error('Error fetching properties:', error);
        }
    };
    console.log('In Use Effect');
    fetchProperties();
}, [id]);

console.log(property?.image)
console.log(property?.thumbnails)

console.log(property);
  const immobilierCategories = {
    exterieur: [
      { 
        label: 'Piscine', 
        value: 'piscine', 
        icon: '🏊',        // Exemple d'icône
        exist: true,      // Par défaut non existant
        number: property?.criteria?.piscine      // Pas applicable (peut rester à 0 si non nécessaire)
      },
      { 
        label: 'Garage', 
        value: 'garage', 
        icon: '🚗', 
        exist: true, 
        number: property?.criteria?.garage          // Peut représenter le nombre de garages
      },
      { 
        label: 'Jardin', 
        value: 'jardin', 
        icon: '🌳', 
        exist: true, 
        number: property?.criteria.jardin          // Ici le champ "number" pourrait ne pas être pertinent
      },
      { 
        label: 'Abri Voiture', 
        value: 'abri_voiture', 
        icon: '🏠🚗', 
        exist: true, 
        number: property?.criteria.abri_voiture
      },
      { 
        label: 'Terrasse', 
        value: 'terrasse', 
        icon: '☀️', 
        exist: true, 
        number: property?.criteria.terrasse
      },
    ],
    interieur: [
      { 
        label: 'Salon', 
        value: 'salon', 
        icon: '🛋️', 
        exist: true, 
        number: property?.criteria.salon        // Nombre de salons
      },
      { 
        label: 'Cuisine', 
        value: 'cuisine', 
        icon: '🍴', 
        exist: true, 
        number: property?.criteria.cuisine
      },
      { 
        label: 'Salle à Manger', 
        value: 'salle_a_manger', 
        icon: '🍽️', 
        exist: true, 
        number: property?.criteria.salle_a_manger
      },
      { 
        label: 'Chambres', 
        value: 'chambres', 
        icon: '🛏️', 
        exist: true, 
        number: property?.criteria.chambres        // Nombre de chambres
      },
      { 
        label: 'Salle de Bain', 
        value: 'salle_de_bain', 
        icon: '🛁', 
        exist: true, 
        number: property?.criteria.salle_de_bain
      },
      { 
        label: 'Salle d\'Eau', 
        value: 'salle_d_eau', 
        icon: '🚿', 
        exist: true, 
        number: property?.criteria.salle_d_eau
      },
      { 
        label: 'Climatiseur', 
        value: 'climatiseur', 
        icon: '❄️', 
        exist: true, 
        number: property?.criteria.climatiseur        // Nombre de climatiseurs
      },
    ]
  };

  const categories = [
    { title: 'Espaces Extérieurs', items: immobilierCategories.exterieur },
    { title: 'Espaces Intérieurs', items: immobilierCategories.interieur },
  ];

 if (Loading){ return (
  <Loader/>
 )
}
if (Error){ return (
  <NotFound/>
 )
}
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider data={property} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{property?.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{property?.location?.country} {property?.location?.address}</span>
                </div>
                <div className="price">TND {property?.price}</div>
              </div>
              
            </div>
            <div className="bottom">{property?.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title2">Critère</p>
          {categories.map((category, catIndex) => (
        <div key={catIndex}>
          <p className="title">{category.title}:</p>
          <div className="sizes">
            {category.items.map((item, index) => (
              item.number > 0 && ( 
                <div className="size" key={index}>
                  <span className="icon">{item.icon}</span> 
                  <span>{item.number > 1 ? `${item.number} ${item.label.toLowerCase()}` : item.label}</span> 
                </div>
              )
            ))}
          </div>
        </div>
      ))}
         
          <p className="title">Location</p>
          <div className="mapContainer">
            {<Map items={[property]}/>}
          </div>
          <div className="buttons">
              <p>Pour Réserver :</p>
            <Link className="button" target={'_blank'} to={'https://wa.me/+21628072308'}>
              <FaWhatsapp />
              Contacter Nous
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;