import { useEffect, useState } from "react";
import ContactBand from "../../components/contactBand/contactBand";
import SearchBar from "../../components/searchBar/SearchBar";
import SingleCard from "../../components/singleCard/SingleCard";
import "./homePage.scss";
import axios from "axios";
import Loader from "../../components/loader/Loader";



function HomePage() {
  const [properitys, setProperitys] = useState()
  const [Loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.NEXT_PUBLIC_API_URL;
  // get new offres 
  useEffect(() => {
    const fetchNewProperties = async () => {
      try {
        const response = await axios.get(`https://real-estate-server-side-flame.vercel.app/api/properties/get-properties`);
        setProperitys(response.data);
        if (response.status===200){
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchNewProperties();
  }, []);

  

  if (Loading){ return (
    <Loader/>
   )
  }
  return (
    <div>
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Trouvez l'Immobilier & Obtenez Votre Lieu de Rêve</h1>
            <p>
              Que vous recherchiez la maison de vos rêves ou un terrain pour construire, nous vous accompagnons à chaque étape. 
              Découvrez notre vaste sélection de propriétés adaptées à tous les besoins et budgets, avec un service sur mesure 
              pour vous aider à faire le bon choix. Profitez de notre expertise pour trouver l'endroit parfait où commencer 
              votre nouvelle vie.
            </p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Années d'expérience</h2>
              </div>
              
              <div className="box">
                <h1>{properitys.length}</h1>
                <h2>Propriété prête</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </div>
      <div className="home-content">
        <div className="recent-posts wrapper">
          <h1 className="title">Nouvelles Offres</h1>
          <div className="cards">
          {properitys
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4)
            .map((item) => (
              <SingleCard key={item._id} properity={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-content">
        <div className="recent-posts wrapper">
          <h1 className="title">Des terrains</h1>
          <div className="cards">
          {properitys
            .filter((item) => item.type.includes("t"))
            .map((item) => (
              <SingleCard key={item._id} properity={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
